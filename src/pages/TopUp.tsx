import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Upload, Check, Clock, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from '../components/ui/Toast';
import axios from 'axios';

const TopUp: React.FC = () => {
  const [amount, setAmount] = useState<number>(100000);
  const [receipImage, setReceiptImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setReceiptImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receipImage) {
      toast.error('Please upload a payment receipt');
      return;
    }
    
    if (amount < 100000) {
      toast.error('Minimum top-up amount is 100,000');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we'd upload the image to a server and create a top-up request
      // For now, we'll simulate the API call and Telegram notification
      
      // Simulate sending to Telegram
      console.log(`Sending top-up request to Telegram:
        Username: ${user?.username}
        Amount: ${amount}
        Receipt: [Image File]
      `);
      
      // Simulated API call to send to Telegram
      // In a real application, this would be an actual API endpoint
      /*
      const formData = new FormData();
      formData.append('username', user?.username || '');
      formData.append('amount', amount.toString());
      formData.append('receipt', receipImage);
      
      await axios.post('/api/topup-request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      */
      
      // Show success message
      toast.success('Top-up request submitted successfully');
      
      // Show verifying state
      setIsSubmitting(false);
      setIsVerifying(true);
      
      // In a real app, we'd wait for a webhook from the Telegram bot
      // For demo purposes, we'll simulate approval after 5 seconds
      setTimeout(() => {
        setIsVerifying(false);
        toast.success('Payment approved! Your balance has been updated.');
        
        // Update user balance
        // In a real app, this would happen via a server update
        const updatedBalance = (user?.balance || 0) + amount;
        
        // Navigate back to dashboard
        navigate('/dashboard');
      }, 5000);
      
    } catch (error) {
      console.error('Top-up request failed:', error);
      toast.error('Failed to submit top-up request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Predefined amount options
  const amountOptions = [
    { value: 100000, label: '100,000' },
    { value: 200000, label: '200,000' },
    { value: 500000, label: '500,000' },
    { value: 1000000, label: '1,000,000' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Top Up Balance</h1>
            <p className="text-gray-600 mt-2">
              Add funds to your account to purchase barcode generation packages.
            </p>
          </div>

          {isVerifying ? (
            <div className="bg-white rounded-xl shadow-soft p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Clock className="h-16 w-16 text-blue-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Payment Verification in Progress</h2>
              <p className="text-gray-600 mb-6">
                Your payment is being verified. This usually takes 1-5 minutes.
                Please wait while we process your top-up request.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
              </div>
              <p className="text-sm text-gray-500">Please do not close this window</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-soft p-8">
              <form onSubmit={handleSubmit}>
                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top-up Amount
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {amountOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`py-3 px-4 border rounded-md text-center ${
                          amount === option.value
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setAmount(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">Rp</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      min="100000"
                      step="10000"
                      className="input pl-10"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Minimum top-up amount is Rp 100,000
                  </p>
                </div>

                {/* Payment Instructions */}
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-2">Transfer Instructions</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Bank:</span> BANK JAGO</p>
                    <p><span className="font-medium">Account:</span> 104609057861</p>
                    <p><span className="font-medium">Name:</span> SAEFUL BAHRI</p>
                    <p><span className="font-medium">Amount:</span> Rp {amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Receipt Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Receipt
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Payment receipt"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleUploadClick}
                        className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md"
                      >
                        <Upload className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleUploadClick}
                      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload your payment receipt
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG or GIF, max 5MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I confirm that I have made the payment and the receipt is valid
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !receipImage}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Complete Payment
                    </>
                  )}
                </button>
              </form>

              {/* Important Notes */}
              <div className="mt-8">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Important Note</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      After you submit your payment details, our team will manually verify the payment.
                      This process usually takes 1-5 minutes during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUp;