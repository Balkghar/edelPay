import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import CollateralDepositManager from "@/components/CollateralDepositManager";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CollateralDemo() {
  const { xrpAddress, isContextLoaded } = useWalletContext();
  const [isTestingAPI, setIsTestingAPI] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testDepositAPI = async () => {
    setIsTestingAPI(true);
    setTestResults(null);

    try {
      const testPayload = {
        collateralAmount: (0.1 * 10**18).toString(), // 0.1 FXRP in wei
        addressVendor: xrpAddress || "rDEMOwALLETaDDRESSfORtESTING123456"
      };

      const response = await fetch('/api/flare/deposit-custom-instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload),
      });

      const data = await response.json();

      setTestResults({
        success: response.ok,
        status: response.status,
        data: data,
        payload: testPayload
      });

    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsTestingAPI(false);
    }
  };

  if (!isContextLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Collateral Deposit Demo - EdelPay</title>
        <meta name="description" content="Test and manage collateral deposits" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🏦 Collateral Deposit Demo
            </h1>
            <p className="text-gray-600">
              Test the collateral deposit system using the deposit-custom-instruction script
            </p>
          </div>

          {/* API Test Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🧪 Test Deposit Custom Instructions API
            </h2>
            <p className="text-gray-600 mb-6">
              This tests the `/api/flare/deposit-custom-instructions` endpoint directly.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Current Configuration:</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p><strong>Wallet Address:</strong> {xrpAddress || "Not connected"}</p>
                  <p><strong>Test Amount:</strong> 0.1 FXRP</p>
                  <p><strong>Vault Contract:</strong> {process.env.NEXT_PUBLIC_VAULT_CONTRACT || "From ENV"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What this test does:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Calls the deposit-custom-instructions API</li>
                  <li>Creates a XRPL payment with smart contract memo</li>
                  <li>Encodes depositCollateral function call</li>
                  <li>Returns transaction JSON for signing</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={testDepositAPI}
              disabled={isTestingAPI || !xrpAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
            >
              {isTestingAPI ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing API...
                </div>
              ) : (
                "🚀 Test Deposit Custom Instructions API"
              )}
            </Button>

            {!xrpAddress && (
              <p className="text-sm text-red-600 text-center">
                Please connect your wallet to test the API
              </p>
            )}

            {/* Test Results */}
            {testResults && (
              <div className={`mt-6 p-4 rounded-lg ${testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className={`font-semibold mb-3 ${testResults.success ? 'text-green-900' : 'text-red-900'}`}>
                  {testResults.success ? '✅ API Test Successful!' : '❌ API Test Failed'}
                </h4>
                
                <div className="space-y-3">
                  {testResults.success ? (
                    <>
                      <div className="bg-white p-3 rounded border">
                        <strong>HTTP Status:</strong> {testResults.status}
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <strong>Request Payload:</strong>
                        <pre className="text-xs mt-1 overflow-x-auto">
                          {JSON.stringify(testResults.payload, null, 2)}
                        </pre>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <strong>Transaction JSON:</strong>
                        <pre className="text-xs mt-1 overflow-x-auto">
                          {JSON.stringify(testResults.data.txJson, null, 2)}
                        </pre>
                      </div>
                      
                      <div className="text-sm text-green-800">
                        <p>✅ The API successfully created a custom instruction transaction!</p>
                        <p>📝 The transaction includes a memo with the encoded depositCollateral function call</p>
                        <p>🔗 This transaction can be signed with XUMM to execute the collateral deposit</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded border">
                        <strong>Error:</strong> {testResults.error}
                      </div>
                      {testResults.status && (
                        <div className="bg-white p-3 rounded border">
                          <strong>HTTP Status:</strong> {testResults.status}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Manager */}
          <CollateralDepositManager sellerAddress={xrpAddress} />

          {/* Architecture Explanation */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🏗️ Collateral Deposit Architecture
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Flow Overview:</h3>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  <li><strong>Buyer initiates purchase</strong> on buyer dashboard</li>
                  <li><strong>System calculates collateral</strong> (20% of product value)</li>
                  <li><strong>Collateral request created</strong> for seller</li>
                  <li><strong>Seller sees request</strong> in their dashboard</li>
                  <li><strong>Seller clicks deposit</strong> → API creates transaction</li>
                  <li><strong>Smart contract instruction</strong> encoded in memo</li>
                  <li><strong>XRPL payment sent</strong> to operator address</li>
                  <li><strong>FDC detects transaction</strong> and executes</li>
                  <li><strong>Collateral locked</strong> in Flare smart contract</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Technical Details:</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>API Endpoint:</strong><br/>
                    <code className="text-xs">/api/flare/deposit-custom-instructions</code>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Smart Contract Function:</strong><br/>
                    <code className="text-xs">depositCollateral(addressVendor, amount)</code>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Vault Contract:</strong><br/>
                    <code className="text-xs">{process.env.NEXT_PUBLIC_VAULT_CONTRACT || "Set in ENV"}</code>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Token:</strong><br/>
                    <code className="text-xs">FXRP (Wrapped XRP on Flare)</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Integration Points:</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li><strong>Buyer Dashboard:</strong> Automatically triggers collateral requests on purchase</li>
                <li><strong>Seller Dashboard:</strong> Shows pending collateral requests and deposit interface</li>
                <li><strong>XRPL Bridge:</strong> Uses FDC to execute Flare smart contract functions</li>
                <li><strong>Smart Contracts:</strong> Manages collateral locking and release</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}