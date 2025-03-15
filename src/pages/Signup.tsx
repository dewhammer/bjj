import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassmorphicButton from '../components/ui/GlassmorphicButton';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'beginner',
    beltColor: 'white',
    newsletter: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // In a real application, this would be an API call
      // For this demo, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        program: 'beginner',
        beltColor: 'white',
        newsletter: true,
      });
      
      // Optional: Redirect to a thank you page
      // navigate('/signup-success');
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Belt color options with their corresponding hex color codes
  const beltColors = [
    { value: 'white', label: 'White Belt', color: '#FFFFFF' },
    { value: 'blue', label: 'Blue Belt', color: '#1E40AF' },
    { value: 'purple', label: 'Purple Belt', color: '#7E22CE' },
    { value: 'brown', label: 'Brown Belt', color: '#92400E' },
    { value: 'black', label: 'Black Belt', color: '#000000' },
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Join Himalayan BJJ</h1>
      <p className="text-xl text-center mb-12 text-foreground/80">
        Begin your journey to mastery by signing up for our programs today.
      </p>
      
      <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Success message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Thank you for signing up! We'll contact you shortly with more information.
          </div>
        )}
        
        {/* Error message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="Your phone number"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="program" className="block text-sm font-medium mb-1">
                Preferred Program *
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              >
                <option value="beginner">Beginner BJJ Course</option>
                <option value="intermediate">Intermediate BJJ</option>
                <option value="advanced">Advanced Techniques</option>
                <option value="private">Private Lessons</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="beltColor" className="block text-sm font-medium mb-1">
                Current Belt Color *
              </label>
              <select
                id="beltColor"
                name="beltColor"
                value={formData.beltColor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              >
                {beltColors.map((belt) => (
                  <option key={belt.value} value={belt.value}>
                    {belt.label}
                  </option>
                ))}
              </select>
              
              {/* Belt color indicator */}
              <div className="mt-2 flex items-center">
                <div 
                  className="h-4 w-8 mr-2 rounded" 
                  style={{ 
                    backgroundColor: beltColors.find(b => b.value === formData.beltColor)?.color,
                    border: formData.beltColor === 'white' ? '1px solid #ccc' : 'none'
                  }}
                ></div>
                <span className="text-sm text-foreground/70">
                  {beltColors.find(b => b.value === formData.beltColor)?.label}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-4 w-4 text-secondary focus:ring-secondary border-primary/30 rounded"
            />
            <label htmlFor="newsletter" className="ml-2 block text-sm">
              Sign me up for the newsletter with training tips and special offers
            </label>
          </div>
          
          <div className="pt-4">
            <GlassmorphicButton
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Submitting...' : 'Sign Up Now'}
            </GlassmorphicButton>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center text-sm text-foreground/70">
        <p>By signing up, you agree to our <a href="#" className="text-secondary hover:underline">Terms of Service</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
};

export default Signup; 