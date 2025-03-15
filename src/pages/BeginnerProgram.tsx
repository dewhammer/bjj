import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const BeginnerProgram: React.FC = () => {
  const navigate = useNavigate();
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleBuyNow = async () => {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to checkout page
    navigate('/checkout?program=beginner&price=10000');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-900 to-bg-800 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-glass-lg">
          <div className="flex flex-col lg:flex-row">
            {/* Left column with image */}
            <div className="lg:w-1/2">
              <img 
                src="/images/training/level-1.jpg" 
                alt="Beginner BJJ Program" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right column with details */}
            <div className="lg:w-1/2 p-8 lg:p-10">
              <div className="absolute top-6 right-6">
                <span className="inline-block bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Beginner
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Beginner to Blue Belt Journey
              </h1>
              
              <p className="text-white/90 mb-8">
                Master the fundamentals of Brazilian Jiu-Jitsu with our comprehensive beginner program.
              </p>
              
              <h2 className="text-xl font-bold text-white mb-4">Program Features:</h2>
              <ul className="space-y-3 mb-10">
                <li className="flex items-start text-white/80">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>12-week structured curriculum</span>
                </li>
                <li className="flex items-start text-white/80">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Fundamentals of positions and submissions</span>
                </li>
                <li className="flex items-start text-white/80">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Weekly mountain endurance training</span>
                </li>
                <li className="flex items-start text-white/80">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Access to online resources</span>
                </li>
              </ul>
              
              <div className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-white/70 text-sm mb-1">Price:</h3>
                  <div className="text-3xl font-bold text-white">₹10,000</div>
                </div>
                
                <div className="mb-4">
                  <GlassmorphicButton 
                    variant="primary"
                    className="w-full"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </GlassmorphicButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginnerProgram; 