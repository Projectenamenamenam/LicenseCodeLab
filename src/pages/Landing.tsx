import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, CreditCard, Zap, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { motion } from 'framer-motion';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle CTA button click
  const handleCTAClick = () => {
    if (isAuthenticated) {
      navigate('/generate');
    } else {
      navigate('/signup');
    }
  };

  // FAQ items
  const faqs = [
    {
      question: 'What is the AAMVA Driver License standard?',
      answer: 'The American Association of Motor Vehicle Administrators (AAMVA) establishes standards for driver licenses and ID cards. Version 8.0 of this standard defines the format for data stored in the PDF417 barcode found on the back of licenses.'
    },
    {
      question: 'Is the barcode generated valid?',
      answer: 'Yes, our barcodes comply with the AAMVA Driver License/ID standard version 8.0. The structure and format of the data follow all requirements and will scan properly with standard barcode readers.'
    },
    {
      question: 'How many states are supported?',
      answer: 'We support all 50 US states plus the District of Columbia, with state-specific formatting for each jurisdiction.'
    },
    {
      question: 'Can I download the generated barcode?',
      answer: 'Yes, you can download the generated barcode as a PDF document that includes both the barcode image and the associated information.'
    },
    {
      question: 'How does the pricing work?',
      answer: 'We offer several packages based on the number of barcodes you need to generate. Choose a package that fits your needs, and your account will be credited with the appropriate number of generations.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <Shield className="w-16 h-16 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Generate Valid AAMVA Driver License Barcodes
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Create PDF417 barcodes compliant with AAMVA version 8.0 standards
                for all US states. Fast, secure, and easy to use.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleCTAClick}
                  className="btn btn-primary text-lg px-8 py-3 rounded-md"
                >
                  Start Generating
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="btn btn-secondary text-lg px-8 py-3 rounded-md flex items-center justify-center"
                >
                  Learn More
                  <ChevronDown className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LicenseCodeLab?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers the most reliable and user-friendly way to generate AAMVA-compliant barcodes for all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-soft"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Valid Structure</h3>
              <p className="text-gray-600">
                All barcodes follow the exact AAMVA standard with proper data element identifiers, ensuring they scan correctly.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-soft"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Price in the Market</h3>
              <p className="text-gray-600">
                Our flexible package options provide excellent value, with competitive pricing for both small and large volume needs.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-soft"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy to Use & Fast</h3>
              <p className="text-gray-600">
                Our intuitive interface and auto-generation tools make it quick and simple to create barcodes in just a few clicks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the package that fits your needs. All packages include full access to our barcode generation tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Package */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">$100</span>
                </div>
                <p className="text-gray-600">For occasional use and testing</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">2 Barcode Generations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">All US States Supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">PDF417 Format</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Auto-Generation Tools</span>
                  </li>
                </ul>
                <button 
                  onClick={() => isAuthenticated ? navigate('/packages') : navigate('/signup')}
                  className="w-full mt-8 btn btn-primary py-3"
                >
                  {isAuthenticated ? 'Get Started' : 'Sign Up & Purchase'}
                </button>
              </div>
            </motion.div>

            {/* Standard Package */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft overflow-hidden border-2 border-blue-500 relative"
              whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                POPULAR
              </div>
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">$200</span>
                </div>
                <p className="text-gray-600">For regular usage</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">6 Barcode Generations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">All US States Supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">PDF417 Format</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Auto-Generation Tools</span>
                  </li>
                </ul>
                <button 
                  onClick={() => isAuthenticated ? navigate('/packages') : navigate('/signup')}
                  className="w-full mt-8 btn btn-primary py-3"
                >
                  {isAuthenticated ? 'Get Started' : 'Sign Up & Purchase'}
                </button>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div 
              className="bg-white rounded-xl shadow-soft overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">$500</span>
                </div>
                <p className="text-gray-600">For frequent use</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">12 Barcode Generations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">All US States Supported</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">PDF417 Format</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Auto-Generation Tools</span>
                  </li>
                </ul>
                <button 
                  onClick={() => isAuthenticated ? navigate('/packages') : navigate('/signup')}
                  className="w-full mt-8 btn btn-primary py-3"
                >
                  {isAuthenticated ? 'Get Started' : 'Sign Up & Purchase'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about LicenseCodeLab and our barcode generation service.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group mb-4 rounded-lg border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="p-4 pt-0 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Generate Your Barcodes?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Sign up now and start creating AAMVA-compliant Driver License barcodes in minutes.
          </p>
          <button 
            onClick={handleCTAClick}
            className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-md"
          >
            {isAuthenticated ? 'Generate Barcode' : 'Get Started Now'}
          </button>
        </div>
      </section>
    </>
  );
};

export default Landing;