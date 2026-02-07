import { useState, useCallback } from 'react'
import { getWalletClient, publicClient, FDC_CONTRACTS, AttestationRequest, AttestationResponse } from '@/lib/flare'
import { parseAbi } from 'viem'

// Simplified FDC ABI for requestAttestation
const FDC_ABI = parseAbi([
  'function requestAttestation(bytes32 attestationType, bytes32 sourceId, bytes calldata requestBody) external returns (bytes32)',
  'function getAttestation(bytes32 attestationId) external view returns ((uint8 status, bytes32 attestationType, bytes32 sourceId, bytes data))',
  'event AttestationRequest(bytes32 indexed attestationId, address indexed requester, bytes32 attestationType)',
  'event AttestationProvided(bytes32 indexed attestationId, bytes data)'
])

export const useFDCAttestation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [attestationId, setAttestationId] = useState<string | null>(null)
  const [attestationData, setAttestationData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const requestAttestation = useCallback(async (verificationId: string, verifiedClaims: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const walletClient = getWalletClient()
      if (!walletClient) {
        throw new Error('Wallet not connected')
      }

      // Get account
      const accounts = await walletClient.requestAddresses()
      if (accounts.length === 0) {
        throw new Error('No accounts available')
      }

      // Prepare attestation request
      const attestationType = '0x' + Buffer.from('WEB2JSON_IDENTITY').toString('hex').padEnd(64, '0')
      const sourceId = '0x' + Buffer.from('EDEL_ID').toString('hex').padEnd(64, '0')
      
      const requestBody = {
        verificationId,
        verifiedClaims,
        timestamp: Date.now(),
        source: 'https://verifier.edel-id.ch'
      }

      const encodedRequestBody = '0x' + Buffer.from(JSON.stringify(requestBody)).toString('hex')

      // Simulate FDC call for demo (replace with real contract call)
      console.log('🔗 Simulating FDC requestAttestation call...')
      console.log('Attestation Type:', attestationType)
      console.log('Source ID:', sourceId)
      console.log('Request Body:', requestBody)

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate mock attestation ID
      const mockAttestationId = '0x' + Math.random().toString(16).substring(2).padStart(64, '0')
      setAttestationId(mockAttestationId)
      
      // Simulate validation process
      setTimeout(() => {
        setAttestationData({
          attestationType: 'WEB2JSON_IDENTITY',
          sourceId: 'EDEL_ID', 
          data: requestBody
        })
        setIsLoading(false)
      }, 3000)

      return { success: true, attestationId: mockAttestationId }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to request attestation'
      setError(errorMsg)
      setIsLoading(false)
      return { success: false, error: errorMsg }
    }
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setAttestationId(null)
    setAttestationData(null)
    setError(null)
  }, [])

  return {
    requestAttestation,
    isLoading,
    attestationId,
    attestationData,
    error,
    reset
  }
}