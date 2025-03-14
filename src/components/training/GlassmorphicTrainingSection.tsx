import React from 'react';
import GlassmorphicTrainingCard from './GlassmorphicTrainingCard';

// Training program data
const trainingPrograms = [
  {
    title: "Beginner to Blue Belt Journey",
    description: "Master the fundamentals of Brazilian Jiu-Jitsu with our comprehensive beginner program.",
    price: "₹10,000",
    features: [
      "12-week structured curriculum",
      "Fundamentals of positions and submissions",
      "Weekly mountain endurance training",
      "Access to online resources",
    ],
    imageSrc: "/images/training/level-1.jpg",
    level: "Beginner" as const,
    variant: "primary" as const,
    link: "/training/beginner",
    rotation: "-1deg",
  },
  {
    title: "Blue Belt to Purple Belt Journey",
    description: "Advance your BJJ skills with intermediate techniques and strategies.",
    price: "₹20,000",
    features: [
      "16-week advanced curriculum",
      "Specialized guard techniques",
      "Bi-weekly mountain training camps",
      "Competition preparation",
    ],
    imageSrc: "/images/training/level-2.jpg",
    level: "Intermediate" as const,
    variant: "secondary" as const,
    link: "/training/intermediate",
    rotation: "1deg",
  },
  {
    title: "Jiu Jitsu Instructor Program",
    description: "Develop your teaching skills and become a certified BJJ instructor.",
    price: "₹30,000",
    features: [
      "24-week comprehensive program",
      "Teaching methodology training",
      "High-altitude endurance camps",
      "Certification upon completion",
    ],
    imageSrc: "/images/training/level-3.jpg",
    level: "Advanced" as const,
    variant: "accent" as const,
    link: "/training/advanced",
    rotation: "-1deg",
  }
];

const GlassmorphicTrainingSection: React.FC = () => {
  return (
    <section id="training" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background/95"></div>
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-60 right-40 w-64 h-64 bg-accent/15 rounded-full blur-3xl"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-md">
              Training Programs
            </span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Combine Gracie Jiu-Jitsu techniques with Himalayan endurance training for a unique martial arts experience.
          </p>
        </div>
        
        {/* Belt decoration */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-40 bg-secondary opacity-70 hidden lg:block"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-40 bg-secondary opacity-70 hidden lg:block"></div>
        
        {/* Training programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trainingPrograms.map((program, index) => (
            <GlassmorphicTrainingCard
              key={index}
              {...program}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassmorphicTrainingSection; 