import React, { useState } from 'react';
import GlassmorphicCard from './GlassmorphicCard';
import GlassmorphicButton from './GlassmorphicButton';

interface EbookPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EbookPopup: React.FC<EbookPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('E-book requested for:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] overflow-auto animate-fade-up">
        <GlassmorphicCard 
          variant="primary" 
          blur="lg"
          elevation="floating"
          className="relative"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close popup"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-6">
            {!isSubmitted ? (
              <>
                {/* Image */}
                <div className="mb-6">
                  <img 
                    src="/images/training/level-1.jpg" 
                    alt="BJJ Fundamentals E-Book Cover" 
                    className="w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Error loading ebook image');
                      // Fallback to a generic gradient background
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjU3YjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNnKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjRweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkJKSiBGdW5kYW1lbnRhbHMgRS1Cb29rPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
                
                {/* Title and description */}
                <h2 className="text-2xl font-bold mb-4 text-white">Free BJJ Fundamentals E-Book</h2>
                <p className="mb-6 text-white/90">
                  Get our comprehensive e-book on BJJ fundamentals, with techniques and training methods specifically adapted for high-altitude training in the Himalayas.
                </p>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-white/90 mb-1"
                    >
                      Email Address
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-white/20 text-white 
                        focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-transparent"
                      required
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-400">{error}</p>
                    )}
                  </div>
                  
                  <GlassmorphicButton
                    variant="accent"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Get My Free E-Book'}
                  </GlassmorphicButton>
                  
                  <p className="text-xs text-white/70 text-center mt-4">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/20 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-green-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Thank You!</h2>
                <p className="mb-6 text-white/90">
                  Your e-book has been sent to your email address. Please check your inbox (and spam folder) to download your free BJJ Fundamentals E-Book.
                </p>
                <GlassmorphicButton
                  variant="secondary"
                  onClick={onClose}
                >
                  Close
                </GlassmorphicButton>
              </div>
            )}
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  );
};

export default EbookPopup; 