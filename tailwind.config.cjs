/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2e5a', // Deep navy blue (BJJ gi color)
          foreground: '#ffffff',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#1a2e5a',
          600: '#1a2e5a',
          700: '#1e3a8a',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          DEFAULT: '#9a1b20', // Deep red (BJJ belt accent)
          foreground: '#ffffff',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#9a1b20',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        accent: {
          DEFAULT: '#c6a434', // Gold (belt stripes)
          foreground: '#000000',
        },
        background: '#0a1022', // Very dark blue background
        foreground: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        'emboss': '0 1px 1px rgba(255,255,255,0.9), inset 0 1px 3px rgba(0,0,0,0.3)',
        'deboss': 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 3px rgba(0,0,0,0.3)',
        'stitched': '0 0 0 2px #fff, 0 0 0 4px #000',
        'glass-sm': '0 2px 6px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        'glass-md': '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'glass-lg': '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'white-sm': '0 1px 2px rgba(255, 255, 255, 0.5)',
      },
      backgroundImage: {
        'leather': "url('/images/textures/leather-texture.jpg')",
        'paper': "url('/images/textures/paper-texture.jpg')",
        'wood': "url('/images/textures/wood-texture.jpg')",
        'metal': "linear-gradient(to bottom right, #d1d5db, #9ca3af)",
        'brushed-metal': "linear-gradient(45deg, #f3f4f6 25%, #d1d5db 25%, #d1d5db 50%, #f3f4f6 50%, #f3f4f6 75%, #d1d5db 75%, #d1d5db 100%)",
      },
      backgroundSize: {
        'micro': '10px 10px',
        'mini': '20px 20px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-white': {
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
        },
        '.text-emboss': {
          textShadow: '0 1px 1px rgba(255, 255, 255, 0.9)',
        },
        '.text-deboss': {
          textShadow: '0 -1px 1px rgba(0, 0, 0, 0.5)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
} 