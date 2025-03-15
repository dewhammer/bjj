import React, { useState } from 'react';
import GlassmorphicButton from '../ui/GlassmorphicButton';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import EbookPopup from '../ui/EbookPopup';

const GlassmorphicHero: React.FC = () => {
  const [showEbookPopup, setShowEbookPopup] = useState(false);

  // Function to handle smooth scrolling to sections
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/30"></div>
        
        {/* Animated Background blur elements */}
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-40 right-40 w-60 h-60 rounded-full bg-accent/20 blur-3xl animate-pulse-slow delay-2000"></div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Animated Text content */}
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary/90 to-accent font-extrabold drop-shadow-md">
                  Master BJJ
                </span> with <br />
                Himalayan Endurance
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/90 max-w-xl">
                Experience the unique fusion of traditional Brazilian Jiu-Jitsu techniques with 
                mountain endurance training in the breathtaking Himalayan landscape.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <GlassmorphicButton 
                  variant="secondary" 
                  size="lg"
                  href="#training"
                  onClick={(e) => e && handleScrollToSection(e, 'training')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Explore Training
                </GlassmorphicButton>
                
                <GlassmorphicButton 
                  variant="accent" 
                  size="lg"
                  onClick={() => setShowEbookPopup(true)}
                  className="text-white text-shadow-sm border-accent/50 bg-accent/95"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  }
                >
                  Get Free E-Book
                </GlassmorphicButton>
              </div>
            </div>
            
            {/* Animated Image content */}
            <div className="relative animate-fade-in-up delay-300">
              <GlassmorphicCard 
                variant="primary" 
                blur="lg"
                elevation="floating"
                className="p-3 max-w-md mx-auto transition-transform duration-700 hover:scale-[1.02]"
              >
                {/* Main image */}
                <div className="relative" style={{ aspectRatio: '4/3' }}>
                  <img 
                    src="/images/hero/bjj-training.jpg" 
                    alt="BJJ Training in the Himalayas" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </GlassmorphicCard>
              
              {/* Floating accent image */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 animate-float">
                <GlassmorphicCard 
                  variant="secondary" 
                  blur="sm"
                  elevation="raised"
                  className="p-2 h-full transition-transform duration-500 hover:scale-105"
                >
                  <div className="relative" style={{ aspectRatio: '1/1' }}>
                    <img 
                      src="/images/hero/test.jpg" 
                      alt="Himalayan Mountains" 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </GlassmorphicCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-Book Popup */}
      <EbookPopup 
        isOpen={showEbookPopup} 
        onClose={() => setShowEbookPopup(false)} 
      />
    </>
  );
};

export default GlassmorphicHero; 