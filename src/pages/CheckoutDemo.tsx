import React from 'react';
import BasicCheckoutForm from '../components/checkout/BasicCheckoutForm';
import CheckoutButton from '../components/checkout/CheckoutButton';

const CheckoutDemo: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Checkout Demo</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            This page demonstrates both Stripe checkout integration methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Method 1: Form submission with redirect */}
          <div>
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-white">Method 1: Form Redirect</h2>
              <p className="text-white/70">
                This method uses a form submission and server redirect to Stripe.
              </p>
            </div>
            <BasicCheckoutForm />
          </div>
          
          {/* Method 2: AJAX with JSON response */}
          <div>
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-white">Method 2: AJAX Request</h2>
              <p className="text-white/70">
                This method uses a client-side AJAX request and redirects via JavaScript.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6">Pre-configured Products</h3>
              
              <div className="space-y-8">
                {/* Product 1 */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-white">Beginners Course</h4>
                    <div className="text-white font-bold">
                      <span className="text-sm">₹</span>
                      <span className="text-xl">7,999</span>
                    </div>
                  </div>
                  <p className="text-white/70 mb-4">Learn the fundamentals of Brazilian Jiu-Jitsu in a structured environment.</p>
                  <CheckoutButton 
                    programId="beginners-course"
                    amount={799900} // 7,999 INR in paise
                    name="Beginners BJJ Course"
                    description="8 weeks of structured training including a gi"
                    variant="accent"
                  />
                </div>
                
                {/* Product 2 */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-white">Private Lessons</h4>
                    <div className="text-white font-bold">
                      <span className="text-sm">₹</span>
                      <span className="text-xl">12,999</span>
                    </div>
                  </div>
                  <p className="text-white/70 mb-4">One-on-one instruction tailored to your specific needs and goals.</p>
                  <CheckoutButton 
                    programId="private-lessons"
                    amount={1299900} // 12,999 INR in paise
                    name="Private BJJ Lessons"
                    description="10 private sessions with our expert instructors"
                    variant="accent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDemo; 