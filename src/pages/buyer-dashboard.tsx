import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface PaymentPlan {
  totalPrice: number;
  monthlyPayment: number;
  duration: number; // in months
  currentPayment: number;
  nextPaymentDue: Date | null;
  paymentHistory: Payment[];
}

interface Payment {
  id: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed";
  txHash?: string;
}

export default function BuyerDashboard() {
  const router = useRouter();
  const { kycCompleted, isContextLoaded, xrpAddress } = useWalletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);

  // Redirect if not KYC completed
  useEffect(() => {
    if (isContextLoaded && !kycCompleted) {
      router.push("/kyc-buyer");
    }
  }, [kycCompleted, router, isContextLoaded]);

  // Sample Mac Mini Pro product data
  const product = {
    name: "Mac Mini Pro",
    image: "/images/mac-mini-pro.jpg", // This would be a placeholder image
    originalPrice: 1999,
    xrpPrice: 0.3,
    description: "The latest Mac Mini Pro with M3 Pro chip, 16GB RAM, and 1TB SSD. Perfect for professional workflows and creative projects.",
    specifications: [
      "Apple M3 Pro chip",
      "16GB unified memory",
      "1TB SSD storage",
      "4x Thunderbolt 4 ports",
      "2x USB-A ports",
      "HDMI port",
      "Ethernet port",
    ],
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    
    try {
      // Simulate creating a payment plan
      const newPaymentPlan: PaymentPlan = {
        totalPrice: 0.3,
        monthlyPayment: 0.025, // 0.3 / 12
        duration: 12,
        currentPayment: 1,
        nextPaymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        paymentHistory: [],
      };

      setPaymentPlan(newPaymentPlan);
      
      // In a real implementation, this would:
      // 1. Create a smart contract for the payment plan
      // 2. Process the first payment
      // 3. Set up automated recurring payments
      // 4. Store the plan in a database
      
    } catch (error) {
      console.error("Purchase failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakePayment = async () => {
    if (!paymentPlan) return;
    
    setIsLoading(true);
    
    try {
      // Simulate making a payment
      const newPayment: Payment = {
        id: `payment_${Date.now()}`,
        amount: paymentPlan.monthlyPayment,
        date: new Date(),
        status: "completed",
        txHash: `tx_${Math.random().toString(36).substr(2, 9)}`,
      };

      const updatedPlan = {
        ...paymentPlan,
        currentPayment: paymentPlan.currentPayment + 1,
        nextPaymentDue: paymentPlan.currentPayment < paymentPlan.duration 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : null,
        paymentHistory: [newPayment, ...paymentPlan.paymentHistory],
      };

      setPaymentPlan(updatedPlan);
      
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatXRP = (amount: number) => `${amount.toFixed(3)} XRP`;
  const formatDate = (date: Date) => date.toLocaleDateString();

  if (!isContextLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Buyer Dashboard - EdelPay</title>
        <meta name="description" content="Purchase products with XRP installments" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
            <p className="text-gray-600">Welcome to your shopping dashboard. Purchase products with flexible XRP payment plans.</p>
          </div>

          {!paymentPlan ? (
            // Product showcase
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">💻</div>
                      <p className="text-gray-500">Mac Mini Pro Image</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 mr-4">
                      {formatXRP(product.xrpPrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Payment Plan</h3>
                    <div className="text-sm text-blue-800">
                      <p>• Total: {formatXRP(product.xrpPrice)}</p>
                      <p>• Monthly: {formatXRP(product.xrpPrice / 12)} × 12 months</p>
                      <p>• First payment due on purchase</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    onClick={handlePurchase}
                    disabled={isLoading || !xrpAddress}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Purchase with ${formatXRP(product.xrpPrice / 12)}/month`
                    )}
                  </Button>
                  
                  {!xrpAddress && (
                    <p className="text-sm text-red-600 mt-2 text-center">
                      Please connect your wallet to make a purchase
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Payment plan dashboard
            <div className="space-y-8">
              {/* Payment Plan Overview */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Mac Mini Pro Payment Plan</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {paymentPlan.currentPayment}/{paymentPlan.duration}
                    </div>
                    <div className="text-gray-600">Payments Made</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {formatXRP(paymentPlan.monthlyPayment * (paymentPlan.currentPayment - 1))}
                    </div>
                    <div className="text-gray-600">Total Paid</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {formatXRP(paymentPlan.totalPrice - (paymentPlan.monthlyPayment * (paymentPlan.currentPayment - 1)))}
                    </div>
                    <div className="text-gray-600">Remaining</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Payment Progress</span>
                    <span>{Math.round(((paymentPlan.currentPayment - 1) / paymentPlan.duration) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((paymentPlan.currentPayment - 1) / paymentPlan.duration) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Payment */}
                {paymentPlan.nextPaymentDue && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-yellow-800 mb-2">Next Payment Due</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-yellow-700">
                          Amount: {formatXRP(paymentPlan.monthlyPayment)}
                        </p>
                        <p className="text-yellow-700">
                          Due: {formatDate(paymentPlan.nextPaymentDue)}
                        </p>
                      </div>
                      <Button
                        onClick={handleMakePayment}
                        disabled={isLoading}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        {isLoading ? "Processing..." : "Pay Now"}
                      </Button>
                    </div>
                  </div>
                )}

                {paymentPlan.currentPayment > paymentPlan.duration && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
                    <p className="text-green-700">
                      Your Mac Mini Pro is fully paid! Your device will be shipped to your verified address.
                    </p>
                  </div>
                )}
              </div>

              {/* Payment History */}
              {paymentPlan.paymentHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment History</h3>
                  
                  <div className="space-y-4">
                    {paymentPlan.paymentHistory.map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              Payment #{payment.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(payment.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatXRP(payment.amount)}
                            </p>
                            <p className={`text-sm ${
                              payment.status === "completed" ? "text-green-600" :
                              payment.status === "pending" ? "text-yellow-600" :
                              "text-red-600"
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </p>
                          </div>
                        </div>
                        {payment.txHash && (
                          <p className="text-xs text-gray-500 mt-2">
                            TX: {payment.txHash}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}