import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import GlassmorphicCard from '../ui/GlassmorphicCard';

const StripeCheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe hasn't loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An unexpected error occurred.');
        console.error('Payment error:', error);
      }
    } catch (e) {
      console.error('Payment submission error:', e);
      setErrorMessage('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <GlassmorphicCard variant="primary" className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Enter Payment Details</h3>
          <p className="text-sm text-foreground/80 mb-4">
            All transactions are secure and encrypted. 
            <br />For testing, use card number: <span className="font-mono">4242 4242 4242 4242</span>
          </p>
        </div>
        
        <PaymentElement className="mb-6" />
        
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-md">
            {errorMessage}
          </div>
        )}
        
        <GlassmorphicButton
          type="submit"
          variant="secondary"
          className="w-full py-3"
          disabled={!stripe || isProcessing}
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
            'Complete Payment'
          )}
        </GlassmorphicButton>
      </form>
    </GlassmorphicCard>
  );
};

export default StripeCheckoutForm; 