require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

// Middleware
app.use(express.json());

// Configure CORS more explicitly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
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

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server: http://localhost:${PORT}/ping`);
}); 