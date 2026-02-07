import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { flareTestnet } from 'viem/chains'

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

// Flare Testnet configuration
export const flareChain = flareTestnet

export const publicClient = createPublicClient({
  chain: flareChain,
  transport: http()
})

export const getWalletClient = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return createWalletClient({
      chain: flareChain,
      transport: custom(window.ethereum)
    })
  }
  return null
}

// FDC Contract addresses on Flare Testnet
export const FDC_CONTRACTS = {
  FDC_HUB: '0x0000000000000000000000000000000000000999', // Replace with actual address
  WEB2JSON_ATTESTOR: '0x0000000000000000000000000000000000000998' // Replace with actual address
}

export interface AttestationRequest {
  attestationType: string
  sourceId: string
  requestBody: {
    url: string
    responseData: any
  }
}

export interface AttestationResponse {
  status: 'pending' | 'success' | 'failed'
  attestationId?: string
  data?: any
  error?: string
}