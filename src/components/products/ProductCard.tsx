import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutButton from '../checkout/CheckoutButton';
import GlassmorphicButton from '../ui/GlassmorphicButton';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number; // Price in INR
  imageUrl: string;
  features?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  imageUrl,
  features = []
}) => {
  // Convert price to paise (smallest currency unit) for Stripe
  const priceInPaise = Math.round(price * 100);
  
  // Map program IDs to their corresponding routes
  const getProgramRoute = (programId: string) => {
    switch (programId) {
      case 'beginners-course':
        return '/training/beginner';
      case 'advanced-course':
        return '/training/advanced';
      case 'private-lessons':
        return '/training/intermediate';
      default:
        return `/programs/${programId}`;
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="text-white font-bold">
            <span className="text-sm">₹</span>
            <span className="text-2xl">{price.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <p className="text-white/80 mb-4">{description}</p>
        
        {features.length > 0 && (
          <ul className="mb-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-white/70">
                <svg className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link to={getProgramRoute(id)} className="block">
            <GlassmorphicButton 
              variant="secondary"
              className="w-full"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              }
            >
              View Program
            </GlassmorphicButton>
          </Link>
          
          <CheckoutButton 
            programId={id}
            amount={priceInPaise}
            name={title}
            description={description}
            variant="accent"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 