import React from 'react';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import GlassmorphicButton from '../ui/GlassmorphicButton';

interface InstructorProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

const instructors: InstructorProps[] = [
  {
    name: "Alex Monteiro",
    role: "Head Coach • Black Belt",
    bio: "With over 15 years of experience in Brazilian Jiu-Jitsu, Alex combines traditional techniques with mountain endurance training for a unique approach to BJJ.",
    imageSrc: "/images/instructors/0_0.jpeg",
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    }
  },
  {
    name: "Sarah Chen",
    role: "Advanced Techniques • Brown Belt",
    bio: "Specializing in technical precision and competition strategy, Sarah has won multiple international tournaments and brings her competitive edge to every class.",
    imageSrc: "/images/instructors/0_1.jpeg",
    socialLinks: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    }
  },
  {
    name: "Raj Patel",
    role: "Fundamentals Coach • Purple Belt",
    bio: "Raj focuses on building strong foundations for beginners, with special attention to proper form and injury prevention techniques adapted to high-altitude training.",
    imageSrc: "/images/instructors/0_3.jpeg",
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    }
  },
];

const Instructor: React.FC<InstructorProps> = ({ name, role, bio, imageSrc, socialLinks }) => {
  return (
    <GlassmorphicCard
      variant="primary"
      blur="md"
      elevation="raised"
      className="p-5 h-full flex flex-col"
      interactive
    >
      <div className="flex flex-col items-center">
        {/* Instructor Image */}
        <div className="mb-4 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-secondary/50">
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-full h-full object-cover"
              onLoad={() => console.log(`Instructor image loaded: ${imageSrc}`)}
              onError={(e) => console.error(`Error loading instructor image: ${imageSrc}`, e)}
            />
          </div>
        </div>
        
        {/* Instructor Info */}
        <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
        <p className="text-sm text-foreground/80 text-center mb-3">{role}</p>
        
        {/* Social Links */}
        {socialLinks && (
          <div className="flex space-x-3 mb-4">
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            )}
          </div>
        )}
        
        {/* Bio */}
        <p className="text-sm text-foreground/90 text-center mb-4">{bio}</p>
        
        {/* Button */}
        <div className="mt-auto w-full">
          <GlassmorphicButton
            variant="secondary"
            fullWidth
            href="/programs"
          >
            Train with {name.split(' ')[0]}
          </GlassmorphicButton>
        </div>
      </div>
    </GlassmorphicCard>
  );
};

const GlassmorphicInstructorsSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-md">
              Meet Our Instructors
            </span>
          </h2>
          <p className="text-foreground max-w-2xl mx-auto">
            Our team of experienced BJJ practitioners brings diverse skills and teaching styles to help you master the art of Brazilian Jiu-Jitsu in the Himalayan environment.
          </p>
        </div>
        
        {/* Instructors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor, index) => (
            <Instructor key={index} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassmorphicInstructorsSection; 