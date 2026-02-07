import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { publicClient } from '@/lib/flare';
import { useXRPLFlareBridge } from '@/lib/xrplFlarebridge';
import { useWalletContext } from '@/contexts/WalletContext';
import { parseAbi } from 'viem';
import Image from 'next/image';

// HelloWorld contract ABI
const HELLO_WORLD_ABI = parseAbi([
  'function message() public view returns (string)',
  'function updateMessage(string memory newMessage) public'
]);

// Contract address
const CONTRACT_ADDRESS = '0xAfaBccf62bba1629e9aCF56D7DBA0a129Eb19240' as const;

interface HelloWorldContractProps {
  onMessageUpdate?: (message: string) => void;
}

const HelloWorldContract: React.FC<HelloWorldContractProps> = ({ onMessageUpdate }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showBridgeFlow, setShowBridgeFlow] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<any>(null);
  
  // XRPL wallet context
  const { xrpAddress, xummQrCode, xummJumpLink } = useWalletContext();
  
  // XRPL-Flare bridge hook
  const { createFlareActionQR, simulateFullBridgeFlow } = useXRPLFlareBridge();

  // Read current message from contract
  const readMessage = async () => {
    setIsReading(true);
    setError(null);
    
    try {
      const message = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: HELLO_WORLD_ABI,
        functionName: 'message'
      }) as string;
      
      setCurrentMessage(message);
      onMessageUpdate?.(message);
    } catch (err) {
      console.error('Error reading message:', err);
      setError('Failed to read message from contract');
    } finally {
      setIsReading(false);
    }
  };

  // Update message using XRPL-Flare bridge
  const updateMessageViaXRPL = async () => {
    if (!newMessage.trim()) {
      setError('Please enter a message');
      return;
    }

    if (!xrpAddress) {
      setError('Please connect your XRPL wallet first');
      return;
    }

    setIsLoading(true);
    setShowBridgeFlow(true);
    setError(null);
    setTxHash(null);

    try {
      // Create Flare action for HelloWorld contract
      const flareAction = {
        action: 'updateMessage' as const,
        target: CONTRACT_ADDRESS,
        parameters: { message: newMessage },
        signature: 'xrpl_signature_' + Date.now()
      };

      console.log('🌉 Creating XRPL-Flare bridge action for HelloWorld...');
      
      // Create QR code with the bridge action
      const qrResult = await createFlareActionQR(flareAction);
      
      if (!qrResult.success) {
        throw new Error(qrResult.error);
      }

      setQrCodeData(qrResult);
      console.log('📱 QR Code created, waiting for signature...');

    } catch (err) {
      console.error('❌ Error creating bridge action:', err);
      setError(err instanceof Error ? err.message : 'Failed to create bridge action');
      setShowBridgeFlow(false);
      setIsLoading(false);
    }
  };

  // Simulate XRPL signature and bridge execution
  const executeXRPLBridge = async () => {
    if (!qrCodeData) return;

    try {
      console.log('🔄 Simulating XRPL bridge execution...');
      
      const flareAction = {
        action: 'updateMessage' as const,
        target: CONTRACT_ADDRESS,
        parameters: { message: newMessage },
        signature: 'xrpl_signature_' + Date.now()
      };

      // Simulate the full bridge flow
      const result = await simulateFullBridgeFlow(flareAction);
      
      if (!result.success) {
        throw new Error('Bridge execution failed');
      }

      console.log('✅ Bridge execution successful!');
      console.log('🔗 XRPL Tx:', result.xrplTxHash);
      console.log('⚡ Flare Tx:', result.flareTxHash);
      
      setTxHash(result.flareTxHash || 'success');
      
      // Wait a bit then read the updated message
      setTimeout(async () => {
        await readMessage();
        setNewMessage('');
        setError(null);
        setIsLoading(false);
        setShowBridgeFlow(false);
        setQrCodeData(null);
      }, 2000);

    } catch (err) {
      console.error('❌ Bridge execution failed:', err);
      setError(err instanceof Error ? err.message : 'Bridge execution failed');
      setIsLoading(false);
    }
  };

  const cancelBridge = () => {
    setShowBridgeFlow(false);
    setQrCodeData(null);
    setIsLoading(false);
    setError(null);
  };

  // Read message on component mount
  useEffect(() => {
    readMessage();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          🤝 HelloWorld Smart Contract
        </h3>
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">
            Contract: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{CONTRACT_ADDRESS}</code>
          </p>
          <p className="text-gray-600 text-sm">
            XRPL Wallet: {xrpAddress ? (
              <code className="bg-green-100 px-2 py-1 rounded text-xs text-green-800">
                {xrpAddress.slice(0, 8)}...{xrpAddress.slice(-4)} ✅
              </code>
            ) : (
              <span className="text-orange-600">⚠️ Not connected</span>
            )}
          </p>
        </div>
      </div>

      {/* Current Message Display */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Current Message</h4>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          {isReading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-blue-600">Reading from contract...</span>
            </div>
          ) : currentMessage ? (
            <p className="text-blue-800 font-medium">"{currentMessage}"</p>
          ) : (
            <p className="text-gray-500 italic">No message found</p>
          )}
        </div>
        
        <Button
          onClick={readMessage}
          disabled={isReading}
          variant="outline"
          size="sm"
          className="mt-3"
        >
          {isReading ? 'Reading...' : '🔄 Refresh Message'}
        </Button>
      </div>

      {/* Update Message Form */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Update Message</h4>
        
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter new message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          
          {!showBridgeFlow ? (
            <Button
              onClick={updateMessageViaXRPL}
              disabled={isLoading || !newMessage.trim() || !xrpAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {!xrpAddress ? (
                '🔗 Connect XRPL Wallet First'
              ) : isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating XRPL Bridge...
                </div>
              ) : (
                '🌉 Update via XRPL → Flare Bridge'
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">🌉 XRPL-Flare Bridge Active</h5>
                <p className="text-blue-800 text-sm mb-3">
                  Scan QR code with XUMM to update HelloWorld contract via XRPL transaction
                </p>
                
                {qrCodeData && qrCodeData.qrCode ? (
                  <div className="text-center space-y-3">
                    <Image
                      src={qrCodeData.qrCode}
                      alt="XUMM QR Code for HelloWorld Update"
                      width={180}
                      height={180}
                      className="mx-auto border border-blue-200 rounded-lg"
                    />
                    <p className="text-xs text-blue-600">
                      Message: "{newMessage}" → Contract: {CONTRACT_ADDRESS.slice(0, 8)}...
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-blue-600 text-sm">Generating XRPL QR Code...</p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={executeXRPLBridge}
                  disabled={!qrCodeData || isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Bridge Executing...
                    </div>
                  ) : (
                    '🔄 Simulate XRPL Signature'
                  )}
                </Button>
                
                <Button
                  onClick={cancelBridge}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1"
                >
                  ❌ Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Status */}
      {txHash && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">✅ Transaction Successful</h5>
          <p className="text-green-700 text-sm">
            Tx Hash: <code className="bg-green-100 px-1 rounded text-xs">{txHash.slice(0, 10)}...{txHash.slice(-8)}</code>
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h5 className="font-medium text-red-800 mb-1">❌ Error</h5>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Contract Info */}
      <div className="text-xs text-gray-400 border-t pt-3">
        <p>This contract is deployed on Flare Network</p>
        <p>Functions: message() [view], updateMessage(string) [payable]</p>
      </div>
    </div>
  );
};

export default HelloWorldContract;