import WalletHeader from "@/components/WalletHeader";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Seller() {
  return (
    <>
      <Head>
        <title>Seller - EdelPay</title>
        <meta name="description" content="Seller dashboard for EdelPay" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
      <main className="flex flex-col items-center justify-center p-24">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Seller Setup
            </h1>
            <p className="text-xl text-gray-600">
              Coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}