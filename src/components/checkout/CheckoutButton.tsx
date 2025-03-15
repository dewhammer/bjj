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
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate a brief loading state for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the custom checkout page with program details
      navigate(`/checkout?program=${programId}&price=${amount / 100}&name=${encodeURIComponent(name)}`);
    } catch (err) {
      console.error('Navigation error:', err);
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
    </div>
  );
};

export default CheckoutButton; 