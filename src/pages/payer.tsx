import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export default function Payer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { xrpAddress } = useWalletContext();

  const handlePayment = () => {
    if (!amount || !recipient) {
      alert("Please enter both amount and recipient address");
      return;
    }
    // TODO: Implement payment logic
    console.log(`Sending ${amount} XRP to ${recipient}`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <WalletHeader />
      <main className="flex flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            EdelPay Payer
          </h1>
          <p className="text-xl text-gray-600">
            Send secure payments with XRPL
          </p>
        </div>

        {!xrpAddress ? (
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-4">
              Please connect your wallet using the buttons in the header above to start making payments.
            </p>
            <div className="text-sm text-gray-500">
              Supported wallets: XAMAN, GEM, and Crossmark
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Make a Payment</p>
              <p className="text-xs text-gray-500">
                Connected: {xrpAddress.slice(0, 6)}...{xrpAddress.slice(-4)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (XRP)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.000001"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>

              <Button
                onClick={handlePayment}
                disabled={!amount || !recipient}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg"
              >
                Send Payment
              </Button>
            </div>
          </div>
        )}
      </div>
      </main>
    </div>
  );
}