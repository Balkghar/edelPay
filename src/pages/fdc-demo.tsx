import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import HelloWorldContract from "@/components/HelloWorldContract";
import FlareAttestationLoader from "@/components/FlareAttestationLoader";
import XRPLFlareBridgeDemo from "@/components/XRPLFlareBridgeDemo";
import { FDCStatusReader } from "@/components/FDCStatusReader";
import { useState, useEffect } from "react";
import { useWalletContext } from "@/contexts/WalletContext";
import { useRouter } from "next/router";
import { useFDCHelloWorld } from "@/hooks/useFDCHelloWorld";
import { useFDCAttestation } from "@/hooks/useFDCAttestation";

const inter = Inter({ subsets: ["latin"] });

interface MockVerificationData {
  verificationId: string;
  verifiedClaims: any[];
}

export default function FDCDemo() {
  const router = useRouter();
  const { xrpAddress, isLoading: walletLoading } = useWalletContext();
  
  // FDC + Contract integration hook
  const {
    readContractMessage,
    createAttestationAndUpdateContract,
    contractMessage,
    isContractLoading,
    contractError
  } = useFDCHelloWorld();

  // Standalone FDC hook for direct attestations
  const {
    requestAttestation,
    isLoading: isFDCLoading,
    attestationId,
    attestationData,
    error: fdcError,
    reset: resetFDC
  } = useFDCAttestation();

  // Demo state
  const [customMessage, setCustomMessage] = useState('');
  const [showFDCFlow, setShowFDCFlow] = useState(false);
  const [integrationResult, setIntegrationResult] = useState<any>(null);

  // Mock verification data (would come from KYC in real app)
  const mockVerificationData: MockVerificationData = {
    verificationId: 'demo-verification-123',
    verifiedClaims: [
      { given_name: 'John' },
      { family_name: 'Doe' },
      { age_over_18: 'true' }
    ]
  };

  // Redirect if wallet not connected
  useEffect(() => {
    if (!walletLoading && !xrpAddress) {
      router.push('/');
    }
  }, [xrpAddress, walletLoading, router]);

  // Load contract message on mount
  useEffect(() => {
    if (xrpAddress) {
      readContractMessage();
    }
  }, [xrpAddress, readContractMessage]);

  const handleFDCContractIntegration = async () => {
    if (!customMessage.trim()) {
      alert('Please enter a message for the contract');
      return;
    }

    setShowFDCFlow(true);
    setIntegrationResult(null);

    const result = await createAttestationAndUpdateContract(
      mockVerificationData.verificationId,
      mockVerificationData.verifiedClaims,
      customMessage
    );

    setIntegrationResult(result);
    
    if (!result.success) {
      setShowFDCFlow(false);
    }
  };

  const handleStandaloneFDC = async () => {
    setShowFDCFlow(true);
    const result = await requestAttestation(
      mockVerificationData.verificationId,
      mockVerificationData.verifiedClaims
    );

    if (!result.success) {
      setShowFDCFlow(false);
    }
  };

  const resetDemo = () => {
    setShowFDCFlow(false);
    setIntegrationResult(null);
    setCustomMessage('');
    resetFDC();
  };

  const getFDCStage = () => {
    if (fdcError || contractError) return 'failed';
    if (attestationData || integrationResult?.success) return 'completed';
    if ((attestationId && isFDCLoading) || isContractLoading) return 'validating';
    if (isFDCLoading || isContractLoading) return 'requesting';
    return 'requesting';
  };

  if (walletLoading || !xrpAddress) {
    return (
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="flex flex-col items-center justify-center p-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading FDC demo...</p>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <WalletHeader />
      
      <main className="max-w-6xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔗 FDC + HelloWorld Contract Demo
          </h1>
          <p className="text-gray-600">
            Demonstrate Flare Data Connector integration with smart contracts
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Connected wallet: <code className="bg-gray-100 px-2 py-1 rounded">{xrpAddress}</code>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎮 Demo Controls</h2>
          
          {!showFDCFlow && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FDC + Contract Integration */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-900">
                  🔗 FDC + Contract Integration
                </h3>
                <p className="text-sm text-gray-600">
                  Create FDC attestation AND update HelloWorld contract in one flow
                </p>
                
                <div>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter message for contract..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <Button
                  onClick={handleFDCContractIntegration}
                  disabled={!customMessage.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  🚀 Create Attestation + Update Contract
                </Button>
              </div>

              {/* Standalone FDC */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-purple-900">
                  ⚡ Standalone FDC Attestation
                </h3>
                <p className="text-sm text-gray-600">
                  Create FDC attestation only (without contract interaction)
                </p>
                
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                  <strong>Mock verification data:</strong><br />
                  ID: {mockVerificationData.verificationId}<br />
                  Claims: {JSON.stringify(mockVerificationData.verifiedClaims)}
                </div>
                
                <Button
                  onClick={handleStandaloneFDC}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  ⚡ Create FDC Attestation Only
                </Button>
              </div>
            </div>
          )}

          {showFDCFlow && (
            <div className="space-y-6">
              <FlareAttestationLoader 
                stage={getFDCStage()}
                message={fdcError || contractError || undefined}
              />

              {/* Integration Results */}
              {integrationResult && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">
                    🎉 Integration Complete!
                  </h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>FDC Attestation ID:</strong> <code>{integrationResult.attestationId || 'N/A'}</code></p>
                    <p><strong>Contract Tx Hash:</strong> <code>{integrationResult.contractTxHash?.slice(0, 10)}...{integrationResult.contractTxHash?.slice(-8)}</code></p>
                    <p><strong>Message stored on blockchain:</strong> Updated with verification data</p>
                  </div>
                </div>
              )}

              {/* Standalone FDC Results */}
              {attestationData && !integrationResult && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-800 mb-2">
                    ⚡ FDC Attestation Created!
                  </h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p><strong>Attestation ID:</strong> <code>{attestationId}</code></p>
                    <p><strong>Type:</strong> Web2JSON Identity Verification</p>
                    <p><strong>Source:</strong> Edel-ID (Mock)</p>
                  </div>
                </div>
              )}

              {(fdcError || contractError) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-800 mb-2">❌ Error</h4>
                  <p className="text-sm text-red-700">{fdcError || contractError}</p>
                </div>
              )}

              <Button
                onClick={resetDemo}
                variant="outline"
                className="w-full"
              >
                🔄 Reset Demo
              </Button>
            </div>
          )}
        </div>

        {/* XRPL-Flare Bridge Demo */}
        <div className="mb-8">
          <XRPLFlareBridgeDemo />
        </div>

        {/* HelloWorld Contract Interface */}
        <div className="mb-8">
          <HelloWorldContract 
            onMessageUpdate={(message) => {
              console.log('Contract message updated:', message);
            }}
          />
        </div>

        {/* FDC API Status Reader */}
        <div className="mb-8">
          <FDCStatusReader />
        </div>

        {/* Current Contract State */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Current Contract State</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Message</h3>
              <div className="bg-gray-50 p-3 rounded border">
                {isContractLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Loading...
                  </div>
                ) : contractMessage ? (
                  <p className="text-sm font-mono">{contractMessage}</p>
                ) : (
                  <p className="text-gray-500 italic">No message</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">FDC Status</h3>
              <div className="bg-gray-50 p-3 rounded border">
                {attestationId ? (
                  <div className="text-sm space-y-1">
                    <p><strong>Attestation ID:</strong></p>
                    <p className="font-mono text-xs break-all">{attestationId}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No active attestation</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}