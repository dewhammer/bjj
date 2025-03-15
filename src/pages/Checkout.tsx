import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get program info from URL parameters
  const programId = queryParams.get('program') || '';
  const programName = queryParams.get('name') || getProgramName(programId);
  const price = parseInt(queryParams.get('price') || '0', 10);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback function if name is not provided in URL
  function getProgramName(programId: string): string {
    switch(programId) {
      case 'beginner': 
      case 'beginners-course': return 'Beginner BJJ Program';
      case 'intermediate': return 'Intermediate BJJ Program';
      case 'advanced': 
      case 'advanced-course': return 'Advanced Instructor Program';
      case 'private-lessons': return 'Private BJJ Lessons';
      default: return 'BJJ Program';
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.substring(0, 19) }));
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 2) {
        setFormData(prev => ({ ...prev, [name]: formatted }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`
        }));
      }
    } else if (name === 'cvv') {
      // Allow only digits for CVV
      const digits = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digits.substring(0, 3) }));
    } else {
      // Handle other fields
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Navigate to success page
      navigate(`/payment-success?session_id=${programId}_${Date.now()}`);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-4xl mx-auto">
        {/* Stripe-like header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            Himalayan BJJ Checkout
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-6 bg-blue-500 rounded-md"></div>
            <div className="w-10 h-6 bg-yellow-400 rounded-md"></div>
            <div className="w-10 h-6 bg-red-500 rounded-md"></div>
            <div className="w-10 h-6 bg-slate-700 rounded-md"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Payment form */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Card Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-white/80 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-white/80 mb-1">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    placeholder="John Doe"
                    required
                    value={formData.cardHolder}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-white/80 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-white/80 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      required
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-white/30 rounded"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-white/70">
                      I agree to the <a href="#" className="text-accent-500 hover:text-accent-400">Terms of Service</a> and <a href="#" className="text-accent-500 hover:text-accent-400">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <GlassmorphicButton
                    type="submit"
                    variant="accent"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      `Pay ₹${price.toLocaleString('en-IN')}`
                    )}
                  </GlassmorphicButton>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{programName}</h3>
                  <p className="text-white/70 text-sm">Full program access</p>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">Subtotal</span>
                    <span className="text-white">₹{price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70">Tax</span>
                    <span className="text-white">₹0</span>
                  </div>
                  <div className="flex justify-between font-bold mt-4 pt-4 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-white">₹{price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="pt-4 text-white/60 text-sm">
                  <p>Your payment is secure and encrypted</p>
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure SSL Encryption
                  </div>
                </div>
                
                <div className="pt-4 text-center">
                  <GlassmorphicButton
                    variant="primary"
                    onClick={() => navigate(-1)}
                    size="sm"
                  >
                    Return to Program
                  </GlassmorphicButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 