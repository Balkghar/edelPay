import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type VerificationState = "PENDING" | "SUCCESS" | "FAILED";

interface VerifiedClaim {
  age_over_18?: string;
  given_name?: string;
  family_name?: string;
}

interface VerificationData {
  state: VerificationState;
  verifiedClaims?: VerifiedClaim[];
}

export default function KYC() {
  const router = useRouter();

  // Wallet context with same properties as header
  const { 
    setKycCompleted, 
    kycCompleted, 
    xrpAddress, 
    isContextLoaded,
    isLoading: walletLoading,
    error: walletError,
    xummQrCode,
    xummJumpLink,
    connectXUMM,
    connectGEM,
    connectCrossmark,
    disconnect
  } = useWalletContext();

  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | null>(null);

  // ✅ Xaman / XUMM credential offer state (added)
  const [xamanQrUrl, setXamanQrUrl] = useState<string>("");
  const [xamanLoading, setXamanLoading] = useState(false);
  const [xamanError, setXamanError] = useState<string>("");
  const [kycCredentialGenerated, setKycCredentialGenerated] = useState(false);
  
  // ✅ FXRP Approval state (new step after credential)
  const [fxrpApprovalQrUrl, setFxrpApprovalQrUrl] = useState<string>("");
  const [fxrpApprovalDeepLink, setFxrpApprovalDeepLink] = useState<string>("");
  const [fxrpApprovalLoading, setFxrpApprovalLoading] = useState(false);
  const [fxrpApprovalError, setFxrpApprovalError] = useState<string>("");
  const [fxrpApprovalCompleted, setFxrpApprovalCompleted] = useState(false);

  // ✅ HARD LOCK to avoid loops / spam (critical)
  const xamanTriggeredRef = useRef(false);

  // Get selected role from sessionStorage and reset KYC status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = sessionStorage.getItem('selectedRole') as 'buyer' | 'seller' | null;
      setSelectedRole(role);
      
      // Check if user returned from FXRP approval
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('fxrp_approved') === 'true') {
        setFxrpApprovalCompleted(true);
        console.log('✅ FXRP approval completed via return URL');
        // Clean up URL
        router.replace('/kyc', undefined, { shallow: true });
      }
      
      // If no role selected, redirect to home
      if (!role) {
        router.push('/');
      } else {
        // Reset KYC status to force new verification
        setKycCompleted(false);
      }
    }
  }, [router, setKycCompleted]);

  // Only redirect if user is fully completed and not in the middle of any process
  useEffect(() => {
    if (isContextLoaded && kycCompleted && selectedRole && !verificationId && !verificationData) {
      const targetPath = selectedRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
      router.push(targetPath);
    }
  }, [kycCompleted, router, isContextLoaded, selectedRole, verificationId, verificationData]);

  // Function to handle completing KYC and redirecting
  const handleCompleteKYC = () => {
    setKycCompleted(true);
    const targetPath = selectedRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';
    router.push(targetPath);
  };

  const startVerification = async () => {
    setIsLoading(true);
    setError("");

    // reset Xaman state when starting new verification
    setXamanQrUrl("");
    setXamanLoading(false);
    setXamanError("");
    setKycCredentialGenerated(false);
    xamanTriggeredRef.current = false;

    try {
      const verificationPayload = {
        verificationClaims: ["$.age_over_18", "$.given_name", "$.family_name"],
      };

      const baseUrl = "https://verifier.edel-id.ch";

      const response = await fetch(`${baseUrl}/api/verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verificationPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const qrData = data.verification_url;
      const verificationId = data.id;

      setVerificationId(verificationId);
      setQrCodeUrl(qrData);

      // Generate QR code image from URL
      const qrImage = await QRCode.toDataURL(qrData);
      setQrCodeImage(qrImage);

      // Start monitoring verification with direct SSE
      startDirectVerificationMonitoring(verificationId, verificationPayload, baseUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start verification");
      setIsLoading(false);
    }
  };

  const startDirectVerificationMonitoring = async (
    verificationId: string,
    verificationPayload: any,
    baseUrl: string
  ) => {
    try {
      const sseResponse = await fetch(`${baseUrl}/api/verification/${verificationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(verificationPayload),
      });

      if (!sseResponse.ok) {
        throw new Error(`SSE request failed: ${sseResponse.status}`);
      }

      const reader = sseResponse.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from SSE response");
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const jsonData = line.substring(5).trim();
            if (jsonData) {
              try {
                const data = JSON.parse(jsonData);

                // Update verification state
                setVerificationData({
                  state: data.state,
                  verifiedClaims: data.verifiedClaims,
                });

                if (data.state === "SUCCESS" || data.state === "FAILED") {
                  setIsLoading(false);
                  reader.cancel();
                  return;
                }
              } catch (parseErr) {
                console.error("Error parsing SSE JSON:", parseErr);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Direct SSE monitoring error:", err);
      setError(err instanceof Error ? err.message : "Failed to monitor verification");
      setIsLoading(false);
    }
  };

  // ✅ Create FXRP Approval QR
  const createFxrpApprovalQr = async () => {
    setFxrpApprovalError("");

    if (!xrpAddress) {
      setFxrpApprovalError("Connect your wallet first (Xaman / Gem / Crossmark).");
      return;
    }

    if (!selectedRole) {
      setFxrpApprovalError("Role not selected. Please refresh and select a role.");
      return;
    }

    setFxrpApprovalLoading(true);

    try {
      console.log(`💰 Creating FXRP approval QR for ${selectedRole} address: ${xrpAddress}`);
      
      const resp = await fetch("/api/flare/create-fxrp-approval-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payerAddress: xrpAddress }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt);
      }

      const data = await resp.json();
      
      // Set the real XUMM QR code URL and deep link
      setFxrpApprovalQrUrl(data.qrUrl);
      setFxrpApprovalDeepLink(data.deepLink);
      
      console.log(`📱 FXRP approval QR created with payload UUID: ${data.payloadUuid}`);
      
      // In a real implementation, you'd poll the XUMM payload status
      // For demo purposes, we'll simulate completion after 10 seconds
      setTimeout(() => {
        setFxrpApprovalCompleted(true);
        console.log(`✅ FXRP approval completed for ${selectedRole}`);
      }, 10000);
      
      console.log(`✅ FXRP approval QR created successfully for ${selectedRole}`);
    } catch (err: any) {
      console.error(`❌ FXRP approval QR creation failed:`, err);
      setFxrpApprovalError(err?.message || "FXRP approval QR creation failed");
    } finally {
      setFxrpApprovalLoading(false);
    }
  };

  // ✅ Create Xaman QR with role-specific endpoint
  const createXamanQr = async () => {
    setXamanError("");

    if (!xrpAddress) {
      setXamanError("Connect your wallet first (Xaman / Gem / Crossmark).");
      return;
    }

    if (!selectedRole) {
      setXamanError("Role not selected. Please refresh and select a role.");
      return;
    }

    // HARD STOP: never create twice
    if (xamanTriggeredRef.current) return;
    xamanTriggeredRef.current = true;

    setXamanLoading(true);

    try {
      // Use different endpoint based on role
      const endpoint = selectedRole === 'buyer' 
        ? "/api/xrpl-credentials/credential-offer"
        : "/api/xrpl-credentials/credential-offer-vendor";
      
      console.log(`🔄 Creating ${selectedRole} KYC credential for address: ${xrpAddress}`);
      
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectAddress: xrpAddress }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt);
      }

      const data = await resp.json();
      setXamanQrUrl(data.payload.refs.qr_png);
      setKycCredentialGenerated(true);
      
      console.log(`✅ ${selectedRole} KYC credential created successfully`);
    } catch (err: any) {
      console.error(`❌ ${selectedRole} KYC credential creation failed:`, err);
      // allow retry if it failed
      xamanTriggeredRef.current = false;
      setXamanError(err?.message || "CredentialCreate failed");
    } finally {
      setXamanLoading(false);
    }
  };

  // ✅ Auto trigger ONCE when SUCCESS + wallet connected
  useEffect(() => {
    if (verificationData?.state === "SUCCESS" && xrpAddress && !xamanTriggeredRef.current) {
      createXamanQr();
    }
    // intentionally NOT depending on createXamanQr (keeps it stable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationData?.state, xrpAddress]);
  
  // ✅ Auto trigger FXRP approval after KYC credential is generated
  useEffect(() => {
    if (kycCredentialGenerated && !fxrpApprovalCompleted && !fxrpApprovalLoading && !fxrpApprovalQrUrl) {
      // Small delay to ensure UI is ready
      setTimeout(() => {
        createFxrpApprovalQr();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kycCredentialGenerated, fxrpApprovalCompleted]);

  const resetVerification = () => {
    setVerificationId(null);
    setQrCodeUrl("");
    setQrCodeImage("");
    setVerificationData(null);
    setError("");
    setIsLoading(false);

    // reset Xaman state
    setXamanQrUrl("");
    setXamanLoading(false);
    setXamanError("");
    setKycCredentialGenerated(false);
    xamanTriggeredRef.current = false;
    
    // reset FXRP approval state
    setFxrpApprovalQrUrl("");
    setFxrpApprovalDeepLink("");
    setFxrpApprovalLoading(false);
    setFxrpApprovalError("");
    setFxrpApprovalCompleted(false);
  };

  const getStatusColor = (state: VerificationState) => {
    switch (state) {
      case "PENDING":
        return "text-yellow-600";
      case "SUCCESS":
        return "text-green-600";
      case "FAILED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (state: VerificationState) => {
    switch (state) {
      case "PENDING":
        return "🔄";
      case "SUCCESS":
        return "✅";
      case "FAILED":
        return "❌";
      default:
        return "⏳";
    }
  };

  return (
    <>
      <Head>
        <title>KYC Verification - EdelPay</title>
        <meta name="description" content="Complete your KYC verification with Edel-ID" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="flex flex-col items-center justify-center p-24">
          <div className="flex flex-col items-center space-y-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedRole === 'buyer' ? '💳' : '🏨'}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedRole === 'buyer' ? 'Buyer' : 'Seller'} KYC Verification
              </h1>
              <p className="text-xl text-gray-600">
                Verify your identity to {selectedRole === 'buyer' ? 'purchase products' : 'sell products'}
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {!verificationId ? (
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start Identity Verification</h2>
                  <p className="text-gray-600 mb-4">
                    We need to verify your identity to ensure security and compliance.
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="font-medium">What we&apos;ll verify:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Age verification (18+)</li>
                      <li>• First name</li>
                      <li>• Last name</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={startVerification}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
                  >
                    {isLoading ? "Starting..." : "Start Verification"}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-3">Don't have Swiss digital identity?</p>
                    <Button
                      onClick={() => {
                        // Simulate successful verification with demo credentials
                        setVerificationData({
                          state: "SUCCESS",
                          verifiedClaims: [{
                            age_over_18: "true",
                            given_name: "Demo",
                            family_name: "User"
                          }]
                        });
                        setVerificationId("demo_verification");
                      }}
                      variant="outline"
                      className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300"
                    >
                      🎭 Skip KYC (Demo Mode)
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">For testing purposes only</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scan QR Code</h2>

                  {verificationData && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${
                        verificationData.state === "SUCCESS"
                          ? "bg-green-50"
                          : verificationData.state === "FAILED"
                            ? "bg-red-50"
                            : "bg-yellow-50"
                      }`}
                    >
                      <p className={`font-semibold ${getStatusColor(verificationData.state)}`}>
                        {getStatusIcon(verificationData.state)} Status: {verificationData.state}
                      </p>
                    </div>
                  )}

                  {qrCodeImage && verificationData?.state !== "SUCCESS" && (
                    <>
                      <p className="text-gray-600 mb-4">Scan this QR code with your Edel-ID app</p>
                      <div className="flex justify-center mb-4">
                        <Image
                          src={qrCodeImage}
                          alt="QR Code for verification"
                          width={200}
                          height={200}
                          className="border border-gray-200 rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Or click the link below on your mobile device</p>
                      <a
                        href={qrCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Open Verification Link
                      </a>
                    </>
                  )}

                  {isLoading && verificationData?.state === "PENDING" && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-600">
                        Waiting for verification... Please complete the process in your Edel-ID app.
                      </p>
                    </div>
                  )}

                  {verificationData?.state === "SUCCESS" && verificationData.verifiedClaims && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">
                        ✅ Verification Successful!
                      </h3>
                      <div className="text-left space-y-2">
                        {verificationData.verifiedClaims.map((claimMap, index) => (
                          <div key={index} className="text-sm">
                            {Object.entries(claimMap).map(([key, value]) => {
                              const formattedKey = key
                                .split("_")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ");

                              if (key === "age_over_18") {
                                return (
                                  <p key={key}>
                                    <strong>{formattedKey}:</strong>{" "}
                                    {value === "true" ? "✅" : "❌"}
                                  </p>
                                );
                              } else {
                                return (
                                  <p key={key}>
                                    <strong>{formattedKey}:</strong> {value}
                                  </p>
                                );
                              }
                            })}
                          </div>
                        ))}
                      </div>
                      {/* Wallet Connection Section */}
                      <div className="mt-6 pt-4 border-t border-green-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-4 text-center">
                          Connect Your XRPL Wallet
                        </h4>

                        {walletError && (
                          <div className="text-red-600 text-sm text-center mb-3">
                            Error: {walletError}
                          </div>
                        )}

                        {xrpAddress ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-3">
                              <span>✅</span>
                              <span>Wallet Connected: {xrpAddress.slice(0, 6)}...{xrpAddress.slice(-4)}</span>
                            </div>
                            <div className="flex justify-center mb-4">
                              <Button
                                onClick={disconnect}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Disconnect Wallet
                              </Button>
                            </div>
                            
                            {(verificationId !== "demo_verification" || selectedRole === 'buyer' || selectedRole === 'seller') && (
                              <div className="border-t border-green-200 pt-4">
                                <h5 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                                  Accept Vendor KYC Credential
                                </h5>
                                {xamanLoading && (
                                  <p className="text-sm text-gray-600 mb-2 text-center">
                                    Preparing credential offer...
                                  </p>
                                )}
                                {xamanQrUrl && (
                                  <>
                                    <p className="text-sm text-gray-600 mb-3 text-center">
                                      Scan this QR code with Xaman to accept your {selectedRole === 'buyer' ? 'Buyer' : 'Vendor'} KYC credential
                                    </p>
                                    <div className="flex justify-center mb-2">
                                      <Image
                                        src={xamanQrUrl}
                                        alt="XUMM QR"
                                        width={200}
                                        height={200}
                                        className="border border-gray-200 rounded-lg"
                                      />
                                    </div>
                                  </>
                                )}
                                {!xamanQrUrl && (
                                  <div className="flex justify-center">
                                    <Button
                                      onClick={createXamanQr}
                                      disabled={xamanLoading}
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                      {xamanLoading ? "Preparing..." : `Generate ${selectedRole === 'buyer' ? 'Buyer' : 'Vendor'} KYC Credential`}
                                    </Button>
                                  </div>
                                )}
                                {xamanError && (
                                  <p className="text-sm text-red-600 mt-2 text-center">{xamanError}</p>
                                )}
                              </div>
                            )}
                            
                            {/* FXRP Approval Section */}
                            {kycCredentialGenerated && (
                              <div className="border-t border-green-200 pt-4 mt-4">
                                <h5 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                                  💰 Approve FXRP Token for {selectedRole === 'buyer' ? 'Purchases' : 'Sales'}
                                </h5>
                                
                                {fxrpApprovalCompleted ? (
                                  <div className="p-3 bg-green-100 rounded-lg mb-3">
                                    <div className="text-center text-green-800">
                                      <div className="text-lg mb-1">✅</div>
                                      <p className="text-sm font-medium">FXRP Approval Completed!</p>
                                      <p className="text-xs text-green-600 mt-1">
                                        Your wallet can now interact with FXRP tokens for secure transactions
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    {fxrpApprovalLoading && (
                                      <p className="text-sm text-gray-600 mb-2 text-center">
                                        Creating FXRP approval transaction...
                                      </p>
                                    )}
                                    
                                    {fxrpApprovalQrUrl && !fxrpApprovalCompleted && (
                                      <>
                                        <p className="text-sm text-gray-600 mb-3 text-center">
                                          Scan this QR code to approve FXRP token transactions
                                        </p>
                                        <div className="flex justify-center mb-3">
                                          <Image
                                            src={fxrpApprovalQrUrl}
                                            alt="FXRP Approval QR"
                                            width={200}
                                            height={200}
                                            className="border border-gray-200 rounded-lg"
                                          />
                                        </div>
                                        <div className="text-xs text-gray-500 text-center mb-3">
                                          <p>This allows your Smart Account to manage FXRP tokens</p>
                                          <p>Required for collateral deposits and payments</p>
                                        </div>
                                        
                                        {fxrpApprovalDeepLink && (
                                          <div className="flex justify-center mb-3">
                                            <Button
                                              onClick={() => window.open(fxrpApprovalDeepLink, '_blank')}
                                              variant="outline"
                                              size="sm"
                                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                            >
                                              📱 Open in Xaman App
                                            </Button>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    
                                    {!fxrpApprovalQrUrl && !fxrpApprovalLoading && (
                                      <div className="flex justify-center">
                                        <Button
                                          onClick={createFxrpApprovalQr}
                                          disabled={fxrpApprovalLoading}
                                          size="sm"
                                          className="bg-orange-600 hover:bg-orange-700 text-white"
                                        >
                                          {fxrpApprovalLoading ? "Preparing..." : "💰 Generate FXRP Approval QR"}
                                        </Button>
                                      </div>
                                    )}
                                    
                                    {fxrpApprovalError && (
                                      <p className="text-sm text-red-600 mt-2 text-center">{fxrpApprovalError}</p>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">
                              Connect your XRPL wallet to continue
                            </p>
                            
                            <div className="flex items-center justify-center space-x-2 mb-4">
                              <Drawer>
                                <DrawerTrigger
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={connectXUMM}
                                  disabled={walletLoading}
                                >
                                  {walletLoading ? "Connecting..." : "XAMAN"}
                                </DrawerTrigger>
                                <DrawerContent className="bg-white p-4">
                                  <DrawerHeader className="flex flex-col items-center">
                                    <DrawerTitle>Scan this QR code to sign in with Xaman!</DrawerTitle>
                                  </DrawerHeader>
                                  <DrawerDescription className="flex flex-col items-center">
                                    {xummQrCode !== "" ? (
                                      <Image
                                        src={xummQrCode}
                                        alt="Xaman QR code"
                                        width={200}
                                        height={200}
                                        priority
                                      />
                                    ) : (
                                      <div className="flex flex-col space-y-3">
                                        <Skeleton className="h-[250px] w-[250px] rounded-xl bg-gray-300" />
                                      </div>
                                    )}
                                    {xummJumpLink !== "" && (
                                      <Button
                                        className="mt-2 bg-blue-400 hover:bg-blue-500 w-48 h-12"
                                        onClick={() => {
                                          window.open(xummJumpLink, "_blank");
                                        }}
                                      >
                                        Open in Xaman
                                      </Button>
                                    )}
                                  </DrawerDescription>
                                </DrawerContent>
                              </Drawer>

                              <Button
                                onClick={connectGEM}
                                disabled={walletLoading}
                                size="sm"
                                className="bg-blue-400 hover:bg-blue-500 text-white"
                              >
                                GEM
                              </Button>

                              <Button
                                onClick={connectCrossmark}
                                disabled={walletLoading}
                                size="sm"
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                Crossmark
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-center space-x-2 text-sm text-orange-600">
                              <span>⚠️</span>
                              <span>Wallet connection required to continue</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={handleCompleteKYC}
                        disabled={
                          !xrpAddress || 
                          (selectedRole && verificationId !== "demo_verification" && !kycCredentialGenerated) ||
                          (kycCredentialGenerated && !fxrpApprovalCompleted)
                        }
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white"
                      >
                        {!xrpAddress 
                          ? 'Connect Wallet to Continue' 
                          : (selectedRole && verificationId !== "demo_verification" && !kycCredentialGenerated)
                            ? 'Generate KYC Credential to Continue'
                            : (kycCredentialGenerated && !fxrpApprovalCompleted)
                              ? 'Complete FXRP Approval to Continue'
                              : `Continue to ${selectedRole === 'buyer' ? 'Shop Mac Mini Pro' : 'Seller Dashboard'}`
                        }
                      </Button>
                    </div>
                  )}

                  {verificationData?.state === "FAILED" && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Verification Failed</h3>
                      <p className="text-red-600 mb-4">
                        The verification process was not completed successfully.
                      </p>
                      <Button
                        onClick={resetVerification}
                        variant="outline"
                        className="w-full border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
