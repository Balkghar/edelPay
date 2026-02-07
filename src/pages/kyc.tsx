import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Image from "next/image";

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
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string>("");

  const startVerification = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/start-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationClaims: ["$.age_over_18", "$.given_name", "$.family_name"]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVerificationId(data.id);
      setQrCodeUrl(data.verification_url);

      // Generate QR code image from URL
      const qrImage = await QRCode.toDataURL(data.verification_url);
      setQrCodeImage(qrImage);

      // Start monitoring verification
      startVerificationMonitoring(data.id);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start verification");
      setIsLoading(false);
    }
  };

  const startVerificationMonitoring = (id: string) => {
    const eventSource = new EventSource(`/api/check-verification/${id}`);

    eventSource.onmessage = (event) => {
      try {
        const data: VerificationData = JSON.parse(event.data);
        setVerificationData(data);

        if (data.state === "SUCCESS" || data.state === "FAILED") {
          setIsLoading(false);
          eventSource.close();
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      setError("Connection error during verification");
      setIsLoading(false);
      eventSource.close();
    };
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
                  <p className="font-medium">What we'll verify:</p>
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
                      {verificationData.verifiedClaims.map((claim, index) => (
                        <div key={index} className="text-sm">
                          {claim.age_over_18 && (
                            <p><strong>Age 18+:</strong> {claim.age_over_18 === "true" ? "Verified ✅" : "Not verified ❌"}</p>
                          )}
                          {claim.given_name && (
                            <p><strong>First Name:</strong> {claim.given_name}</p>
                          )}
                          {claim.family_name && (
                            <p><strong>Last Name:</strong> {claim.family_name}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => window.location.href = "/payer"}
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