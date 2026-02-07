import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";
import { useXRPLPayment } from "@/hooks/useXRPLPayment";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Subscription {
  id: string;
  name: string;
  description: string;
  monthlyAmount: number;
  currency: string;
  startDate: string;
  nextPaymentDate: string;
  isPaid: boolean;
  unpaidMonths: number;
  totalDue: number;
  status: 'active' | 'overdue' | 'cancelled';
}

interface PaymentHistory {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  transactionHash?: string;
}

interface InstallmentProduct {
  id: string;
  name: string;
  description: string;
  totalPrice: number;
  currency: string;
  monthlyPayment: number;
  totalMonths: number;
  paidMonths: number;
  remainingMonths: number;
  nextPaymentDate: string;
  isPaid: boolean;
  status: 'active' | 'completed' | 'overdue' | 'cancelled';
  purchaseDate: string;
  imageUrl?: string;
}

interface InstallmentPayment {
  id: string;
  productId: string;
  monthNumber: number;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  transactionHash?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { xrpAddress, isLoading: walletLoading, kycCompleted } = useWalletContext();
  const { processPayment, createPaymentRequest, isProcessing } = useXRPLPayment();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [installmentProducts, setInstallmentProducts] = useState<InstallmentProduct[]>([]);
  const [installmentPayments, setInstallmentPayments] = useState<InstallmentPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Redirect if wallet not connected or not onboarded
  useEffect(() => {
    if (!walletLoading) {
      if (!xrpAddress || !kycCompleted) {
        router.push('/kyc');
      }
    }
  }, [xrpAddress, kycCompleted, walletLoading, router]);

  // Mock data - replace with real API calls
  useEffect(() => {
    if (xrpAddress) {
      loadUserData();
    }
  }, [xrpAddress]);

  const loadUserData = async () => {
    setIsLoading(true);
    
    // Mock subscriptions data
    const mockSubscriptions: Subscription[] = [
      {
        id: 'sub-1',
        name: 'Premium Service',
        description: 'Premium access to advanced features',
        monthlyAmount: 29.99,
        currency: 'USD',
        startDate: '2024-01-01',
        nextPaymentDate: '2024-03-01',
        isPaid: false,
        unpaidMonths: 2,
        totalDue: 59.98,
        status: 'overdue'
      },
      {
        id: 'sub-2', 
        name: 'Basic Plan',
        description: 'Basic subscription with essential features',
        monthlyAmount: 9.99,
        currency: 'USD',
        startDate: '2024-02-01',
        nextPaymentDate: '2024-03-01',
        isPaid: true,
        unpaidMonths: 0,
        totalDue: 0,
        status: 'active'
      },
      {
        id: 'sub-3',
        name: 'Enterprise Solution',
        description: 'Enterprise solution with dedicated support',
        monthlyAmount: 99.99,
        currency: 'USD',
        startDate: '2023-12-01',
        nextPaymentDate: '2024-03-01',
        isPaid: false,
        unpaidMonths: 1,
        totalDue: 99.99,
        status: 'overdue'
      }
    ];

    const mockHistory: PaymentHistory[] = [
      {
        id: 'pay-1',
        subscriptionId: 'sub-2',
        amount: 9.99,
        currency: 'USD',
        date: '2024-02-01',
        status: 'completed',
        transactionHash: '0x123...abc'
      },
      {
        id: 'pay-2',
        subscriptionId: 'sub-1',
        amount: 29.99,
        currency: 'USD',
        date: '2024-01-01',
        status: 'completed',
        transactionHash: '0x456...def'
      }
    ];

    // Mock installment products data
    const mockInstallmentProducts: InstallmentProduct[] = [
      {
        id: 'product-1',
        name: 'Mac Mini M2',
        description: 'Apple Mac Mini with M2 chip, 8GB RAM, 256GB SSD',
        totalPrice: 699.99,
        currency: 'USD',
        monthlyPayment: 58.33,
        totalMonths: 12,
        paidMonths: 7,
        remainingMonths: 5,
        nextPaymentDate: '2024-03-15',
        isPaid: false,
        status: 'active',
        purchaseDate: '2023-08-15',
        imageUrl: '/images/mac-mini.jpg'
      },
      {
        id: 'product-2',
        name: 'iPhone 15 Pro',
        description: 'iPhone 15 Pro 128GB Titanium Blue',
        totalPrice: 1199.99,
        currency: 'USD',
        monthlyPayment: 99.99,
        totalMonths: 12,
        paidMonths: 12,
        remainingMonths: 0,
        nextPaymentDate: '2024-02-01',
        isPaid: true,
        status: 'completed',
        purchaseDate: '2023-02-01'
      },
      {
        id: 'product-3',
        name: 'Samsung Galaxy Watch 6',
        description: 'Smartwatch with GPS and health monitoring',
        totalPrice: 329.99,
        currency: 'USD',
        monthlyPayment: 55.00,
        totalMonths: 6,
        paidMonths: 2,
        remainingMonths: 4,
        nextPaymentDate: '2024-03-10',
        isPaid: false,
        status: 'overdue',
        purchaseDate: '2023-12-10'
      }
    ];

    const mockInstallmentPayments: InstallmentPayment[] = [
      {
        id: 'install-1',
        productId: 'product-1',
        monthNumber: 7,
        amount: 58.33,
        currency: 'USD',
        date: '2024-02-15',
        status: 'completed',
        transactionHash: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0'
      },
      {
        id: 'install-2',
        productId: 'product-2',
        monthNumber: 12,
        amount: 99.99,
        currency: 'USD',
        date: '2024-01-01',
        status: 'completed',
        transactionHash: 'B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1'
      }
    ];

    setSubscriptions(mockSubscriptions);
    setPaymentHistory(mockHistory);
    setInstallmentProducts(mockInstallmentProducts);
    setInstallmentPayments(mockInstallmentPayments);
    setIsLoading(false);
  };

