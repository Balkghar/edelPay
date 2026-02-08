import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWalletContext } from "@/contexts/WalletContext";
import Image from 'next/image';

interface CollateralRequest {
  id: string;
  productName: string;
  buyerAddress: string;
  collateralAmount: string; // in FXRP wei
  collateralAmountXRP: number; // display amount
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  txHash?: string;
}

interface CollateralDepositManagerProps {
  sellerAddress?: string;
}

const CollateralDepositManager: React.FC<CollateralDepositManagerProps> = ({ 
  sellerAddress 
}) => {
  const { xrpAddress } = useWalletContext();
  const [requests, setRequests] = useState<CollateralRequest[]>([
    {
      id: 'req_001',
      productName: 'Mac Mini Pro',
      buyerAddress: 'rBUYERwALLETaDDRESSfORdEMO123456',
      collateralAmount: (0.06 * 10**18).toString(), // 0.06 FXRP in wei
      collateralAmountXRP: 0.06, // 20% of 0.3 XRP
      status: 'pending',
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
  ]);
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});
  const [loadingRequests, setLoadingRequests] = useState<Set<string>>(new Set());

  const handleDepositCollateral = async (request: CollateralRequest) => {
    if (loadingRequests.has(request.id)) return;

    const newLoadingRequests = new Set(loadingRequests);
    newLoadingRequests.add(request.id);
    setLoadingRequests(newLoadingRequests);

    try {
      // Update request status to processing
      setRequests(prev => prev.map(req => 
        req.id === request.id 
          ? { ...req, status: 'processing' } 
          : req
      ));

      // Call the deposit-custom-instructions API
      const response = await fetch('/api/flare/deposit-custom-instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collateralAmount: request.collateralAmount,
          addressVendor: xrpAddress || sellerAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create collateral deposit instruction');
      }

      const data = await response.json();
      console.log('🏦 Collateral deposit transaction created:', data.txJson);

      // In a real implementation, this would create a XUMM QR code
      // For now, we'll simulate the QR code creation
      const mockQrCode = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <rect width="200" height="200" fill="white"/>
          <text x="100" y="100" text-anchor="middle" fill="black" font-size="12">
            Collateral Deposit QR
          </text>
          <text x="100" y="120" text-anchor="middle" fill="gray" font-size="8">
            ${request.collateralAmountXRP} FXRP
          </text>
        </svg>
      `)}`;

      setQrCodes(prev => ({
        ...prev,
        [request.id]: mockQrCode,
      }));

      // Simulate successful transaction after a delay
      setTimeout(() => {
        setRequests(prev => prev.map(req => 
          req.id === request.id 
            ? { 
                ...req, 
                status: 'completed',
                txHash: `tx_${Math.random().toString(36).substr(2, 9)}`
              } 
            : req
        ));
      }, 3000);

    } catch (error) {
      console.error('Collateral deposit failed:', error);
      
      // Update request status to failed
      setRequests(prev => prev.map(req => 
        req.id === request.id 
          ? { ...req, status: 'failed' } 
          : req
      ));

      alert('Failed to create collateral deposit: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      // Remove from loading set
      const newLoadingRequests = new Set(loadingRequests);
      newLoadingRequests.delete(request.id);
      setLoadingRequests(newLoadingRequests);
    }
  };

  const getStatusColor = (status: CollateralRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: CollateralRequest['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '🔄';
      case 'completed': return '✅';
      case 'failed': return '❌';
      default: return '⚪';
    }
  };

  const formatAmount = (amount: number) => `${amount.toFixed(3)} FXRP`;
  const formatDate = (date: Date) => date.toLocaleTimeString();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">🏦 Collateral Deposit Manager</h2>
        <p className="text-gray-600">Manage collateral deposits for secure transactions</p>
      </div>

      <div className="p-6">
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💰</div>
            <p>No collateral deposit requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.productName}</h3>
                    <p className="text-sm text-gray-600">
                      Buyer: {request.buyerAddress.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested: {formatDate(request.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      {formatAmount(request.collateralAmountXRP)}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <Button
                    onClick={() => handleDepositCollateral(request)}
                    disabled={loadingRequests.has(request.id)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {loadingRequests.has(request.id) ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Deposit Transaction...
                      </div>
                    ) : (
                      `💰 Deposit ${formatAmount(request.collateralAmountXRP)} Collateral`
                    )}
                  </Button>
                )}

                {request.status === 'processing' && qrCodes[request.id] && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Scan QR Code to Sign Transaction</h4>
                    <div className="flex justify-center mb-3">
                      <Image
                        src={qrCodes[request.id]}
                        alt="Collateral Deposit QR Code"
                        width={150}
                        height={150}
                        className="border border-gray-200 rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-blue-800 text-center">
                      Scan with your XRPL wallet to sign the collateral deposit transaction
                    </p>
                  </div>
                )}

                {request.status === 'completed' && request.txHash && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Collateral Deposited Successfully!</h4>
                    <div className="text-sm text-green-800">
                      <p><strong>Amount:</strong> {formatAmount(request.collateralAmountXRP)}</p>
                      <p><strong>Transaction:</strong> <code className="text-xs">{request.txHash}</code></p>
                      <p className="mt-2">The collateral has been locked in the smart contract and the sale can proceed.</p>
                    </div>
                  </div>
                )}

                {request.status === 'failed' && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">❌ Collateral Deposit Failed</h4>
                    <p className="text-sm text-red-800 mb-3">
                      There was an error processing the collateral deposit. Please try again.
                    </p>
                    <Button
                      onClick={() => handleDepositCollateral(request)}
                      disabled={loadingRequests.has(request.id)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Retry Deposit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          <h5 className="font-medium mb-2">💡 How Collateral Deposits Work:</h5>
          <ul className="space-y-1 list-disc list-inside">
            <li>When a buyer initiates a purchase, a collateral deposit request is created</li>
            <li>As a seller, you must deposit collateral (typically 20% of product value)</li>
            <li>This collateral ensures you fulfill the sale and protects the buyer</li>
            <li>Collateral is automatically released when the sale is completed successfully</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollateralDepositManager;