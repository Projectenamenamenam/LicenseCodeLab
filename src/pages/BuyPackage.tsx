import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, Check, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from '../components/ui/Toast';

interface Package {
  id: string;
  name: string;
  price: number;
  quota: number;
  popular?: boolean;
}

const BuyPackage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, updateBalance, updatePackage } = useAuthStore();
  const navigate = useNavigate();

  // Available packages
  const packages: Package[] = [
    { id: 'starter', name: 'Starter', price: 100000, quota: 2 },
    { id: 'standard', name: 'Standard', price: 200000, quota: 6, popular: true },
    { id: 'premium', name: 'Premium', price: 500000, quota: 12 },
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePurchase = () => {
    if (!selectedPackage) {
      toast.error('Please select a package first');
      return;
    }

    const packageToBuy = packages.find(pkg => pkg.id === selectedPackage);
    if (!packageToBuy) return;

    if (!user) {
      toast.error('You must be logged in to purchase a package');
      navigate('/login');
      return;
    }

    // Check if user has enough balance
    if (user.balance < packageToBuy.price) {
      toast.error('Insufficient balance. Please top up your account first.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update user balance
      const newBalance = user.balance - packageToBuy.price;
      updateBalance(newBalance);
      
      // Update user package
      updatePackage(packageToBuy.name, packageToBuy.quota);
      
      toast.success(`Successfully purchased ${packageToBuy.name} package!`);
      setIsLoading(false);
      
      // Redirect to generate page
      navigate('/generate');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Choose a Package</h1>
            <p className="text-gray-600 mt-2">
              Select a package that fits your needs to start generating barcodes.
            </p>
          </div>

          {/* Balance Display */}
          <div className="bg-white rounded-lg shadow-soft p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Your balance</p>
              <p className="text-xl font-bold text-gray-900">Rp {user?.balance.toLocaleString()}</p>
            </div>
            <button
              onClick={() => navigate('/topup')}
              className="btn btn-secondary"
            >
              Top Up
            </button>
          </div>

          {/* Package Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-xl overflow-hidden transition-all duration-200 ${
                  selectedPackage === pkg.id
                    ? 'border-2 border-blue-500 shadow-md transform -translate-y-1'
                    : 'border border-gray-200 shadow-soft hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium">
                    POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-4">
                    Rp {pkg.price.toLocaleString()}
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{pkg.quota} Barcode Generations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All US States Supported</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Auto-Generation Tools</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`w-full py-2 px-3 rounded-md transition-colors ${
                      selectedPackage === pkg.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Current Package */}
          {user?.package && (
            <div className="bg-blue-50 rounded-lg p-4 mb-8 flex items-start space-x-4">
              <PackageCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-gray-900">
                  You currently have the {user.package.name} package
                </p>
                <p className="text-sm text-gray-600">
                  With {user.package.quota} generations remaining. Purchasing a new package
                  will replace your current one.
                </p>
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={handlePurchase}
              disabled={!selectedPackage || isLoading}
              className="btn btn-primary py-3 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Purchase Selected Package'
              )}
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Need more generations?</h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you need a custom package with more barcode generations, please contact our support team.
                </p>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Contact Support
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPackage;