import React, { useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';

const Programs: React.FC = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Sample program data - in a real app, this would come from an API or CMS
  const programs = [
    {
      id: 'beginners-course',
      title: 'Beginners Course',
      description: 'Perfect for those new to BJJ. Learn the fundamentals in a structured environment.',
      price: 10000,
      imageUrl: '/images/training/level-1.jpg',
      features: [
        '8 weeks of structured training',
        'Fundamental techniques and positions',
        'Gi included in the price',
        'Certificate upon completion'
      ]
    },
    {
      id: 'advanced-course',
      title: 'Advanced Techniques',
      description: 'For practitioners with at least 6 months of experience who want to refine their skills.',
      price: 20000,
      imageUrl: '/images/training/level-2.jpg',
      features: [
        '12 weeks of intensive training',
        'Competition preparation',
        'Advanced submissions and escapes',
        'Personalized feedback'
      ]
    },
    {
      id: 'private-lessons',
      title: 'Private Lessons',
      description: 'One-on-one training with our experienced instructors to accelerate your progress.',
      price: 30000,
      imageUrl: '/images/training/level-3.jpg',
      features: [
        'Personalized curriculum',
        'Flexible scheduling',
        'Focused attention on your specific needs',
        'Rapid skill development'
      ]
    }
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-900 to-bg-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Training Programs</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover our specialized Brazilian Jiu-Jitsu programs designed for all skill levels,
            from beginners to advanced practitioners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map(program => (
            <ProductCard 
              key={program.id}
              id={program.id}
              title={program.title}
              description={program.description}
              price={program.price}
              imageUrl={program.imageUrl}
              features={program.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs; 