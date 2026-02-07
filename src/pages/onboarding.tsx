import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Onboarding() {
  const router = useRouter();

  const handleStartKYC = () => {
    router.push("/kyc");
  };

  return (
    <>
      <Head>
        <title>Onboarding - EdelPay</title>
        <meta name="description" content="Get started with EdelPay verification process" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
      <main className="flex flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to EdelPay
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Complete your verification process to start using our secure payment platform
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Get Started
            </h2>
            <p className="text-gray-600">
              To ensure security and compliance, we need to verify your identity
            </p>
          </div>

          <Button
            onClick={handleStartKYC}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Start KYC
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 max-w-md">
          <p>
            By proceeding, you agree to our Terms of Service and Privacy Policy. 
            The verification process typically takes 2-5 minutes to complete.
          </p>
        </div>
      </div>
      </main>
    </div>
    </>
  );
}