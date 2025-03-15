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
  const [activeSection, setActiveSection] = useState<string>('');
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

  // Track active section based on scroll position
  useEffect(() => {
    if (!isHomePage) return;

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Adjust as needed for better sensitivity
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5] // Multiple thresholds for better precision
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Filter entries that are intersecting
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Find the one with the highest intersection ratio
        const topEntry = visibleEntries.reduce((prev, current) => 
          prev.intersectionRatio > current.intersectionRatio ? prev : current
        );
        
        const sectionId = topEntry.target.id;
        
        if (sectionId === 'top' || !sectionId) {
          setActiveSection('');
        } else {
          setActiveSection(`#${sectionId}`);
        }
        
        console.log('Active section set to:', sectionId ? `#${sectionId}` : 'home');
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all sections that correspond to nav items
    const sections = navItems
      .map(item => item.path.startsWith('#') ? document.getElementById(item.path.substring(1)) : null)
      .filter(Boolean);
    
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    // Also observe the top section
    const topSection = document.getElementById('top');
    if (topSection) observer.observe(topSection);

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
      if (topSection) observer.unobserve(topSection);
    };
  }, [isHomePage]);
  
  // Handle smooth scrolling to sections
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // If it's a hash link and we're on homepage, do smooth scroll
    if (path.startsWith('#') && isHomePage) {
      e.preventDefault();
      const targetElement = document.querySelector(path);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update the active section
        setActiveSection(path);
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

  // Determine if a nav item is active
  const isNavItemActive = (path: string) => {
    if (path === '/') {
      return (isHomePage && activeSection === '') || (!isHomePage && location.pathname === '/');
    }
    
    if (path.startsWith('#')) {
      return isHomePage && activeSection === path;
    }
    
    return location.pathname === path;
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
              const isActive = isNavItemActive(item.path);
              
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
              href={isHomePage ? "#training" : "/#training"}
              onClick={(e) => {
                if (isHomePage && e) {
                  e.preventDefault();
                  const targetElement = document.querySelector('#training');
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveSection('#training');
                  }
                }
              }}
            >
              Explore Training
            </GlassmorphicButton>
          </div>
          
          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className="md:hidden text-white focus:outline-none bg-gray-800/80 p-1.5 rounded-lg"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu - Only visible when toggled on mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-xl bg-background/95 backdrop-blur-md border border-primary/20 shadow-glass-lg">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.path);
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      handleSmoothScroll(e, item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-colors duration-200",
                      isActive 
                        ? "text-accent font-medium bg-white/15 border border-accent/20" 
                        : "text-foreground hover:bg-white/10"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
              <GlassmorphicButton
                variant="secondary"
                size="sm"
                href={isHomePage ? "#training" : "/#training"}
                className="mt-2"
                onClick={(e) => {
                  if (isHomePage && e) {
                    e.preventDefault();
                    const targetElement = document.querySelector('#training');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveSection('#training');
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