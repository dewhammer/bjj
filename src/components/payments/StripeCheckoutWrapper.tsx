import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_APPEARANCE } from '../../config/stripe';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface StripeCheckoutWrapperProps {
  clientSecret: string;
}

const StripeCheckoutWrapper: React.FC<StripeCheckoutWrapperProps> = ({ clientSecret }) => {
  const options = { 
    clientSecret,
    appearance: STRIPE_APPEARANCE
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckoutForm />
    </Elements>
  );
};

export default StripeCheckoutWrapper; 