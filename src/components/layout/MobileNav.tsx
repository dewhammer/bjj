import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import GlassmorphicCard from '../ui/GlassmorphicCard';

// Simplified icons as basic SVG paths to improve compatibility
const navItems = [
  { 
    name: 'Home', 
    path: '/', 
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    // Simple fallback for devices that struggle with SVG
    fallbackEmoji: '🏠'
  },
  { 
    name: 'Training', 
    path: '/programs', 
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    fallbackEmoji: '📚'
  },
  { 
    name: 'E-Book', 
    path: '/ebook', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    fallbackEmoji: '📖'
  },
  { 
    name: 'Contact', 
    path: '/contact', 
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    fallbackEmoji: '✉️'
  },
  { 
    name: 'Profile', 
    path: '/profile', 
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    fallbackEmoji: '👤'
  },
];

const MobileNav: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [useFallbackIcons, setUseFallbackIcons] = useState(false);
  
  // Detect if we should use fallback icons for older devices
  useEffect(() => {
    // Check for older Android browsers that might have SVG issues
    const isOldAndroid = /Android\s[2-4]\./.test(navigator.userAgent);
    // Check for low memory device using safer approach
    const isLowMemoryDevice = navigator.userAgent.includes('Android') && 
                             (navigator.userAgent.includes('Low') || 
                              navigator.userAgent.includes('SM-') || 
                              navigator.userAgent.includes('GT-'));
    
    setUseFallbackIcons(isOldAndroid || isLowMemoryDevice);
  }, []);
  
  // More efficient rendering logic for mobile devices
  const renderNavIcon = (item: typeof navItems[0], isActive: boolean) => {
    if (useFallbackIcons) {
      return <span style={{ fontSize: '20px' }}>{item.fallbackEmoji}</span>;
    }
    
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={isActive ? 2 : 1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
      </svg>
    );
  };
  
  return (
    <>
      {/* Bottom Navigation Bar - Always visible on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <GlassmorphicCard
          variant="primary"
          blur="lg"
          className="flex justify-around items-center h-16 px-2 rounded-none rounded-t-xl border-t border-primary/30"
        >
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full px-2 py-1',
                  'transition-colors duration-200',
                  isActive 
                    ? 'text-secondary' 
                    : 'text-foreground/80 hover:text-foreground'
                )}
                aria-label={item.name}
              >
                {renderNavIcon(item, isActive)}
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Menu button for additional items */}
          <button
            className={cn(
              'flex flex-col items-center justify-center w-full h-full px-2 py-1',
              'transition-colors duration-200',
              isOpen ? 'text-secondary' : 'text-foreground/80 hover:text-foreground'
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            <div className="relative h-6 w-6 flex items-center justify-center">
              {useFallbackIcons ? (
                <span style={{ fontSize: '20px' }}>{isOpen ? '✖' : '☰'}</span>
              ) : isOpen ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
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
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">Menu</span>
          </button>
        </GlassmorphicCard>
      </nav>
      
      {/* Expanded Menu - Shown when menu button is clicked */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="absolute bottom-16 left-0 right-0">
            <GlassmorphicCard
              variant="primary"
              blur="lg"
              className="p-4 rounded-b-none"
            >
              <div className="grid grid-cols-3 gap-4">
                {[...navItems.slice(4), { name: 'About', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', fallbackEmoji: 'ℹ️' }].map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        'flex flex-col items-center justify-center p-4 rounded-lg',
                        'transition-colors duration-200',
                        isActive 
                          ? 'bg-secondary/20 text-secondary border border-secondary/30' 
                          : 'text-foreground/80 hover:bg-white/10 hover:text-foreground'
                      )}
                    >
                      {useFallbackIcons ? (
                        <span style={{ fontSize: '24px', marginBottom: '8px' }}>{item.fallbackEmoji}</span>
                      ) : (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 mb-2" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      )}
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav; 