import { useState, useCallback } from 'react';
import { publicClient, getWalletClient } from '@/lib/flare';
import { parseAbi } from 'viem';
import { useFDCAttestation } from './useFDCAttestation';

// HelloWorld contract ABI
const HELLO_WORLD_ABI = parseAbi([
  'function message() public view returns (string)',
  'function updateMessage(string memory newMessage) public'
]);

const CONTRACT_ADDRESS = '0x720D1F4e9573ED02a783595EDA5DcB850E66BF32' as const;

export interface FDCHelloWorldIntegration {
  // Contract interaction
  readContractMessage: () => Promise<string | null>;
  updateContractMessage: (message: string) => Promise<string | null>;
  
  // FDC + Contract combined operations
  createAttestationAndUpdateContract: (verificationId: string, verifiedClaims: any, contractMessage: string) => Promise<{
    success: boolean;
    attestationId?: string;
    contractTxHash?: string;
    error?: string;
  }>;
  
  // State
  contractMessage: string | null;
  isContractLoading: boolean;
  contractError: string | null;
}

export const useFDCHelloWorld = (): FDCHelloWorldIntegration => {
  const [contractMessage, setContractMessage] = useState<string | null>(null);
  const [isContractLoading, setIsContractLoading] = useState(false);
  const [contractError, setContractError] = useState<string | null>(null);
  
  const { requestAttestation, isLoading: isFDCLoading, attestationId, error: fdcError } = useFDCAttestation();

  // Read message from HelloWorld contract
  const readContractMessage = useCallback(async (): Promise<string | null> => {
    setIsContractLoading(true);
    setContractError(null);
    
    try {
      const message = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: HELLO_WORLD_ABI,
        functionName: 'message'
      }) as string;
      
      setContractMessage(message);
      return message;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to read contract message';
      setContractError(error);
      console.error('Error reading contract:', err);
      return null;
    } finally {
      setIsContractLoading(false);
    }
  }, []);

  // Update message in HelloWorld contract
  const updateContractMessage = useCallback(async (newMessage: string): Promise<string | null> => {
    setIsContractLoading(true);
    setContractError(null);
    
    try {
      const walletClient = getWalletClient();
      if (!walletClient) {
        throw new Error('Wallet not connected');
      }

      const accounts = await walletClient.requestAddresses();
      if (accounts.length === 0) {
        throw new Error('No accounts available');
      }

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: HELLO_WORLD_ABI,
        functionName: 'updateMessage',
        args: [newMessage],
        account: accounts[0]
      });

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      
      if (receipt.status === 'success') {
        // Read updated message
        await readContractMessage();
        return hash;
      } else {
        throw new Error('Transaction failed');
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update contract message';
      setContractError(error);
      console.error('Error updating contract:', err);
      return null;
    } finally {
      setIsContractLoading(false);
    }
  }, [readContractMessage]);

  // Combined operation: Create FDC attestation AND update contract with verification data
  const createAttestationAndUpdateContract = useCallback(async (
    verificationId: string, 
    verifiedClaims: any, 
    contractMessage: string
  ) => {
    setIsContractLoading(true);
    setContractError(null);
    
    try {
      // Step 1: Create FDC Attestation
      console.log('🔗 Creating FDC attestation...');
      const attestationResult = await requestAttestation(verificationId, verifiedClaims);
      
      if (!attestationResult.success) {
        throw new Error(attestationResult.error || 'FDC attestation failed');
      }

      console.log('✅ FDC attestation created:', attestationId);

      // Step 2: Prepare contract message with attestation reference
      const messageWithAttestation = `${contractMessage} | Verified with FDC Attestation: ${attestationId || 'pending'} | Claims: ${JSON.stringify(verifiedClaims)}`;
      
      // Step 3: Update HelloWorld contract
      console.log('📝 Updating HelloWorld contract...');
      const contractTxHash = await updateContractMessage(messageWithAttestation);
      
      if (!contractTxHash) {
        throw new Error('Contract update failed');
      }

      console.log('🎉 Integration complete!');
      
      return {
        success: true,
        attestationId: attestationId || undefined,
        contractTxHash,
      };

    } catch (err) {
      const error = err instanceof Error ? err.message : 'Integration failed';
      setContractError(error);
      console.error('Error in FDC + Contract integration:', err);
      
      return {
        success: false,
        error,
      };
    } finally {
      setIsContractLoading(false);
    }
  }, [requestAttestation, attestationId, updateContractMessage]);

  return {
    readContractMessage,
    updateContractMessage,
    createAttestationAndUpdateContract,
    contractMessage,
    isContractLoading,
    contractError,
  };
};