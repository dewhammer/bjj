require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// Initialize Stripe with environment variable
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeKeyAvailable = !!stripeKey;
let stripe;
let stripeInitialized = false;

if (stripeKeyAvailable) {
  try {
    stripe = new Stripe(stripeKey);
    stripeInitialized = true;
    console.log('✅ Stripe initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Stripe:', error);
  }
} else {
  console.warn('⚠️ STRIPE_SECRET_KEY not found in environment variables');
}

// Debug endpoint to check server status
app.get('/ping', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    stripeKeyAvailable,
    stripeInitialized
  });
});

// Configure CORS for both development and production
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'http://localhost:5175',
  'http://localhost:5176',
  'https://bjj-himalayan-bjj.vercel.app',
  'https://himalayan-bjj.vercel.app',
  'https://himalayan-bjj.com',
  // Add your production domain here (without trailing slash)
  'https://himalayan-bjj-git-main-dewhammer.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow server-to-server requests and development tools to work (like Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS issue with origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // Allow cookies/authentication
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

// Simple checkout endpoint (direct redirect approach like the example)
app.post('/create-checkout-session', async (req, res) => {
  if (!stripeInitialized || !stripe) {
    return res.status(500).json({ error: 'Stripe payment processing is not available' });
  }
  
  try {
    const { price_id, quantity = 1 } = req.body;
    
    // If no price_id is provided, create a product and price dynamically
    let lineItems;
    
    if (price_id) {
      lineItems = [{ price: price_id, quantity }];
    } else {
      const { name, amount, description } = req.body;
      
      if (!name || !amount) {
        return res.status(400).json({ error: 'Missing required parameters (name, amount)' });
      }
      
      lineItems = [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: name,
            description: description || 'Himalayan BJJ Program',
          },
          unit_amount: amount, // in paise
        },
        quantity: quantity,
      }];
    }
    
    // Create the session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment-cancelled`,
    });
    
    // Use redirect like in the example
    res.redirect(303, session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// JSON API version for modern frontend integration
app.post('/api/create-checkout-session', async (req, res) => {
  // Check if Stripe is properly initialized
  if (!stripeInitialized || !stripe) {
    return res.status(500).json({ 
      error: {
        message: 'Stripe payment processing is not available at this time',
        code: 'stripe_unavailable'
      }
    });
  }
  
  try {
    const { programId, amount, name, description } = req.body;
    console.log('Checkout request received:', { programId, amount, name });
    
    if (!amount || !programId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: name || 'Himalayan BJJ Program',
              description: description || 'Training program registration'
            },
            unit_amount: amount, // in smallest currency unit (paise)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment-cancelled`,
      metadata: { programId }
    });

    // Return JSON response for the frontend to handle
    res.json({ url: session.url });
    console.log('Checkout session created:', session.id);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: {
        message: error.message,
        type: error.type,
        code: error.code || '500'
      }
    });
  }
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Debug endpoint available at /ping`);
});

// Export the Express API for Vercel
module.exports = app; 