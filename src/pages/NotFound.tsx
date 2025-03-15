import React from 'react';
import { Link } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center">
      <h1 className="text-6xl font-bold text-white mb-6">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-xl text-white/80 mb-10 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <GlassmorphicButton variant="accent" size="lg">
          Back to Home
        </GlassmorphicButton>
      </Link>
    </div>
  );
};

export default NotFound; 