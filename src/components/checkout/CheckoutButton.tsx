import React, { useState } from 'react';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import { useNavigate } from 'react-router-dom';

interface CheckoutButtonProps {
  programId: string;
  amount: number; // in paise (smallest currency unit)
  name: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  programId, 
  amount, 
  name, 
  description, 
  variant = 'secondary' 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call a real API endpoint
      // For this demo, we'll simulate a successful checkout
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful checkout
      // In a real app, this would redirect to Stripe
      navigate('/payment-success?session_id=demo_' + Date.now());
      
      /* 
      // This is the real implementation that would be used with a Stripe backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId,
          amount,
          name,
          description
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError(data.error?.message || 'Something went wrong');
        console.error('Checkout error:', data.error);
      }
      */
      
    } catch (err) {
      setError('Failed to process checkout. Please try again later or contact support.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <GlassmorphicButton
        variant={variant}
        onClick={handleCheckout}
        disabled={isLoading}
        icon={
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5 5a3 3 0 016 0v3h4a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2h4V5a1 1 0 10-2 0v3H7V5a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        }
      >
        {isLoading ? 'Processing...' : 'Checkout'}
      </GlassmorphicButton>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckoutButton; 