import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import GlassmorphicButton from '../ui/GlassmorphicButton';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Training', path: '#training' },
  { name: 'Instructors', path: '#instructors' },
  { name: 'Testimonials', path: '#testimonials' },
  { name: 'Contact', path: '#cta' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // If it's a hash link and we're on homepage, do smooth scroll
    if (path.startsWith('#') && isHomePage) {
      e.preventDefault();
      const targetElement = document.querySelector(path);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (path === '/' && !isHomePage) {
      // If it's the home link and we're not on homepage, navigate to homepage
      // No need to prevent default, let it navigate normally
    } else if (path.startsWith('#') && !isHomePage) {
      // If it's a hash link but we're not on homepage
      e.preventDefault();
      // Navigate to homepage with hash
      window.location.href = `/${path}`;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full',
      isScrolled ? 'py-1' : 'py-3'
    )}>
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className={cn(
          'flex items-center justify-between h-16 rounded-xl px-4',
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md shadow-glass-md border border-primary/30' 
            : 'bg-background/70 backdrop-blur-sm border border-white/10'
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 rounded-full bg-primary/80 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">BJJ</span>
              </div>
              <span className="text-xl font-bold font-display text-white">
                Himalayan BJJ
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = 
                (isHomePage && item.path.startsWith('#') && location.hash === item.path) ||
                (!isHomePage && item.path === location.pathname) ||
                (item.path === '/' && location.pathname === '/');
              
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleSmoothScroll(e, item.path)}
                  className={cn(
                    'px-3 py-2 rounded-lg transition-colors duration-200',
                    isActive 
                      ? 'text-accent font-medium bg-white/15 border border-accent/20' 
                      : 'text-foreground/90 hover:text-foreground hover:bg-white/10'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
          
          {/* CTA Button - Hidden on mobile */}
          <div className="hidden md:block">
            <GlassmorphicButton
              variant="secondary"
              size="sm"
              to={isHomePage ? "#training" : "/#training"}
              onClick={(e) => {
                if (isHomePage && e) {
                  e.preventDefault();
                  const targetElement = document.querySelector('#training');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
            >
              Explore Training
            </GlassmorphicButton>
          </div>
          
          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu - Only visible when toggled on mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-xl bg-background/95 backdrop-blur-md border border-primary/20 shadow-glass-lg">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    handleSmoothScroll(e, item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg text-foreground hover:bg-white/10"
                >
                  {item.name}
                </a>
              ))}
              <GlassmorphicButton
                variant="secondary"
                size="sm"
                to={isHomePage ? "#training" : "/#training"}
                className="mt-2"
                onClick={(e) => {
                  if (isHomePage && e) {
                    e.preventDefault();
                    const targetElement = document.querySelector('#training');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setMobileMenuOpen(false);
                    }
                  }
                }}
              >
                Explore Training
              </GlassmorphicButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 