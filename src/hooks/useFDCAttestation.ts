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

      // Call requestAttestation on FDC Hub
      const hash = await walletClient.writeContract({
        address: FDC_CONTRACTS.FDC_HUB as `0x${string}`,
        abi: FDC_ABI,
        functionName: 'requestAttestation',
        args: [attestationType, sourceId, encodedRequestBody],
        account: accounts[0]
      })

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      
      // Parse logs to get attestation ID
      const requestEvent = receipt.logs.find(log => 
        log.topics[0] === '0x...' // AttestationRequest event signature
      )

      if (requestEvent && requestEvent.topics[1]) {
        const newAttestationId = requestEvent.topics[1]
        setAttestationId(newAttestationId)
        
        // Start monitoring attestation
        monitorAttestation(newAttestationId)
      }

      return { success: true, hash }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to request attestation'
      setError(errorMsg)
      setIsLoading(false)
      return { success: false, error: errorMsg }
    }
  }, [])

  const monitorAttestation = useCallback(async (id: string) => {
    const maxRetries = 30 // 5 minutes with 10s intervals
    let retries = 0

    const checkAttestation = async () => {
      try {
        const result = await publicClient.readContract({
          address: FDC_CONTRACTS.FDC_HUB as `0x${string}`,
          abi: FDC_ABI,
          functionName: 'getAttestation',
          args: [id as `0x${string}`]
        })

        const [status, attestationType, sourceId, data] = result as [number, string, string, string]

        if (status === 1) { // Completed
          setAttestationData({
            attestationType,
            sourceId,
            data: data ? JSON.parse(Buffer.from(data.slice(2), 'hex').toString()) : null
          })
          setIsLoading(false)
          return
        } else if (status === 2) { // Failed
          setError('Attestation failed')
          setIsLoading(false)
          return
        }

        // Still pending, retry
        retries++
        if (retries < maxRetries) {
          setTimeout(checkAttestation, 10000) // Check every 10 seconds
        } else {
          setError('Attestation timeout')
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error checking attestation:', err)
        retries++
        if (retries < maxRetries) {
          setTimeout(checkAttestation, 10000)
        } else {
          setError('Failed to monitor attestation')
          setIsLoading(false)
        }
      }
    }

    checkAttestation()
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