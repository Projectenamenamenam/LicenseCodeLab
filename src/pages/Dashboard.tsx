import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Zap, ChevronRight, BarChart3, Activity, Clock } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  // Sample activity history (in a real app, this would come from an API)
  const activityHistory = [
    { type: 'generation', state: 'California', date: 'May 10, 2025' },
    { type: 'purchase', package: 'Standard', date: 'May 5, 2025' },
    { type: 'topup', amount: 200, date: 'May 1, 2025' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}! Manage your account and generate barcodes.
          </p>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Balance</h2>
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">${user?.balance.toLocaleString()}</p>
            <Link
              to="/topup"
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Top up your balance
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Active Package */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Package</h2>
              <Zap className="h-6 w-6 text-orange-500" />
            </div>
            {user?.package ? (
              <>
                <p className="text-2xl font-bold text-gray-900">{user.package.name}</p>
                <p className="text-gray-600">
                  Remaining generations: <span className="font-semibold">{user.package.quota}</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700">No active package</p>
                <p className="text-sm text-gray-500 mb-3">Purchase a package to start generating barcodes</p>
              </>
            )}
            <Link
              to="/packages"
              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {user?.package ? 'Upgrade package' : 'Buy a package'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/generate"
                className="block w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors flex items-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Generate New Barcode
              </Link>
              <Link
                to="/topup"
                className="block w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors flex items-center"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Top Up Balance
              </Link>
              <Link
                to="/packages"
                className="block w-full py-2 px-4 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors flex items-center"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Manage Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-500" />
          </div>

          {activityHistory.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {activityHistory.map((activity, index) => (
                <div key={index} className="py-4 flex items-start">
                  <div className="mr-4 mt-1">
                    {activity.type === 'generation' ? (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                    ) : activity.type === 'purchase' ? (
                      <div className="bg-green-100 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="bg-orange-100 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {activity.type === 'generation'
                        ? `Generated a barcode for ${activity.state}`
                        : activity.type === 'purchase'
                        ? `Purchased ${activity.package} package`
                        : `Added $${activity.amount} to your balance`}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent activity to display.</p>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or need assistance with using our service, our support team is here to help.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Support
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;