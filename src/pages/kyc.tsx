import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

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
  const { setKycCompleted, kycCompleted } = useWalletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string>("");

  // If already onboarded, redirect to dashboard
  useEffect(() => {
    if (kycCompleted) {
      router.push("/dashboard");
    }
  }, [kycCompleted, router]);

  const startVerification = async () => {
    setIsLoading(true);
    setError("");

    try {
      const verificationPayload = {
        "verificationClaims": ["$.age_over_18", "$.given_name", "$.family_name"]
      };

      const baseUrl = 'https://verifier.edel-id.ch';

      const response = await fetch(`${baseUrl}/api/verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationPayload)
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

  const startDirectVerificationMonitoring = async (verificationId: string, verificationPayload: any, baseUrl: string) => {
    try {
      const sseResponse = await fetch(`${baseUrl}/api/verification/${verificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify(verificationPayload)
      });

      if (!sseResponse.ok) {
        throw new Error(`SSE request failed: ${sseResponse.status}`);
      }

      const reader = sseResponse.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get reader from SSE response');
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const jsonData = line.substring(5).trim();
            if (jsonData) {
              try {
                const data = JSON.parse(jsonData);
                
                // Update verification state
                setVerificationData({
                  state: data.state,
                  verifiedClaims: data.verifiedClaims
                });

                if (data.state === 'SUCCESS' || data.state === 'FAILED') {
                  setIsLoading(false);
                  reader.cancel();
                  return;
                }
              } catch (parseErr) {
                console.error('Error parsing SSE JSON:', parseErr);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Direct SSE monitoring error:', err);
      setError(err instanceof Error ? err.message : 'Failed to monitor verification');
      setIsLoading(false);
    }
  };

  const resetVerification = () => {
    setVerificationId(null);
    setQrCodeUrl("");
    setQrCodeImage("");
    setVerificationData(null);
    setError("");
    setIsLoading(false);
  };

  const getStatusColor = (state: VerificationState) => {
    switch (state) {
      case "PENDING": return "text-yellow-600";
      case "SUCCESS": return "text-green-600";
      case "FAILED": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (state: VerificationState) => {
    switch (state) {
      case "PENDING": return "🔄";
      case "SUCCESS": return "✅";
      case "FAILED": return "❌";
      default: return "⏳";
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <WalletHeader />
      <main className="flex flex-col items-center justify-center p-24">
        <div className="flex flex-col items-center space-y-8 max-w-md w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              KYC Verification
            </h1>
            <p className="text-xl text-gray-600">
              Verify your identity with Edel-ID
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Start Identity Verification
                </h2>
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

              <Button
                onClick={startVerification}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                {isLoading ? "Starting..." : "Start Verification"}
              </Button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Scan QR Code
                </h2>
                
                {verificationData && (
                  <div className={`mb-4 p-3 rounded-lg ${verificationData.state === 'SUCCESS' ? 'bg-green-50' : verificationData.state === 'FAILED' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    <p className={`font-semibold ${getStatusColor(verificationData.state)}`}>
                      {getStatusIcon(verificationData.state)} Status: {verificationData.state}
                    </p>
                  </div>
                )}

                {qrCodeImage && verificationData?.state !== "SUCCESS" && (
                  <>
                    <p className="text-gray-600 mb-4">
                      Scan this QR code with your Edel-ID app
                    </p>
                    <div className="flex justify-center mb-4">
                      <Image
                        src={qrCodeImage}
                        alt="QR Code for verification"
                        width={200}
                        height={200}
                        className="border border-gray-200 rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Or click the link below on your mobile device
                    </p>
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
                            // Format the key nicely
                            const formattedKey = key
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ');

                            if (key === 'age_over_18') {
                              return (
                                <p key={key}>
                                  <strong>{formattedKey}:</strong> {value === "true" ? "✅" : "❌"}
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
                    <Button
                      onClick={() => {
                        setKycCompleted(true);
                        window.location.href = "/payer";
                      }}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                )}

                {verificationData?.state === "FAILED" && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      ❌ Verification Failed
                    </h3>
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
  );
}