import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: 'buyer' | 'seller') => {
    // Store the selected role in session storage
    sessionStorage.setItem('selectedRole', role);
    
    // Redirect to the KYC page with role stored
    router.push('/kyc');
  };
  return (
    <>
      <Head>
        <title>EdelPay - Choose Your Role</title>
        <meta name="description" content="EdelPay - Secure XRPL payment platform. Choose your role: Seller or Buyer" />
      </Head>
      <main className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${inter.className}`}>
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">EdelPay</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Secure payments powered by XRPL blockchain with Edel-ID verification
            </p>
          </div>

          {/* Role Selection */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Choose Your Role
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Seller Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6">🏪</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Seller</h3>
                  <p className="text-gray-600 mb-6">
                    Sell products with XRPL payments and manage your customer subscriptions.
                  </p>
                  <ul className="text-sm text-gray-500 mb-8 space-y-2">
                    <li>✓ Sell Mac Mini Pro (0.3 XRP)</li>
                    <li>✓ Track customer payments</li>
                    <li>✓ 12-month installment plans</li>
                    <li>✓ Payment notifications</li>
                  </ul>
                  <Button
                    onClick={() => handleRoleSelection('seller')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    Continue as Seller
                  </Button>
                </div>
              </div>

              {/* Buyer Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-6xl mb-6">💳</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Buyer</h3>
                  <p className="text-gray-600 mb-6">
                    Purchase products with XRPL and pay in convenient monthly installments.
                  </p>
                  <ul className="text-sm text-gray-500 mb-8 space-y-2">
                    <li>✓ Buy Mac Mini Pro (0.3 XRP)</li>
                    <li>✓ Pay in 12 monthly installments</li>
                    <li>✓ 0.025 XRP per month</li>
                    <li>✓ Secure XRPL payments</li>
                  </ul>
                  <Button
                    onClick={() => handleRoleSelection('buyer')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    Continue as Buyer
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Edel-ID Verification</h4>
                <p className="text-gray-600 text-sm">Secure identity verification for all users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">XRPL Payments</h4>
                <p className="text-gray-600 text-sm">Fast and secure blockchain payments</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Xaman Wallet</h4>
                <p className="text-gray-600 text-sm">Connect with your XRPL wallet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
