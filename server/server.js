require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

// Middleware
app.use(express.json());

// Configure CORS for both development and production
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  'http://localhost:5176',
  'https://bjj-himalayan-bjj.vercel.app',
  'https://himalayan-bjj.vercel.app',
  'https://himalayan-bjj.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS issue with origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  if (req.method === 'POST' && req.body) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Set up Stripe with the secret key
let stripe;
try {
  const stripeApiKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeApiKey) {
    console.error('ERROR: STRIPE_SECRET_KEY is not defined in environment variables');
  } else {
    console.log('Stripe key available (starts with):', stripeApiKey.substring(0, 8) + '...');
    stripe = Stripe(stripeApiKey);
  }
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

// Test route to verify server is working
app.get('/ping', (req, res) => {
  const envStatus = {
    nodeEnv: process.env.NODE_ENV || 'not set',
    stripeKeyAvailable: !!process.env.STRIPE_SECRET_KEY,
    stripeInitialized: !!stripe
  };
  
  console.log('Ping request received. Environment status:', envStatus);
  res.json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: envStatus
  });
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('Received payment intent request:', req.body);
    const { amount, programId } = req.body;

    if (!amount) {
      console.log('Missing amount parameter');
      return res.status(400).json({ error: 'Missing amount parameter' });
    }
    
    if (!stripe) {
      console.error('Stripe is not initialized');
      return res.status(500).json({ 
        error: 'Stripe is not initialized. Check server configuration.',
        code: 'stripe_not_initialized'
      });
    }

    console.log(`Creating payment intent for amount: ${amount}, programId: ${programId}`);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
      metadata: { programId }
    });

    console.log('Payment intent created successfully:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: {
        message: error.message,
        type: error.type,
        code: error.code || '500'
      }
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: {
      message: err.message || 'Internal server error',
      code: err.code || '500'
    }
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4242;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test the server: http://localhost:${PORT}/ping`);
  });
}

// Export the Express API for Vercel
module.exports = app; 