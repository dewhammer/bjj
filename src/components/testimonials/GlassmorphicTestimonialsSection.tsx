import React from 'react';
import GlassmorphicTestimonial from './GlassmorphicTestimonial';

// Sample testimonial data
const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Blue Belt Student',
    quote: 'Training at Himalayan BJJ has transformed not just my jiu-jitsu skills but also my mental resilience. The combination of traditional BJJ with mountain endurance training is unique and powerful.',
    imageSrc: '/images/testimonials/0_0.jpeg',
    rating: 5,
    variant: 'primary' as const,
    rotation: '-1deg'
  },
  {
    name: 'Priya Patel',
    role: 'Purple Belt Student',
    quote: 'The instructors here understand the mental aspects of BJJ as much as the physical. Training in the mountains has given me a perspective on jiu-jitsu I couldn\'t have found elsewhere.',
    imageSrc: '/images/testimonials/0_1.jpeg',
    rating: 5,
    variant: 'secondary' as const,
    rotation: '1deg'
  },
  {
    name: 'Amit Singh',
    role: 'White Belt Student',
    quote: 'As a beginner, I was intimidated at first, but the community here is incredibly supportive. The mountain training weekends have helped me build endurance I never thought possible.',
    imageSrc: '/images/testimonials/0_2.jpeg',
    rating: 4,
    variant: 'accent' as const,
    rotation: '-1.5deg'
  },
  {
    name: 'Maya Johnson',
    role: 'Brown Belt Student',
    quote: 'The technical depth of instruction at Himalayan BJJ is outstanding. I\'ve trained at academies around the world, and the approach here combining altitude training with BJJ fundamentals is revolutionary.',
    imageSrc: '/images/testimonials/0_3.jpeg',
    rating: 5,
    variant: 'primary' as const,
    rotation: '1.5deg'
  }
];

const GlassmorphicTestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background/90"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/15 rounded-full blur-3xl"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-md">
              Student Experiences
            </span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Hear from our community about how Himalayan BJJ has impacted their journey in Brazilian Jiu-Jitsu and beyond.
          </p>
        </div>
        
        {/* Belt decoration */}
        <div className="absolute left-0 bottom-1/4 transform -translate-y-1/2 w-4 h-40 bg-primary opacity-70 hidden lg:block"></div>
        <div className="absolute right-0 bottom-1/4 transform -translate-y-1/2 w-4 h-40 bg-primary opacity-70 hidden lg:block"></div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex justify-center">
              <GlassmorphicTestimonial {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassmorphicTestimonialsSection; 