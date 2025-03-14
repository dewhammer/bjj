import React from 'react';
import { cn } from '../../lib/utils';

export interface GlassmorphicCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  blur?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  elevation?: 'flat' | 'raised' | 'floating';
}

/**
 * A glassmorphic card component with modern design aesthetics
 * - Implements frosted glass effect with customizable blur levels
 * - Offers different color variants and elevation options
 * - Supports interactive states and animations
 * - Optimized for touch interactions with proper sizing
 */
const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  variant = 'primary',
  blur = 'md',
  border = true,
  className = '',
  onClick,
  interactive = false,
  elevation = 'flat',
}) => {
  // Variant classes for different color schemes
  const variantClasses = {
    primary: 'bg-primary/25 text-primary-foreground',
    secondary: 'bg-secondary/25 text-secondary-foreground',
    accent: 'bg-accent/40 text-white',
    neutral: 'bg-background/70 text-foreground',
  };

  // Blur intensity classes
  const blurClasses = {
    none: 'backdrop-blur-none',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  // Elevation classes for shadow effects
  const elevationClasses = {
    flat: 'shadow-sm',
    raised: 'shadow-md',
    floating: 'shadow-lg',
  };

  // Border color classes based on variant
  const getBorderClass = () => {
    if (!border) return '';
    
    switch (variant) {
      case 'primary':
        return 'border border-primary/40';
      case 'secondary':
        return 'border border-secondary/40';
      case 'accent':
        return 'border border-accent/50';
      default:
        return 'border border-white/20';
    }
  };

  // Interactive classes for hover and active states
  const interactiveClasses = interactive
    ? 'transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer'
    : '';

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        blurClasses[blur],
        elevationClasses[elevation],
        interactiveClasses,
        getBorderClass(),
        'min-h-[44px]', // Minimum touch target size
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard; 