import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-40 pb-12 flex flex-col items-center">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <AlertTriangle className="h-12 w-12 text-orange-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;