import React, { useEffect } from 'react';

const About: React.FC = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Himalayan BJJ</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Bringing authentic Brazilian Jiu-Jitsu training to the heart of the Himalayas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 mb-4">
              Our mission is to introduce the transformative power of Brazilian Jiu-Jitsu to the 
              Himalayan region, creating a community of skilled, confident, and disciplined practitioners.
            </p>
            <p className="text-white/80">
              We believe that BJJ is more than just a martial art—it's a way of life that teaches 
              resilience, problem-solving, and respect for others.
            </p>
          </div>
          
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <img 
              src="/images/about/mission.jpg" 
              alt="BJJ training" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1">
            <img 
              src="/images/about/instructors.jpg" 
              alt="BJJ instructor" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg p-6 order-1 md:order-2">
            <h2 className="text-2xl font-bold text-white mb-4">Our Instructors</h2>
            <p className="text-white/80 mb-4">
              Our team consists of internationally certified instructors with years of experience 
              in both competitive and self-defense aspects of Brazilian Jiu-Jitsu.
            </p>
            <p className="text-white/80">
              Each instructor brings a unique perspective and teaching style, ensuring that 
              every student receives well-rounded training that meets their individual needs.
            </p>
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Growth</h3>
              <p className="text-white/70 text-center">
                We're committed to continuous improvement, both on and off the mats.
              </p>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-500/20 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Community</h3>
              <p className="text-white/70 text-center">
                We foster a supportive environment where everyone feels welcome and valued.
              </p>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">Respect</h3>
              <p className="text-white/70 text-center">
                We practice and teach respect for all, regardless of skill level or background.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 