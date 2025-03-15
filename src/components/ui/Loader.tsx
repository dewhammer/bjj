import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-accent-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-r-primary-500 border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-white border-l-transparent rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-accent-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader; 