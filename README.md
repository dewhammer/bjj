# Himalayan BJJ

A modern website for a Brazilian Jiu-Jitsu training center in the Himalayas, featuring program information, e-commerce, and student resources.

## Features

- Responsive design with glassmorphic UI
- Program listing and registration
- Stripe payment integration
- Student resources and information

## Tech Stack

- React with TypeScript
- Vite for build and development
- TailwindCSS for styling
- React Router for navigation
- Node.js with Express for the backend
- Stripe for payment processing

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn
- Stripe account for payment processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/himalayan-bjj.git
cd himalayan-bjj
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Stripe API keys:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Development

Start the development server:

```bash
npm run dev
```

Start the backend server:

```bash
npm run server
```

### Setting Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Update the `.env` file with your keys
4. Test the integration using the checkout demo at `/checkout-demo`

#### Testing Cards

Use these test card numbers to test your integration:

- Success: `4242 4242 4242 4242`
- Requires Authentication: `4000 0025 0000 3155`
- Declined: `4000 0000 0000 0002`

For all test cards, use any future date for expiry, any 3-digit CVC, and any postal code.

### Deployment

#### Vercel Deployment

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in the Vercel dashboard.

### Project Structure

- `/src` - Frontend React application
  - `/components` - React components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/utils` - Utility functions
- `/server` - Backend Express server
  - `server.js` - Main server file
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
