import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface GlassmorphicButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * A glassmorphic button component with modern design aesthetics
 * - Implements frosted glass effect with subtle transparency
 * - Offers different color variants and sizes
 * - Supports various states (hover, active, disabled)
 * - Optimized for touch with minimum 44px height
 */
const GlassmorphicButton: React.FC<GlassmorphicButtonProps> = ({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  external = false,
  href,
  icon,
  iconPosition = 'left',
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary/85 text-primary-foreground hover:bg-primary/95 backdrop-blur-md border border-primary/30',
    secondary: 'bg-secondary/85 text-secondary-foreground hover:bg-secondary/95 backdrop-blur-md border border-secondary/30',
    accent: 'bg-accent/95 text-white hover:bg-accent backdrop-blur-md border border-accent/50 shadow-md text-shadow-sm',
    outline: 'bg-transparent border border-white/20 text-foreground hover:bg-white/10 backdrop-blur-md',
    ghost: 'bg-transparent text-foreground hover:bg-white/10',
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2 h-9 rounded-lg',
    md: 'text-base px-4 py-2 h-11 rounded-lg',
    lg: 'text-lg px-6 py-3 h-14 rounded-xl',
  };

  // Common classes
  const commonClasses = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    variant === 'primary' ? 'focus:ring-primary/50' : 
    variant === 'secondary' ? 'focus:ring-secondary/50' : 
    variant === 'accent' ? 'focus:ring-accent/50' : 'focus:ring-white/30',
    'active:scale-[0.98] shadow-md',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Handle smooth scrolling for hash links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    
    // Check if it's a hash link and if we're on the same page
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Render as link if 'to' or 'href' prop is provided
  if (to) {
    return (
      <Link to={to} className={commonClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={commonClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={handleSmoothScroll}
      >
        {content}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={commonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default GlassmorphicButton; 