import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GlassmorphicCard from '../components/ui/GlassmorphicCard';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';
import StripeCheckoutWrapper from '../components/payments/StripeCheckoutWrapper';
import { PAYMENT_API_URL } from '../config/stripe';

// Training program data (in a real app, this would come from a database)
const trainingPrograms = {
  'beginner': {
    id: 'beginner',
    name: 'Beginner BJJ Program',
    description: 'Perfect for those new to Brazilian Jiu-Jitsu. Learn the fundamentals and build a solid foundation.',
    price: 1000000, // ₹10,000 (in smallest currency unit - paise)
    image: '/images/training/level-1.jpg',
    level: 'Beginner',
    variant: 'primary',
    features: [
      'Fundamentals of BJJ',
      'Basic self-defense techniques',
      'Proper warm-up and stretching routines',
      '12-week structured curriculum',
      'Weekly mountain endurance training'
    ]
  },
  'intermediate': {
    id: 'intermediate',
    name: 'Intermediate BJJ Program',
    description: 'Take your skills to the next level with our intermediate program. Advance your techniques and start competitive training.',
    price: 2000000, // ₹20,000 (in smallest currency unit - paise)
    image: '/images/training/level-2.jpg',
    level: 'Intermediate',
    variant: 'secondary',
    features: [
      'Advanced guard techniques',
      'Specialized competition preparation',
      '16-week advanced curriculum',
      'Bi-weekly mountain training camps',
      'Personalized feedback from instructors'
    ]
  },
  'advanced': {
    id: 'advanced',
    name: 'Jiu Jitsu Instructor Program',
    description: 'Develop your teaching skills and become a certified BJJ instructor with our comprehensive instructor program.',
    price: 3000000, // ₹30,000 (in smallest currency unit - paise)
    image: '/images/training/level-3.jpg',
    level: 'Advanced',
    variant: 'accent',
    features: [
      '24-week comprehensive program',
      'Teaching methodology training',
      'High-altitude endurance camps',
      'Certification upon completion',
      'Private coaching sessions'
    ]
  }
};

const TrainingProgramPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const program = programId ? trainingPrograms[programId as keyof typeof trainingPrograms] : null;
  
  const handleBuyNowClick = async () => {
    if (!program) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    console.log('Buy Now clicked - Sending request to:', PAYMENT_API_URL);
    console.log('Request data:', { amount: program.price, programId: program.id });
    
    try {
      const response = await axios.post(PAYMENT_API_URL, {
        amount: program.price,
        programId: program.id
      });
      
      console.log('Payment intent created successfully:', response.data);
      setClientSecret(response.data.clientSecret);
      setShowCheckout(true);
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setErrorMessage(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setErrorMessage('No response from server. Please check if the backend is running.');
      } else {
        console.error('Error message:', error.message);
        setErrorMessage(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!program) {
    return (
      <div className="container mx-auto pt-32 pb-16 px-4">
        <GlassmorphicCard className="p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
          <p>The training program you're looking for does not exist.</p>
          <GlassmorphicButton to="/training" className="mt-4">
            Return to Training Programs
          </GlassmorphicButton>
        </GlassmorphicCard>
      </div>
    );
  }
  
  // Level badge colors based on the program level
  const levelColors = {
    Beginner: 'bg-primary',
    Intermediate: 'bg-secondary',
    Advanced: 'bg-accent',
  };
  
  return (
    <div className="container mx-auto pt-32 pb-16 px-4">
      <GlassmorphicCard 
        className="p-8 max-w-3xl mx-auto" 
        variant={program.variant as 'primary' | 'secondary' | 'accent'}
        blur="md"
        elevation="raised"
      >
        {/* Level badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`${levelColors[program.level as keyof typeof levelColors]} text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md`}>
            {program.level}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img 
              src={program.image} 
              alt={program.name} 
              className="w-full h-auto rounded-lg object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{program.name}</h1>
            <p className="text-foreground/80">{program.description}</p>
            
            <div className="bg-background/30 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">Program Features:</h3>
              <ul className="space-y-2">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-primary/20 pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg">Price:</span>
                <span className="text-2xl font-bold">₹{(program.price / 100).toLocaleString('en-IN')}</span>
              </div>
              
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-md mb-4">
                  {errorMessage}
                </div>
              )}
              
              {!showCheckout ? (
                <GlassmorphicButton 
                  variant={program.variant as 'primary' | 'secondary' | 'accent'} 
                  onClick={handleBuyNowClick}
                  className="w-full py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Buy Now'}
                </GlassmorphicButton>
              ) : null}
            </div>
          </div>
        </div>
        
        {showCheckout && clientSecret && (
          <div className="mt-8 border-t border-primary/20 pt-8">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <StripeCheckoutWrapper clientSecret={clientSecret} />
          </div>
        )}
      </GlassmorphicCard>
    </div>
  );
};

export default TrainingProgramPage; 