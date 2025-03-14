import React from 'react';
import GlassmorphicHero from '../components/home/GlassmorphicHero';
import HomeTrainingSection from '../components/home/HomeTrainingSection';
import GlassmorphicInstructorsSection from '../components/instructors/GlassmorphicInstructorsSection';
import GlassmorphicTestimonialsSection from '../components/testimonials/GlassmorphicTestimonialsSection';
import GlassmorphicCTA from '../components/cta/GlassmorphicCTA';
import MobileNav from '../components/layout/MobileNav';

const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-background text-foreground">
      {/* Hero Section */}
      <div id="top">
        <GlassmorphicHero />
      </div>
      
      {/* Training Programs Section */}
      <div id="training">
        <HomeTrainingSection />
      </div>
      
      {/* Instructors Section */}
      <div id="instructors">
        <GlassmorphicInstructorsSection />
      </div>
      
      {/* Testimonials Section */}
      <div id="testimonials">
        <GlassmorphicTestimonialsSection />
      </div>
      
      {/* Call to Action Section */}
      <div id="cta">
        <GlassmorphicCTA 
          title="Ready to Begin Your Journey?"
          subtitle="Join our community of practitioners and experience the unique blend of Brazilian Jiu-Jitsu and Himalayan endurance training."
          buttonText="Sign Up Today"
          buttonLink="/signup"
          variant="secondary"
        />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default HomePage; 