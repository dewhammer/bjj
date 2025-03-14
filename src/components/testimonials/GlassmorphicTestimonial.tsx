import React from 'react';
import GlassmorphicCard from '../ui/GlassmorphicCard';

export interface GlassmorphicTestimonialProps {
  name: string;
  role: string;
  quote: string;
  imageSrc: string;
  rating: number;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  rotation?: string;
}

export const GlassmorphicTestimonial: React.FC<GlassmorphicTestimonialProps> = ({
  name,
  role,
  quote,
  imageSrc,
  rating,
  variant = 'primary',
  rotation,
}) => {
  // Get belt color based on role
  const getBeltColor = () => {
    if (role.includes('White')) return 'border-white';
    if (role.includes('Blue')) return 'border-primary';
    if (role.includes('Purple')) return 'border-secondary';
    if (role.includes('Brown')) return 'border-amber-800';
    if (role.includes('Black')) return 'border-black';
    return 'border-white/20';
  };

  return (
    <div 
      className="transform transition-transform duration-300 hover:scale-[1.02]"
      style={{ transform: rotation ? `rotate(${rotation})` : 'none' }}
    >
      <GlassmorphicCard 
        variant={variant} 
        elevation="raised"
        className="max-w-sm p-6"
      >
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <div className={`p-1 rounded-full ${getBeltColor()} border-2`}>
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={imageSrc}
                  alt={`${name} - Himalayan BJJ Student`}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`Testimonial image loaded: ${imageSrc}`)}
                  onError={(e) => console.error(`Error loading testimonial image: ${imageSrc}`, e)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm opacity-90">{role}</p>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-accent' : 'text-gray-600'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className="relative">
          <svg className="absolute top-0 left-0 w-8 h-8 text-white/20 -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-sm leading-relaxed">{quote}</p>
        </blockquote>
      </GlassmorphicCard>
    </div>
  );
};

export default GlassmorphicTestimonial; 