  const handlePaySubscription = async (subscriptionId: string, payAllDue: boolean = false) => {
    setIsLoading(true);
    setSelectedSubscription(subscriptionId);

    try {
      const subscription = subscriptions.find(s => s.id === subscriptionId);
      if (!subscription) throw new Error('Subscription not found');

      const amount = payAllDue ? subscription.totalDue : subscription.monthlyAmount;
      
      // Create and process XRPL payment
      const paymentRequest = createPaymentRequest(
        subscriptionId,
        amount,
        subscription.currency,
        payAllDue ? `Full payment for ${subscription.name}` : `Monthly payment for ${subscription.name}`
      );
      
      const result = await processPayment(paymentRequest);
      
      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }
      
      // Update subscription status
      setSubscriptions(prev => prev.map(sub => {
        if (sub.id === subscriptionId) {
          return {
            ...sub,
            isPaid: true,
            unpaidMonths: payAllDue ? 0 : Math.max(0, sub.unpaidMonths - 1),
            totalDue: payAllDue ? 0 : Math.max(0, sub.totalDue - amount),
            status: (payAllDue || sub.unpaidMonths <= 1) ? 'active' : 'overdue',
            nextPaymentDate: getNextPaymentDate(sub.nextPaymentDate)
          };
        }
        return sub;
      }));

      // Add to payment history with real transaction hash
      const newPayment: PaymentHistory = {
        id: `pay-${Date.now()}`,
        subscriptionId,
        amount,
        currency: subscription.currency,
        date: new Date().toISOString(),
        status: 'completed',
        transactionHash: result.transactionHash
      };
      setPaymentHistory(prev => [newPayment, ...prev]);

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedSubscription(null);
    }
  };

  const handlePayInstallment = async (productId: string) => {
    setIsLoading(true);
    setSelectedProduct(productId);

    try {
      const product = installmentProducts.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');

      // Create and process XRPL payment
      const paymentRequest = createPaymentRequest(
        productId,
        product.monthlyPayment,
        product.currency,
        `Installment payment ${product.paidMonths + 1}/${product.totalMonths} for ${product.name}`
      );
      
      const result = await processPayment(paymentRequest);
      
      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }
      
      // Update product status
      setInstallmentProducts(prev => prev.map(prod => {
        if (prod.id === productId) {
          const newPaidMonths = prod.paidMonths + 1;
          const newRemainingMonths = prod.totalMonths - newPaidMonths;
          const isCompleted = newRemainingMonths === 0;
          
          return {
            ...prod,
            paidMonths: newPaidMonths,
            remainingMonths: newRemainingMonths,
            isPaid: isCompleted,
            status: isCompleted ? 'completed' : 'active',
            nextPaymentDate: isCompleted ? prod.nextPaymentDate : getNextPaymentDate(prod.nextPaymentDate)
          };
        }
        return prod;
      }));

      // Add to installment payment history
      const newInstallmentPayment: InstallmentPayment = {
        id: `install-${Date.now()}`,
        productId,
        monthNumber: product.paidMonths + 1,
        amount: product.monthlyPayment,
        currency: product.currency,
        date: new Date().toISOString(),
        status: 'completed',
        transactionHash: result.transactionHash
      };
      setInstallmentPayments(prev => [newInstallmentPayment, ...prev]);

    } catch (error) {
      console.error('Installment payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedProduct(null);
    }
  };

  const getNextPaymentDate = (currentDate: string) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDaysUntilPayment = (nextPaymentDate: string) => {
    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (walletLoading || !xrpAddress) {
    return (
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="flex flex-col items-center justify-center p-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - EdelPay</title>
        <meta name="description" content="Manage your subscriptions and payments" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
      
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your subscriptions and payments
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Connected wallet: <code className="bg-gray-100 px-2 py-1 rounded">{xrpAddress}</code>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Subscriptions</h3>
            <div className="text-3xl font-bold text-green-600">
              {subscriptions.filter(s => s.status === 'active').length}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Products</h3>
            <div className="text-3xl font-bold text-blue-600">
              {installmentProducts.filter(p => p.status === 'active' || p.status === 'overdue').length}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Amount Due</h3>
            <div className="text-3xl font-bold text-red-600">
              ${(subscriptions.reduce((sum, s) => sum + s.totalDue, 0) + 
                installmentProducts.filter(p => p.remainingMonths > 0)
                .reduce((sum, p) => sum + (p.monthlyPayment * p.remainingMonths), 0)).toFixed(2)}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Months Remaining</h3>
            <div className="text-3xl font-bold text-orange-600">
              {subscriptions.reduce((sum, s) => sum + s.unpaidMonths, 0) + 
               installmentProducts.reduce((sum, p) => sum + p.remainingMonths, 0)}
            </div>
          </div>
        </div>

        {/* Installment Products */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">My Installment Purchases</h2>
          </div>
          
          <div className="p-6">
            {installmentProducts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {installmentProducts.map((product) => {
                  const daysUntilPayment = getDaysUntilPayment(product.nextPaymentDate);
                  const completionPercentage = (product.paidMonths / product.totalMonths) * 100;
                  
                  return (
                    <div key={product.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 mr-3">
                              {product.name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Total price:</span>
                              <span className="font-semibold">${product.totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Monthly payment:</span>
                              <span className="font-semibold">${product.monthlyPayment}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Progress:</span>
                              <span className="font-semibold">
                                {product.paidMonths}/{product.totalMonths} months
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Payment progress</span>
                          <span>{completionPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              product.status === 'completed' ? 'bg-green-500' : 
                              product.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{width: `${completionPercentage}%`}}
                          ></div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Months remaining:</span>
                          <span className={`font-semibold ${
                            product.remainingMonths === 0 ? 'text-green-600' : 
                            product.status === 'overdue' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {product.remainingMonths === 0 ? '✅ Completed' : `${product.remainingMonths} months`}
                          </span>
                        </div>
                        
                        {product.remainingMonths > 0 && (
                          <div>
                            <span className="text-gray-500 block">Next payment:</span>
                            <span className="font-semibold">
                              {new Date(product.nextPaymentDate).toLocaleDateString('en-US')}
                              {daysUntilPayment > 0 && (
                                <span className="text-green-600 ml-1">({daysUntilPayment}d)</span>
                              )}
                              {daysUntilPayment < 0 && (
                                <span className="text-red-600 ml-1">({Math.abs(daysUntilPayment)}d overdue)</span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {product.remainingMonths > 0 && (
                        <Button
                          onClick={() => handlePayInstallment(product.id)}
                          disabled={(isLoading || isProcessing) && selectedProduct === product.id}
                          className={`w-full ${product.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        >
                          {(isLoading || isProcessing) && selectedProduct === product.id ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              {isProcessing ? 'Processing XRPL...' : 'Payment...'}
                            </div>
                          ) : (
                            `Payer ${product.paidMonths + 1}/${product.totalMonths} - ${product.monthlyPayment}$`
                          )}
                        </Button>
                      )}

                      {product.status === 'completed' && (
                        <div className="text-center py-4 text-green-600 font-medium bg-green-50 rounded-lg">
                          🎉 Product fully paid!
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No installment purchases
              </div>
            )}
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">My Subscriptions</h2>
          </div>
          
          <div className="p-6">
            {subscriptions.map((subscription) => {
              const daysUntilPayment = getDaysUntilPayment(subscription.nextPaymentDate);
              
              return (
                <div key={subscription.id} className="border rounded-lg p-4 mb-4 last:mb-0">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {subscription.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                          {subscription.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{subscription.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Monthly amount:</span>
                          <div className="font-semibold">${subscription.monthlyAmount}</div>
                        </div>
                        
                        <div>
                          <span className="text-gray-500">Next payment:</span>
                          <div className="font-semibold">
                            {new Date(subscription.nextPaymentDate).toLocaleDateString('en-US')}
                            {daysUntilPayment > 0 && (
                              <span className="text-green-600 ml-1">({daysUntilPayment}d)</span>
                            )}
                            {daysUntilPayment < 0 && (
                              <span className="text-red-600 ml-1">({Math.abs(daysUntilPayment)}d overdue)</span>
                            )}
                          </div>
                        </div>
                        
                        {subscription.unpaidMonths > 0 && (
                          <>
                            <div>
                              <span className="text-gray-500">Unpaid months:</span>
                              <div className="font-semibold text-red-600">{subscription.unpaidMonths}</div>
                            </div>
                            
                            <div>
                              <span className="text-gray-500">Total due:</span>
                              <div className="font-semibold text-red-600">${subscription.totalDue}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                      {subscription.unpaidMonths > 0 && (
                        <>
                          <Button
                            onClick={() => handlePaySubscription(subscription.id, true)}
                            disabled={(isLoading || isProcessing) && selectedSubscription === subscription.id}
                            className="bg-red-600 hover:bg-red-700 text-white min-w-[160px]"
                          >
                            {(isLoading || isProcessing) && selectedSubscription === subscription.id ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {isProcessing ? 'Processing XRPL...' : 'Payment...'}
                              </div>
                            ) : (
                              `Pay All ($${subscription.totalDue})`
                            )}
                          </Button>
                          
                          <Button
                            onClick={() => handlePaySubscription(subscription.id, false)}
                            disabled={(isLoading || isProcessing) && selectedSubscription === subscription.id}
                            variant="outline"
                            className="min-w-[160px]"
                          >
                            {(isLoading || isProcessing) && selectedSubscription === subscription.id ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                                XRPL...
                              </div>
                            ) : (
                              `Pay This Month ($${subscription.monthlyAmount})`
                            )}
                          </Button>
                        </>
                      )}
                      
                      {subscription.unpaidMonths === 0 && subscription.status === 'active' && (
                        <div className="text-center text-green-600 font-medium">
                          ✅ Up to date
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
          </div>
          
          <div className="p-6">
            {(paymentHistory.length > 0 || installmentPayments.length > 0) ? (
              <div className="space-y-3">
                {/* Subscription Payments */}
                {paymentHistory.map((payment) => {
                  const subscription = subscriptions.find(s => s.id === payment.subscriptionId);
                  
                  return (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium flex items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">SUBSCRIPTION</span>
                          {subscription?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString('en-US')} •
                          {payment.transactionHash && (
                            <code className="ml-1 text-xs">{payment.transactionHash?.slice(0, 8)}...{payment.transactionHash?.slice(-4)}</code>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">${payment.amount}</div>
                        <div className={`text-xs ${payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {payment.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Installment Payments */}
                {installmentPayments.map((payment) => {
                  const product = installmentProducts.find(p => p.id === payment.productId);
                  
                  return (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium flex items-center">
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">INSTALLMENT</span>
                          {product?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Payment {payment.monthNumber}/{product?.totalMonths} • {new Date(payment.date).toLocaleDateString('en-US')}
                          {payment.transactionHash && (
                            <>
                              <br />
                              <code className="text-xs">{payment.transactionHash.slice(0, 8)}...{payment.transactionHash.slice(-4)}</code>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">${payment.amount}</div>
                        <div className={`text-xs ${payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {payment.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No payments recorded
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}