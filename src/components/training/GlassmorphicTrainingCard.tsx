import React from 'react';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import GlassmorphicButton from '../ui/GlassmorphicButton';

export interface GlassmorphicTrainingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  imageSrc: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  variant?: 'primary' | 'secondary' | 'accent';
  link: string;
  rotation?: string;
}

export const GlassmorphicTrainingCard: React.FC<GlassmorphicTrainingCardProps> = ({
  title,
  description,
  price,
  features,
  imageSrc,
  level,
  variant = 'primary',
  link,
  rotation,
}) => {
  // Level badge colors based on our new color scheme
  const levelColors = {
    Beginner: 'bg-primary',
    Intermediate: 'bg-secondary',
    Advanced: 'bg-accent',
  };

  // Button variants based on card variant
  const buttonVariants = {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'secondary',
  } as const;

  // Text color classes based on variant
  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    accent: 'text-white',
  };

  return (
    <div 
      className="transform transition-transform duration-300 hover:scale-[1.02]"
      style={{ transform: rotation ? `rotate(${rotation})` : 'none' }}
    >
      <GlassmorphicCard
        variant={variant}
        blur="md"
        elevation="raised"
        className={`p-5 h-full flex flex-col ${textColorClasses[variant]}`}
        interactive
      >
        {/* Level badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`${levelColors[level]} text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md`}>
            {level}
          </span>
        </div>
        
        {/* Image */}
        <div className="mb-5">
          <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: '16/9' }}>
            <img 
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              onLoad={() => console.log(`Training image loaded: ${imageSrc}`)}
              onError={(e) => console.error(`Error loading training image: ${imageSrc}`, e)}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-100 mb-4">{description}</p>
          
          {/* Features list */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-white mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* Price and button */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">{price}</span>
            </div>
            <GlassmorphicButton
              variant={buttonVariants[variant]}
              fullWidth
              to={variant === 'primary' ? '/training/beginner' : variant === 'secondary' ? '/training/intermediate' : '/training/advanced'}
            >
              View Program
            </GlassmorphicButton>
          </div>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default GlassmorphicTrainingCard; 