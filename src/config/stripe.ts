// Replace this with your actual Stripe publishable key
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51R2hBtQxT4F8TUvf929YwAerHbdeXQn7wtlSs9d6p9d85TQ7axxvE1HVqkGw9UWs7UrdaLeIPVYOJCdoJ23WXXod00U1CAnRtO';

// API endpoint for creating payment intents - use relative URL in production
export const PAYMENT_API_URL = '/create-payment-intent';

// Stripe appearance settings
export const STRIPE_APPEARANCE = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#6d28d9', // Match your primary color (purple)
    colorBackground: '#0f1729', // Dark background
    colorText: '#ffffff', // White text
    colorDanger: '#ef4444', // Red for errors
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px'
  },
  rules: {
    '.Input': {
      border: '1px solid #6d28d9',
      boxShadow: '0 0 0 1px rgba(109, 40, 217, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '.Input:focus': {
      border: '1px solid #8b5cf6',
      boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)'
    },
    '.Label': {
      color: '#d1d5db'
    },
    '.Tab': {
      border: '1px solid #4c1d95',
      boxShadow: '0 0 0 1px rgba(76, 29, 149, 0.1)'
    },
    '.Tab--selected': {
      backgroundColor: '#6d28d9',
      color: '#ffffff'
    }
  }
}; 