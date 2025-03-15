# HimalayanBJJ Website

A Progressive Web App (PWA) for Himalayan BJJ, a unique martial arts training program that combines Brazilian Jiu-Jitsu with Himalayan endurance training.

## Modern Glassmorphism Design

This project implements a modern glassmorphism design approach, which creates a frosted glass effect with depth and translucency. The design includes:

- Frosted glass effects with customizable blur levels
- Subtle transparency and light border effects
- Colorful gradient backgrounds with blur overlays
- Smooth animations and transitions
- Optimized for dark mode aesthetics

## Mobile UX Best Practices (2025)

The interface follows the latest mobile UX design principles:

### Touch-First Interaction
- All interactive elements have a minimum size of 44x44 pixels
- Important actions are positioned within thumb-friendly zones
- Reduced need for precise tapping with generous touch targets

### Performance Optimization
- Optimized image loading with lazy loading and placeholders
- Minimal use of heavy animations to preserve battery life
- Efficient component rendering for smooth scrolling

### Simplified Navigation
- Clear visual hierarchy with consistent UI patterns
- Bottom-positioned primary actions for easy thumb access
- Progressive disclosure of information to reduce cognitive load

### Visual Clarity
- High contrast text with proper spacing
- Content broken into digestible chunks
- Sufficient white space to improve readability

### Accessibility
- Proper color contrast ratios
- Support for screen readers
- Keyboard navigation support
- Resizable text

## Components

### UI Components

- **GlassmorphicCard**: A versatile card component with frosted glass effect, various color variants, and elevation levels.
- **GlassmorphicButton**: Interactive buttons with glassmorphic styling and proper touch targets.
- **GlassmorphicImage**: Image component with smooth loading states and various rounded corner options.

### Section Components

- **GlassmorphicHero**: Hero section with gradient background and floating image elements.
- **GlassmorphicTrainingSection**: Training programs section with card-based layout.
- **GlassmorphicTestimonialsSection**: Testimonials section with student feedback cards.
- **GlassmorphicCTA**: Call-to-action section with prominent button and decorative elements.

### Layout Components

- **Footer**: Footer with glassmorphic cards and improved mobile navigation.

## Image Requirements

The project requires various content images. See the following README file for details:

- [Image Placeholders](/public/images/README.md)

## Technologies Used

- React
- TypeScript
- Tailwind CSS (with custom utilities for glassmorphism effects)
- React Router

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

The glassmorphic components are highly customizable through props:

- Change color variants with the `variant` prop
- Adjust blur intensity with the `blur` prop
- Control elevation with the `elevation` prop
- Enable interactive states with the `interactive` prop

## Contributing

1. Add content images to their respective directories in `/public/images/`
2. Follow the glassmorphism design principles when creating new components
3. Ensure all components meet the mobile UX best practices outlined above

## Features

- Mobile-first responsive design
- Progressive Web App capabilities (offline access, installable)
- Training curriculum and workshop registration
- E-book sales and member-only content

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Workbox for PWA/Service Worker functionality

## Development

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
npm run dev
```

### Building for Production

```bash
# Build for production with PWA features
npm run build:pwa
```

## Project Structure

```
himalayan-bjj/
├── public/               # Static assets
│   ├── icons/            # App icons for PWA
│   └── manifest.json     # Web App Manifest
├── src/
│   ├── assets/           # Project assets
│   │   ├── images/       # Images
│   │   └── icons/        # Icons
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # UI components
│   │   ├── home/         # Homepage components
│   │   ├── ebook/        # E-book components
│   │   ├── training/     # Training curriculum components
│   │   ├── workshops/    # Workshop components
│   │   └── members/      # Members area components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
├── tailwind.config.js    # Tailwind CSS configuration
└── workbox-config.js     # Service worker configuration
```

## License

All rights reserved.

## Environment Setup

### Vercel Environment Variables

Make sure to set up the following environment variables in your Vercel project settings:

- `STRIPE_SECRET_KEY`: Your Stripe secret key from the Stripe dashboard

To add environment variables to your Vercel project:
1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" 
5. Add the variable `STRIPE_SECRET_KEY` with your Stripe secret key value
6. Deploy your project again to apply the changes

## Local Development

```
npm run dev
```

## Production Build

```
npm run build
```

## Deployment

This project is configured for deployment on Vercel.

```
vercel
```

## Features

- Responsive design with glassmorphic UI elements
- Training program information
- E-book signup
- Payment processing with Stripe
