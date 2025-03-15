import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const AdvancedProgram: React.FC = () => {
  const navigate = useNavigate();
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleBuyNow = async () => {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to checkout page
    navigate('/checkout?program=advanced&price=30000');
  };
  
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <GlassmorphicButton
            variant="secondary"
            onClick={() => navigate('/programs')}
            size="sm"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            }
          >
            Back to All Programs
          </GlassmorphicButton>
        </div>
        
        <div className="bg-[#5c5324]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-glass-lg">
          <div className="flex flex-col lg:flex-row">
            {/* Left column with image */}
            <div className="lg:w-1/2">
              <div className="h-full">
                <img 
                  src="/images/training/level-3.jpg" 
                  alt="Jiu Jitsu Instructor Program" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right column with details */}
            <div className="lg:w-1/2 p-8 lg:p-10">
              <div className="mb-2">
                <span className="inline-block bg-accent/30 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Advanced
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Jiu Jitsu Instructor Program
              </h1>
              
              <p className="text-white/90 mb-8">
                Develop your teaching skills and become a certified BJJ instructor.
              </p>
              
              <div className="bg-black/20 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Program Features:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start text-white/80">
                    <svg className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>24-week comprehensive program</span>
                  </li>
                  <li className="flex items-start text-white/80">
                    <svg className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>Teaching methodology training</span>
                  </li>
                  <li className="flex items-start text-white/80">
                    <svg className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>High-altitude endurance camps</span>
                  </li>
                  <li className="flex items-start text-white/80">
                    <svg className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>Certification upon completion</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col justify-center mb-8">
                <div className="mb-4">
                  <h3 className="text-white/70 text-sm mb-1">Price:</h3>
                  <div className="text-3xl font-bold text-white">₹30,000</div>
                </div>
                
                <div>
                  <GlassmorphicButton 
                    variant="accent"
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

export default AdvancedProgram; 