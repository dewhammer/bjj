import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const PaymentSuccess: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('session_id');
    if (id) {
      setSessionId(id);
      // You could fetch session details from Stripe here if needed
      // through a server endpoint
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="w-full max-w-2xl p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-500/20 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-white/80">
            Thank you for registering with Himalayan BJJ. We're excited to have you join us!
          </p>
          
          {sessionId && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-white/60">Transaction ID:</p>
              <p className="font-mono text-white/80 text-sm break-all">{sessionId}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">What's Next?</h3>
            <ul className="text-white/70 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You'll receive a confirmation email with details of your purchase.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Our team will contact you within 24 hours to welcome you and provide training details.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Please prepare with comfortable workout clothes and a water bottle for your first session.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Complete your registration by filling out our sign-up form to provide necessary information.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlassmorphicButton 
            href="/" 
            variant="primary"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            }
          >
            Return Home
          </GlassmorphicButton>
          
          <GlassmorphicButton 
            href="/signup" 
            variant="accent"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            }
          >
            Complete Sign-Up
          </GlassmorphicButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 