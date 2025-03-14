import React from 'react';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import GlassmorphicCard from '../ui/GlassmorphicCard';

interface GlassmorphicCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const GlassmorphicCTA: React.FC<GlassmorphicCTAProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  variant = 'primary'
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background/90"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/15 rounded-full blur-3xl"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <GlassmorphicCard
          variant={variant}
          blur="lg"
          elevation="floating"
          className="max-w-4xl mx-auto p-8 md:p-12"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              {title}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {subtitle}
            </p>
            
            <div className="flex justify-center">
              <GlassmorphicButton
                variant={variant}
                size="lg"
                to={buttonLink}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                }
                iconPosition="right"
              >
                {buttonText}
              </GlassmorphicButton>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white/20 rounded-full translate-x-1/4 translate-y-1/4"></div>
          
          {/* Belt decoration */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-secondary opacity-70 hidden lg:block"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-secondary opacity-70 hidden lg:block"></div>
        </GlassmorphicCard>
      </div>
    </section>
  );
};

export default GlassmorphicCTA; 