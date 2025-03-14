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
  'https://bjj-himalayan-bjj.vercel.app',
  'https://himalayan-bjj.vercel.app',
  'https://himalayan-bjj.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set up Stripe with the secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Test route to verify server is working
app.get('/ping', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('Received payment intent request:', req.body);
    const { amount, programId } = req.body;

    if (!amount) {
      console.log('Missing amount parameter');
      return res.status(400).json({ error: 'Missing amount parameter' });
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
    res.status(500).json({ 
      error: error.message,
      type: error.type,
      code: error.code 
    });
  }
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