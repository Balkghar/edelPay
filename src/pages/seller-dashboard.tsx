import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import CollateralDepositManager from "@/components/CollateralDepositManager";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Customer {
  id: string;
  name: string;
  walletAddress: string;
  productPurchased: string;
  totalAmount: number;
  monthlyPayment: number;
  paymentsMade: number;
  totalPayments: number;
  nextPaymentDue: Date;
  status: "active" | "completed" | "overdue";
  joinDate: Date;
}

interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  activePlans: number;
  completedPlans: number;
  overduePayments: number;
}

export default function SellerDashboard() {
  const router = useRouter();
  const { kycCompleted, isContextLoaded, xrpAddress } = useWalletContext();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [salesStats, setSalesStats] = useState<SalesStats>({
    totalSales: 0,
    totalRevenue: 0,
    activePlans: 0,
    completedPlans: 0,
    overduePayments: 0,
  });

  // Redirect if not KYC completed
  useEffect(() => {
    if (isContextLoaded && !kycCompleted) {
      router.push("/kyc-seller");
    }
  }, [kycCompleted, router, isContextLoaded]);

  // Sample data - in real app this would come from API
  useEffect(() => {
    if (isContextLoaded && kycCompleted) {
      const sampleCustomers: Customer[] = [
        {
          id: "cust_001",
          name: "Alice Johnson",
          walletAddress: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
          productPurchased: "Mac Mini Pro",
          totalAmount: 0.3,
          monthlyPayment: 0.025,
          paymentsMade: 4,
          totalPayments: 12,
          nextPaymentDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          status: "active",
          joinDate: new Date("2024-01-15"),
        },
        {
          id: "cust_002",
          name: "Bob Smith",
          walletAddress: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
          productPurchased: "Mac Mini Pro",
          totalAmount: 0.3,
          monthlyPayment: 0.025,
          paymentsMade: 12,
          totalPayments: 12,
          nextPaymentDue: new Date(), // Completed
          status: "completed",
          joinDate: new Date("2024-02-10"),
        },
        {
          id: "cust_003",
          name: "Carol Williams",
          walletAddress: "rMWUykAmNQDaM9poSes8VLDZDDHcbh8oPs",
          productPurchased: "Mac Mini Pro",
          totalAmount: 0.3,
          monthlyPayment: 0.025,
          paymentsMade: 7,
          totalPayments: 12,
          nextPaymentDue: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
          status: "overdue",
          joinDate: new Date("2024-03-05"),
        },
      ];

      setCustomers(sampleCustomers);

      // Calculate stats
      const stats: SalesStats = {
        totalSales: sampleCustomers.length,
        totalRevenue: sampleCustomers.reduce((sum, customer) => 
          sum + (customer.monthlyPayment * customer.paymentsMade), 0),
        activePlans: sampleCustomers.filter(c => c.status === "active").length,
        completedPlans: sampleCustomers.filter(c => c.status === "completed").length,
        overduePayments: sampleCustomers.filter(c => c.status === "overdue").length,
      };

      setSalesStats(stats);
    }
  }, [isContextLoaded, kycCompleted]);

  const formatXRP = (amount: number) => `${amount.toFixed(3)} XRP`;
  const formatDate = (date: Date) => date.toLocaleDateString();

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "completed":
        return "text-blue-600 bg-blue-50";
      case "overdue":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "🟢";
      case "completed":
        return "✅";
      case "overdue":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const sendPaymentReminder = async (customerId: string) => {
    // In a real app, this would send a notification to the customer
    console.log(`Sending payment reminder to customer ${customerId}`);
    alert("Payment reminder sent successfully!");
  };

  const [mappingLoading, setMappingLoading] = useState<Record<string, boolean>>({});

  const registerVendorPayerMapping = async (customerId: string, payerAddress: string) => {
    if (!xrpAddress) {
      alert("Seller XRPL address not available");
      return;
    }

    setMappingLoading((s) => ({ ...s, [customerId]: true }));
    try {
      const resp = await fetch("/api/flare/add-mapping-vendor-instructions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorAddress: xrpAddress, payerAddress }),
      });

      const json = await resp.json().catch(() => ({}));
      if (resp.ok) {
        alert("Mapping registered successfully");
      } else {
        console.error(json);
        alert(`Mapping failed: ${json?.error || resp.statusText}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Mapping failed: ${err?.message || String(err)}`);
    } finally {
      setMappingLoading((s) => ({ ...s, [customerId]: false }));
    }
  };

  if (!isContextLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Seller Dashboard - EdelPay</title>
        <meta name="description" content="Manage your sales and track customer payments" />
      </Head>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your sales and track customer payment schedules.</p>
          </div>

          {/* Sales Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-blue-600">{salesStats.totalSales}</div>
              <div className="text-gray-600">Total Sales</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">
                {formatXRP(salesStats.totalRevenue)}
              </div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-orange-600">{salesStats.activePlans}</div>
              <div className="text-gray-600">Active Plans</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-purple-600">{salesStats.completedPlans}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-red-600">{salesStats.overduePayments}</div>
              <div className="text-gray-600">Overdue</div>
            </div>
          </div>

          {/* Collateral Deposit Management */}
          <div className="mb-8">
            <CollateralDepositManager sellerAddress={xrpAddress} />
          </div>

          {/* Customer Payment Tracking */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Customer Payment Tracking</h2>
              <p className="text-gray-600">Monitor your customers&apos; payment schedules and status</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.walletAddress.substring(0, 8)}...
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.productPurchased}</div>
                        <div className="text-sm text-gray-500">
                          {formatXRP(customer.totalAmount)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.paymentsMade}/{customer.totalPayments} payments
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(customer.paymentsMade / customer.totalPayments) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatXRP(customer.monthlyPayment * customer.paymentsMade)} paid
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.status === "completed" ? (
                          <span className="text-green-600">Completed ✅</span>
                        ) : (
                          <>
                            <div>{formatXRP(customer.monthlyPayment)}</div>
                            <div className="text-xs text-gray-500">
                              {formatDate(customer.nextPaymentDue)}
                            </div>
                          </>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {getStatusIcon(customer.status)} {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {customer.status === "completed" ? (
                          <span className="text-gray-400">No action needed</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={customer.status === "overdue" ? undefined : "outline"}
                              onClick={() => sendPaymentReminder(customer.id)}
                              className={customer.status === "overdue" ? "bg-red-600 hover:bg-red-700 text-white" : undefined}
                            >
                              Send Reminder
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => registerVendorPayerMapping(customer.id, customer.walletAddress)}
                              disabled={!!mappingLoading[customer.id]}
                            >
                              {mappingLoading[customer.id] ? "Registering..." : "Register Mapping"}
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Analytics</h3>
              <p className="text-gray-600 mb-4">
                View detailed analytics about your sales performance and customer behavior.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">💬 Customer Support</h3>
              <p className="text-gray-600 mb-4">
                Access customer support tools and communication features.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⚙️ Settings</h3>
              <p className="text-gray-600 mb-4">
                Configure your seller preferences and payment settings.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">💰</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Payment received from Alice Johnson</p>
                    <p className="text-xs text-gray-500">2 hours ago • {formatXRP(0.025)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🛍️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">New purchase by David Miller</p>
                    <p className="text-xs text-gray-500">1 day ago • Mac Mini Pro</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm">⚠️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Payment overdue from Carol Williams</p>
                    <p className="text-xs text-gray-500">2 days ago • {formatXRP(0.025)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}