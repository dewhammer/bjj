import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// This component implements a simplified checkout form that simulates Stripe checkout
const BasicCheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: 'Beginners BJJ Course',
    amount: 7999, // In paise (79.99 INR)
    description: 'Learn the fundamentals of Brazilian Jiu-Jitsu',
    quantity: 1
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric values
    if (name === 'amount' || name === 'quantity') {
      setProduct(prev => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would submit to a server endpoint
      // For demo, we'll just redirect to the success page
      navigate('/payment-success?session_id=form_' + Date.now());
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Quick Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white/80 mb-2">Program Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-white"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-white/80 mb-2">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-white"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-white/80 mb-2">Price (in INR)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={product.amount / 100} // Display in rupees for user
              onChange={(e) => {
                // Convert rupees to paise
                const rupees = parseFloat(e.target.value);
                const paise = Math.round(rupees * 100);
                setProduct(prev => ({ ...prev, amount: paise }));
              }}
              min="1"
              step="0.01"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-white"
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-white/80 mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-white"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {isSubmitting ? 'Processing...' : 'Checkout with Stripe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicCheckoutForm; 