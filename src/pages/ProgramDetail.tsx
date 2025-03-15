import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';
import CheckoutButton from '../components/checkout/CheckoutButton';

// Define the Program interface
interface Program {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  features: string[];
  longDescription?: string;
  schedule?: string[];
  instructors?: string[];
}

// Sample program data - in a real app, this would come from an API or CMS
const programsData: Program[] = [
  {
    id: 'beginners-course',
    title: 'Beginners Course',
    description: 'Perfect for those new to BJJ. Learn the fundamentals in a structured environment.',
    longDescription: 'Our comprehensive Beginners Course is designed for those with little to no experience in Brazilian Jiu-Jitsu. Over 8 weeks, you\'ll learn the core principles, fundamental movements, and basic techniques that form the foundation of BJJ. Classes are conducted in a supportive environment where you can progress at your own pace while building confidence and skill. By the end of the course, you\'ll have a solid understanding of BJJ fundamentals and be ready to continue your journey.',
    price: 7999,
    imageUrl: '/images/programs/beginners.jpg',
    features: [
      '8 weeks of structured training',
      'Fundamental techniques and positions',
      'Gi included in the price',
      'Certificate upon completion'
    ],
    schedule: [
      'Monday & Wednesday: 6:00 PM - 7:30 PM',
      'Saturday: 10:00 AM - 11:30 AM'
    ],
    instructors: ['Master Rajesh Sharma', 'Sensei David Chen']
  },
  {
    id: 'advanced-course',
    title: 'Advanced Techniques',
    description: 'For practitioners with at least 6 months of experience who want to refine their skills.',
    longDescription: 'The Advanced Techniques program is tailored for BJJ practitioners who have mastered the basics and are ready to elevate their game. This intensive 12-week course focuses on sophisticated submission techniques, advanced guard variations, strategic transitions, and competition-level escapes. You\'ll receive personalized coaching to refine your style and address specific challenges in your game. This program will significantly accelerate your progression and prepare you for high-level competition.',
    price: 9999,
    imageUrl: '/images/programs/advanced.jpg',
    features: [
      '12 weeks of intensive training',
      'Competition preparation',
      'Advanced submissions and escapes',
      'Personalized feedback'
    ],
    schedule: [
      'Tuesday & Thursday: 7:00 PM - 9:00 PM',
      'Sunday: 9:00 AM - 11:00 AM'
    ],
    instructors: ['Professor James Wong', 'Coach Anita Patel']
  },
  {
    id: 'private-lessons',
    title: 'Private Lessons',
    description: 'One-on-one training with our experienced instructors to accelerate your progress.',
    longDescription: 'Our Private Lessons offer the most personalized BJJ learning experience available. Working one-on-one with our elite instructors, you\'ll receive undivided attention and custom-tailored instruction focused on your specific goals and challenges. Whether you\'re preparing for competition, addressing particular technical difficulties, or simply prefer individual learning, private lessons provide the fastest path to improvement. Flexible scheduling options make it easy to fit sessions into your busy life.',
    price: 12999,
    imageUrl: '/images/programs/private.jpg',
    features: [
      'Personalized curriculum',
      'Flexible scheduling',
      'Focused attention on your specific needs',
      'Rapid skill development'
    ],
    schedule: [
      'Available 7 days a week',
      'Morning, afternoon, and evening slots',
      'By appointment only'
    ],
    instructors: ['All certified instructors available']
  }
];

const ProgramDetail: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    // Find the program with the matching ID
    const foundProgram = programsData.find(p => p.id === programId);
    
    if (foundProgram) {
      setProgram(foundProgram);
    }
    setLoading(false);
  }, [programId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Program Not Found</h1>
        <p className="text-white/80 mb-8">The program you're looking for doesn't exist or has been removed.</p>
        <GlassmorphicButton 
          variant="primary" 
          onClick={() => navigate('/programs')}
        >
          Back to Programs
        </GlassmorphicButton>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-7xl mx-auto">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and info */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-glass-lg mb-8">
              <img 
                src={program.imageUrl} 
                alt={program.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Program Details</h2>
              
              {program.schedule && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Schedule</h3>
                  <ul className="space-y-1 text-white/80">
                    {program.schedule.map((time, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {program.instructors && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Instructors</h3>
                  <ul className="space-y-1 text-white/80">
                    {program.instructors.map((instructor, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                        <span>{instructor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Program details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{program.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="text-white font-bold mr-4">
                <span className="text-sm">₹</span>
                <span className="text-3xl">{program.price.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="bg-accent-500/20 text-accent-300 px-3 py-1 rounded-full text-sm font-medium">
                Limited Seats Available
              </div>
            </div>
            
            <div className="text-white/90 mb-8 text-lg">
              {program.longDescription || program.description}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">What's Included</h2>
              <ul className="space-y-3">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-white/80">
                    <svg className="h-6 w-6 text-accent-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Ready to Join?</h2>
              <p className="text-white/80 mb-6">
                Secure your spot in our {program.title} program today. Limited spaces available for the upcoming batch.
              </p>
              
              <CheckoutButton 
                programId={program.id}
                amount={program.price * 100} // Convert to paise
                name={program.title}
                description={program.description}
                variant="accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail; 