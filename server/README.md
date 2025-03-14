# Himalayan BJJ Payment Server

This is the payment server for the Himalayan BJJ website, responsible for creating Stripe payment intents.

## Setup

1. **Obtain Stripe API Keys**:
   - Sign up for a Stripe account at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Get your API keys from the Stripe Dashboard

2. **Update Environment Variables**:
   - Copy your Stripe Secret Key to the `.env` file in the server directory
   - Update the publishable key in `src/config/stripe.ts`

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running the Server

Start the server with:

```bash
node server.js
```

The server will run on port 4242 by default. You can change this in the `.env` file.

## API Endpoints

- **POST /create-payment-intent**: Creates a new payment intent
  - Request body:
    ```json
    {
      "amount": 9900, // Amount in cents
      "programId": "beginner" // The ID of the training program
    }
    ```
  - Response:
    ```json
    {
      "clientSecret": "pi_..." // The client secret for the payment intent
    }
    ```

## Testing

You can use Stripe's test cards for testing payments:

- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## Integrating with the Frontend

The frontend uses React Stripe.js to securely collect payment details. It communicates with this server to create payment intents and process payments. The payment flow is as follows:

1. User clicks "Buy Now" on a training program page
2. Frontend sends a request to create a payment intent
3. Server creates a payment intent and returns the client secret
4. Frontend displays the Stripe payment form
5. User enters payment details and submits
6. Stripe processes the payment and redirects to the success/failure page 