import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface GlassmorphicImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  aspectRatio?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  overlay?: boolean;
  blur?: 'none' | 'sm' | 'md' | 'lg';
  loading?: 'eager' | 'lazy';
}

/**
 * A modern glassmorphic image component
 * - Implements smooth loading states with skeleton placeholders
 * - Supports various rounded corner options
 * - Optional overlay and blur effects
 * - Optimized for performance with lazy loading
 */
const GlassmorphicImage: React.FC<GlassmorphicImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  className = '',
  aspectRatio = '16/9',
  rounded = 'md',
  overlay = false,
  blur = 'none',
  loading = 'eager',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
    
    // Debug log
    console.log(`Loading image from: ${src}`);
  }, [src]);

  // Rounded corner classes
  const roundedClasses = {
    'none': '',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full',
  };

  // Blur classes
  const blurClasses = {
    'none': '',
    'sm': 'backdrop-blur-sm',
    'md': 'backdrop-blur-md',
    'lg': 'backdrop-blur-lg',
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden', 
        roundedClasses[rounded],
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Placeholder/skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-background/50 animate-pulse"></div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 text-foreground">
          <p>Failed to load image</p>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'w-full h-full object-cover',
          roundedClasses[rounded],
          isLoaded ? 'opacity-100' : 'opacity-0',
          error ? 'hidden' : ''
        )}
        onLoad={() => {
          console.log(`Image loaded successfully: ${src}`);
          setIsLoaded(true);
        }}
        onError={(e) => {
          console.error(`Error loading image: ${src}`, e);
          setError(true);
        }}
        loading={loading}
      />
      
      {/* Overlay */}
      {overlay && isLoaded && (
        <div className={cn(
          'absolute inset-0 bg-black/30',
          blurClasses[blur],
          roundedClasses[rounded]
        )}></div>
      )}
    </div>
  );
};

export default GlassmorphicImage; 