import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import GlassmorphicCard from '../components/ui/GlassmorphicCard';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const paymentIntentId = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');
    
    if (redirectStatus === 'succeeded') {
      setPaymentStatus('success');
      // In a real app, you would fetch order details from your backend
      setOrderDetails({
        id: Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
      });
    } else if (redirectStatus === 'processing') {
      setPaymentStatus('processing');
    } else {
      setPaymentStatus('error');
    }
  }, [searchParams]);
  
  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <GlassmorphicCard className="p-8 max-w-3xl mx-auto">
        {paymentStatus === 'success' && (
          <div className="text-center">
            <div className="bg-green-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-green-400 mb-4">Payment Successful!</h1>
            <p className="text-xl mb-6">Thank you for your purchase.</p>
            
            {orderDetails && (
              <div className="bg-background/30 p-4 rounded-lg border border-primary/20 backdrop-blur-sm mb-8 mx-auto max-w-md">
                <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
                <div className="flex justify-between mb-2">
                  <span>Order ID:</span>
                  <span>#{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{orderDetails.date}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassmorphicButton variant="secondary" to="/">
                Return to Home
              </GlassmorphicButton>
              <GlassmorphicButton variant="primary" to="/member-dashboard">
                Go to My Dashboard
              </GlassmorphicButton>
            </div>
          </div>
        )}
        
        {paymentStatus === 'processing' && (
          <div className="text-center">
            <div className="animate-spin w-20 h-20 rounded-full border-4 border-primary border-t-transparent mx-auto mb-6"></div>
            <h1 className="text-3xl font-bold mb-4">Processing Payment...</h1>
            <p className="text-xl mb-6">Your payment is being processed. This may take a moment.</p>
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-center">
            <div className="bg-red-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-red-400 mb-4">Payment Failed</h1>
            <p className="text-xl mb-6">There was an issue processing your payment. Please try again.</p>
            
            <div className="flex justify-center">
              <GlassmorphicButton variant="primary" to="/training">
                Return to Training Programs
              </GlassmorphicButton>
            </div>
          </div>
        )}
      </GlassmorphicCard>
    </div>
  );
};

export default PaymentSuccessPage; 