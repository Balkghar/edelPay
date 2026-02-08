import { Button } from "@/components/ui/button";
import WalletHeader from "@/components/WalletHeader";
import { useWalletContext } from "@/contexts/WalletContext";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Sale {
  id: string;
  productName: string;
  buyerAddress: string;
  totalPrice: number;
  monthlyPayment: number;
  totalMonths: number;
  paidMonths: number;
  currency: string;
  status: 'active' | 'completed' | 'overdue';
  createdAt: string;
  nextPaymentDate: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  monthlyInstallments: number;
  isActive: boolean;
}

export default function Seller() {
  const router = useRouter();
  const { xrpAddress, isLoading: walletLoading, kycCompleted, isContextLoaded } = useWalletContext();
  const [hasRedirected, setHasRedirected] = useState(false);
  
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    currency: 'XRP',
    description: '',
    monthlyInstallments: 12,
    isActive: true
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Redirect if wallet not connected or not onboarded
  useEffect(() => {
    if (!walletLoading && isContextLoaded && !hasRedirected) {
      if (!xrpAddress || !kycCompleted) {
        setHasRedirected(true);
        router.replace('/kyc/seller');
      }
    }
  }, [xrpAddress, kycCompleted, walletLoading, router, isContextLoaded, hasRedirected]);

  useEffect(() => {
    if (xrpAddress) {
      loadSellerData();
    }
  }, [xrpAddress]);

  const loadSellerData = async () => {
    setIsLoading(true);
    
    // Mock data for seller dashboard
    const mockSales: Sale[] = [
      {
        id: 'sale-1',
        productName: 'Mac Mini Pro M2',
        buyerAddress: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
        totalPrice: 0.3,
        monthlyPayment: 0.025,
        totalMonths: 12,
        paidMonths: 7,
        currency: 'XRP',
        status: 'active',
        createdAt: '2024-08-15',
        nextPaymentDate: '2024-03-15'
      },
      {
        id: 'sale-2',
        productName: 'iPhone 15 Pro',
        buyerAddress: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
        totalPrice: 1.2,
        monthlyPayment: 0.1,
        totalMonths: 12,
        paidMonths: 12,
        currency: 'XRP',
        status: 'completed',
        createdAt: '2023-02-01',
        nextPaymentDate: '2024-02-01'
      },
      {
        id: 'sale-3',
        productName: 'Samsung Galaxy Watch',
        buyerAddress: 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w',
        totalPrice: 0.33,
        monthlyPayment: 0.055,
        totalMonths: 6,
        paidMonths: 2,
        currency: 'XRP',
        status: 'overdue',
        createdAt: '2023-12-10',
        nextPaymentDate: '2024-02-10'
      }
    ];

    const mockProducts: Product[] = [
      {
        id: 'product-1',
        name: 'Mac Mini Pro M2',
        price: 0.3,
        currency: 'XRP',
        description: 'Apple Mac Mini with M2 chip, perfect for professional work',
        monthlyInstallments: 12,
        isActive: true
      },
      {
        id: 'product-2',
        name: 'iPhone 15 Pro',
        price: 1.2,
        currency: 'XRP',
        description: 'Latest iPhone with titanium design and advanced cameras',
        monthlyInstallments: 12,
        isActive: true
      },
      {
        id: 'product-3',
        name: 'iPad Air',
        price: 0.6,
        currency: 'XRP',
        description: 'Versatile tablet for work and creativity',
        monthlyInstallments: 10,
        isActive: false
      }
    ];

    setSales(mockSales);
    setProducts(mockProducts);
    setIsLoading(false);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: `product-${Date.now()}`,
      name: newProduct.name!,
      price: newProduct.price!,
      currency: newProduct.currency || 'XRP',
      description: newProduct.description!,
      monthlyInstallments: newProduct.monthlyInstallments || 12,
      isActive: true
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: '',
      price: 0,
      currency: 'XRP',
      description: '',
      monthlyInstallments: 12,
      isActive: true
    });
    setShowAddProduct(false);
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive }
        : product
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (walletLoading || !isContextLoaded || !xrpAddress) {
    return (
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <WalletHeader />
        <main className="flex flex-col items-center justify-center p-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading seller dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Seller Dashboard - EdelPay</title>
        <meta name="description" content="Manage your products and sales on EdelPay" />
      </Head>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 ${inter.className}`}>
        <WalletHeader />
        
        <main className="max-w-7xl mx-auto p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🏪 Seller Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your products and track sales with XRPL payments
            </p>
            <div className="text-sm text-gray-500 mt-2">
              Business wallet: <code className="bg-gray-100 px-2 py-1 rounded">{xrpAddress}</code>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Products</h3>
              <div className="text-3xl font-bold text-blue-600">
                {products.filter(p => p.isActive).length}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Sales</h3>
              <div className="text-3xl font-bold text-green-600">
                {sales.filter(s => s.status === 'active').length}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
              <div className="text-3xl font-bold text-purple-600">
                {sales.reduce((sum, s) => sum + (s.monthlyPayment * s.paidMonths), 0).toFixed(3)} XRP
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Payments</h3>
              <div className="text-3xl font-bold text-orange-600">
                {sales.filter(s => s.status === 'overdue').length}
              </div>
            </div>
          </div>

          {/* Products Management */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
              <Button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {showAddProduct ? 'Cancel' : '+ Add Product'}
              </Button>
            </div>
            
            <div className="p-6">
              {/* Add Product Form */}
              {showAddProduct && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mac Mini Pro M2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (XRP) *
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Installments
                      </label>
                      <select
                        value={newProduct.monthlyInstallments}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, monthlyInstallments: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={6}>6 months</option>
                        <option value={12}>12 months</option>
                        <option value={24}>24 months</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        value={newProduct.currency}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="XRP">XRP</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe your product..."
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <Button
                      onClick={handleAddProduct}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Add Product
                    </Button>
                    <Button
                      onClick={() => setShowAddProduct(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Products List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.map((product) => {
                  const monthlyPayment = (product.price / product.monthlyInstallments).toFixed(3);
                  
                  return (
                    <div key={product.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Total Price:</span>
                              <span className="font-semibold">{product.price} {product.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Monthly Payment:</span>
                              <span className="font-semibold">{monthlyPayment} {product.currency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Installments:</span>
                              <span className="font-semibold">{product.monthlyInstallments} months</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.isActive ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => toggleProductStatus(product.id)}
                        variant={product.isActive ? "outline" : "default"}
                        className={`w-full ${product.isActive ? 'text-red-600 border-red-300 hover:bg-red-50' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                      >
                        {product.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              {products.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No products added yet. Click "Add Product" to get started.
                </div>
              )}
            </div>
          </div>

          {/* Sales Management */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Sales & Payments</h2>
            </div>
            
            <div className="p-6">
              {sales.length > 0 ? (
                <div className="space-y-4">
                  {sales.map((sale) => {
                    const progress = (sale.paidMonths / sale.totalMonths) * 100;
                    const remainingAmount = sale.monthlyPayment * (sale.totalMonths - sale.paidMonths);
                    
                    return (
                      <div key={sale.id} className="border rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex-1 mb-4 lg:mb-0">
                            <div className="flex items-center mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 mr-3">
                                {sale.productName}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sale.status)}`}>
                                {sale.status.toUpperCase()}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3">
                              Buyer: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {sale.buyerAddress.slice(0, 8)}...{sale.buyerAddress.slice(-6)}
                              </code>
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Progress:</span>
                                <div className="font-semibold">{sale.paidMonths}/{sale.totalMonths} payments</div>
                              </div>
                              
                              <div>
                                <span className="text-gray-500">Total Price:</span>
                                <div className="font-semibold">{sale.totalPrice} {sale.currency}</div>
                              </div>
                              
                              <div>
                                <span className="text-gray-500">Received:</span>
                                <div className="font-semibold text-green-600">
                                  {(sale.monthlyPayment * sale.paidMonths).toFixed(3)} {sale.currency}
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-gray-500">Remaining:</span>
                                <div className="font-semibold">{remainingAmount.toFixed(3)} {sale.currency}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="lg:ml-6">
                            {sale.status === 'completed' ? (
                              <div className="text-center text-green-600 font-medium">
                                ✅ Completed
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="text-sm text-gray-600 mb-2">
                                  Next: {new Date(sale.nextPaymentDate).toLocaleDateString()}
                                </div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      sale.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
                                    }`}
                                    style={{width: `${progress}%`}}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {progress.toFixed(0)}% complete
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No sales yet. Customers will appear here when they purchase your products.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
