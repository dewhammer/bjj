import React from 'react';
import GlassmorphicTrainingSection from '../training/GlassmorphicTrainingSection';

const HomeTrainingSection: React.FC = () => {
  return (
    <section id="training" className="py-20 relative overflow-hidden">
      {/* Render the main training section */}
      <GlassmorphicTrainingSection />
    </section>
  );
};

export default HomeTrainingSection; 