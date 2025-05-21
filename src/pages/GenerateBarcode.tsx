import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Download, Info, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { dlNumberFormats, iinCodes, eyeColors, hairColors, generateRandomAlphaNumeric, formatDate } from '../utils/driverLicenseFormats';
import { generateAAMVAData, generatePDF } from '../utils/barcodeGenerator';
import { toast } from '../components/ui/Toast';

interface FormData {
  dlNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  city: string;
  zipCode: string;
  birthDate: string;
  issueDate: string;
  expiryDate: string;
  dlClass: string;
  sex: string;
  donor: string;
  dd: string;
  icn: string;
  restrictions: string;
  endorsement: string;
  height: string;
  weight: string;
  eyeColorDL: string;
  eyeColorANSI: string;
  hairColorDL: string;
  hairColorANSI: string;
}

const GenerateBarcode: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    dlNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    address: '',
    city: '',
    zipCode: '',
    birthDate: '',
    issueDate: '',
    expiryDate: '',
    dlClass: 'C',
    sex: 'Male',
    donor: 'NO',
    dd: '',
    icn: '',
    restrictions: '',
    endorsement: '',
    height: '70',
    weight: '180',
    eyeColorDL: 'BRO',
    eyeColorANSI: 'BRO',
    hairColorDL: 'BRO',
    hairColorANSI: 'BRO'
  });
  const [aamvaData, setAamvaData] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { user, decrementQuota } = useAuthStore();
  const navigate = useNavigate();

  // Check if user has an active package
  useEffect(() => {
    if (user && (!user.package || user.package.quota <= 0)) {
      toast.info('You need to purchase a package to generate barcodes');
    }
  }, [user]);

  // Handle state selection
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setAamvaData(null);
    setPdfUrl(null);
  };

  // Handle form data changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Auto-generate DL Number
  const generateDLNumber = () => {
    if (!selectedState || !dlNumberFormats[selectedState as keyof typeof dlNumberFormats]) {
      toast.error('Please select a state first');
      return;
    }

    const generatedNumber = dlNumberFormats[selectedState as keyof typeof dlNumberFormats].generator();
    setFormData({
      ...formData,
      dlNumber: generatedNumber
    });
  };

  // Auto-generate document discriminator
  const generateDD = () => {
    const generatedDD = generateRandomAlphaNumeric(12);
    setFormData({
      ...formData,
      dd: generatedDD
    });
  };

  // Auto-generate inventory control number
  const generateICN = () => {
    const generatedICN = generateRandomAlphaNumeric(15);
    setFormData({
      ...formData,
      icn: generatedICN
    });
  };

  // Format date inputs (MM/DD/YYYY to MMDDYYYY)
  const formatDateInput = (dateString: string): string => {
    if (!dateString) return '';
    
    // Remove any non-digit characters
    const digits = dateString.replace(/\D/g, '');
    
    // Return if we don't have 8 digits
    if (digits.length !== 8) return dateString;
    
    // Format as MMDDYYYY
    return digits;
  };

  // Generate AAMVA data
  const handleGenerateBarcode = () => {
    // Check if user has an active package with quota
    if (!user?.package || user.package.quota <= 0) {
      toast.error('You need to purchase a package to generate barcodes');
      navigate('/packages');
      return;
    }
    
    // Validate form data
    if (!validateForm()) {
      return;
    }
    
    setIsGenerating(true);
    
    // Format dates
    const formattedData = {
      ...formData,
      birthDate: formatDateInput(formData.birthDate),
      issueDate: formatDateInput(formData.issueDate),
      expiryDate: formatDateInput(formData.expiryDate)
    };
    
    try {
      // Get IIN code for the selected state
      const iinCode = iinCodes[selectedState as keyof typeof iinCodes];
      
      // Generate AAMVA data
      const data = generateAAMVAData(selectedState, formattedData, iinCode);
      setAamvaData(data);
      
      // Generate PDF download URL
      const pdfDownloadUrl = generatePDF(data, formattedData, selectedState);
      setPdfUrl(pdfDownloadUrl);
      
      // Decrement user's quota
      decrementQuota();
      
      toast.success('AAMVA data generated successfully!');
    } catch (error) {
      console.error('Error generating data:', error);
      toast.error('Failed to generate data. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    if (!selectedState) {
      toast.error('Please select a state');
      return false;
    }
    
    const requiredFields = [
      'dlNumber', 'firstName', 'lastName', 'address', 
      'city', 'zipCode', 'birthDate', 'issueDate', 'expiryDate'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast.error(`Please enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Validate date formats
    const dateFields = ['birthDate', 'issueDate', 'expiryDate'];
    const dateRegex = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(19|20)\d{2}$/;
    
    for (const field of dateFields) {
      const value = formData[field as keyof FormData];
      if (!dateRegex.test(value)) {
        toast.error(`Please enter a valid date for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} (MMDDYYYY)`);
        return false;
      }
    }
    
    return true;
  };

  // All US states for dropdown
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming', 'District of Columbia'
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generate Driver License Data</h1>
          <p className="text-gray-600 mt-2">
            Fill in the form below to generate AAMVA-compliant Driver License data.
          </p>
        </div>

        {/* Package Info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm text-gray-500">Your active package</p>
              <p className="text-lg font-medium">
                {user?.package ? (
                  <>
                    {user.package.name} - <span className="text-blue-600 font-semibold">{user.package.quota} generations remaining</span>
                  </>
                ) : (
                  <span className="text-red-500">No active package</span>
                )}
              </p>
            </div>
            {(!user?.package || user.package.quota <= 0) && (
              <button
                onClick={() => navigate('/packages')}
                className="btn btn-primary"
              >
                Purchase Package
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft p-6">
              {/* State Selection */}
              <div className="mb-6">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Select State
                </label>
                <select
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="input"
                  required
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {selectedState && (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedState}</h2>
                  
                  {/* Personal Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label htmlFor="dlNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          DL Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="dlNumber"
                            name="dlNumber"
                            value={formData.dlNumber}
                            onChange={handleInputChange}
                            className="input pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={generateDLNumber}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            title="Auto-generate DL Number"
                          >
                            <Calculator className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Format: {dlNumberFormats[selectedState as keyof typeof dlNumberFormats]?.format}
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          id="middleName"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Birth Date (MMDDYYYY)
                        </label>
                        <input
                          type="text"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="01011990"
                          pattern="\d{8}"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Issue Date (MMDDYYYY)
                        </label>
                        <input
                          type="text"
                          id="issueDate"
                          name="issueDate"
                          value={formData.issueDate}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="01012022"
                          pattern="\d{8}"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date (MMDDYYYY)
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="01012026"
                          pattern="\d{8}"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* License Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">License Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dlClass" className="block text-sm font-medium text-gray-700 mb-1">
                          DL Class
                        </label>
                        <select
                          id="dlClass"
                          name="dlClass"
                          value={formData.dlClass}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                          Sex
                        </label>
                        <select
                          id="sex"
                          name="sex"
                          value={formData.sex}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="donor" className="block text-sm font-medium text-gray-700 mb-1">
                          Donor
                        </label>
                        <select
                          id="donor"
                          name="donor"
                          value={formData.donor}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="dd" className="block text-sm font-medium text-gray-700 mb-1">
                          Document Discriminator (DD)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="dd"
                            name="dd"
                            value={formData.dd}
                            onChange={handleInputChange}
                            className="input pr-10"
                          />
                          <button
                            type="button"
                            onClick={generateDD}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            title="Auto-generate Document Discriminator"
                          >
                            <Calculator className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="icn" className="block text-sm font-medium text-gray-700 mb-1">
                          Inventory Control Number (ICN)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="icn"
                            name="icn"
                            value={formData.icn}
                            onChange={handleInputChange}
                            className="input pr-10"
                          />
                          <button
                            type="button"
                            onClick={generateICN}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            title="Auto-generate Inventory Control Number"
                          >
                            <Calculator className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Physical Attributes */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Physical Attributes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 mb-1">
                          Restrictions
                        </label>
                        <input
                          type="text"
                          id="restrictions"
                          name="restrictions"
                          value={formData.restrictions}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="endorsement" className="block text-sm font-medium text-gray-700 mb-1">
                          Endorsement
                        </label>
                        <input
                          type="text"
                          id="endorsement"
                          name="endorsement"
                          value={formData.endorsement}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                          Height (inches)
                        </label>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="eyeColorDL" className="block text-sm font-medium text-gray-700 mb-1">
                          Eye Color (on DL)
                        </label>
                        <select
                          id="eyeColorDL"
                          name="eyeColorDL"
                          value={formData.eyeColorDL}
                          onChange={handleInputChange}
                          className="input"
                        >
                          {eyeColors.map((color) => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="eyeColorANSI" className="block text-sm font-medium text-gray-700 mb-1">
                          Eye Color (ANSI)
                        </label>
                        <select
                          id="eyeColorANSI"
                          name="eyeColorANSI"
                          value={formData.eyeColorANSI}
                          onChange={handleInputChange}
                          className="input"
                        >
                          {eyeColors.map((color) => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="hairColorDL" className="block text-sm font-medium text-gray-700 mb-1">
                          Hair Color (on DL)
                        </label>
                        <select
                          id="hairColorDL"
                          name="hairColorDL"
                          value={formData.hairColorDL}
                          onChange={handleInputChange}
                          className="input"
                        >
                          {hairColors.map((color) => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="hairColorANSI" className="block text-sm font-medium text-gray-700 mb-1">
                          Hair Color (ANSI)
                        </label>
                        <select
                          id="hairColorANSI"
                          name="hairColorANSI"
                          value={formData.hairColorANSI}
                          onChange={handleInputChange}
                          className="input"
                        
                        >
                          {hairColors.map((color) => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleGenerateBarcode}
                      disabled={isGenerating || !user?.package || user.package.quota <= 0}
                      className="btn btn-primary w-full py-3"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center">
                          <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                          Generating...
                        </div>
                      ) : (
                        'Generate AAMVA Data'
                      )}
                    </button>
                    {(!user?.package || user.package.quota <= 0) && (
                      <p className="mt-2 text-sm text-red-500 text-center">
                        You need to purchase a package to generate data
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 h-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Data</h3>
              
              {aamvaData ? (
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-gray-50">
                    <pre className="whitespace-pre-wrap break-all text-sm font-mono">
                      {aamvaData}
                    </pre>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium">{selectedState}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">DL Number:</span>
                      <span className="font-medium">{formData.dlNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {formData.lastName}, {formData.firstName} {formData.middleName}
                      </span>
                    </div>
                  </div>
                  
                  {pdfUrl && (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full flex items-center justify-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF
                    </a>
                  )}
                </div>
              ) : (
                <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-center h-64">
                  <Info className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Fill in the fields and click the "Generate" button and your AAMVA data will appear here.
                  </p>
                </div>
              )}
              
              <div className="mt-6 bg-blue-50 rounded-md p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">AAMVA Compliance</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      All generated data is compliant with AAMVA Driver License/ID standard version 8.0.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBarcode;