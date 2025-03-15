// Basic polyfill detection
if (!window.Promise || !window.fetch || !Object.assign || !window.Map) {
  console.warn('Browser missing required features. Redirecting to fallback page...');
  window.location.href = '/fallback.html';
}

// Plain JS at the top to catch errors before React loads
(() => {
  try {
    console.log("Script execution started");
    
    // Check if we can redirect on error
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', event.error);
      
      // Try to redirect to the fallback page if we have a fatal error
      try {
        if (event.error && (
          event.error.toString().includes('MIME type') || 
          event.error.toString().includes('module') ||
          event.error.toString().includes('undefined') ||
          // Add common mobile errors
          event.error.toString().includes('null is not an object') ||
          event.error.toString().includes('Cannot read property') ||
          event.error.toString().includes('is not a function')
        )) {
          console.log('Fatal error detected, redirecting to fallback page');
          window.location.href = '/fallback.html';
        }
      } catch (e) {
        console.error('Error in error handler:', e);
        // Last resort
        window.location.href = '/fallback.html';
      }
    });
    
  } catch (e) {
    console.error('Error in initialization script:', e);
    window.location.href = '/fallback.html';
  }
})();

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Console logging for debugging
console.log('Starting application...');
console.log('User agent:', navigator.userAgent);
console.log('Screen dimensions:', window.innerWidth, 'x', window.innerHeight, 'pixel ratio:', window.devicePixelRatio);

// Log initialization for debugging
console.log('Application initializing...');

// Simple error boundary for production
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
  
  document.body.innerHTML = `
    <div style="padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 40px auto; max-width: 800px;">
      <h1 style="color: #b91c1c; margin-bottom: 10px;">Error Detected</h1>
      <p>An error occurred while loading the application:</p>
      <pre style="background-color: #fff; padding: 10px; border-radius: 4px; overflow: auto; margin-top: 10px;">
        ${event.error?.stack || event.error?.message || 'Unknown error'}
      </pre>
      <div style="margin-top: 20px;">
        <p>Technical details:</p>
        <ul>
          <li>File: ${event.filename || 'Unknown'}</li>
          <li>Line: ${event.lineno || 'Unknown'}</li>
          <li>Column: ${event.colno || 'Unknown'}</li>
          <li>Time: ${new Date().toLocaleString()}</li>
          <li>User Agent: ${navigator.userAgent}</li>
        </ul>
      </div>
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button style="padding: 10px 20px; background-color: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer;" 
                onclick="window.location.reload()">
          Refresh Page
        </button>
        <button style="padding: 10px 20px; background-color: #4b5563; color: white; border: none; border-radius: 4px; cursor: pointer;" 
                onclick="window.location.href='/fallback.html'">
          Go to Fallback Page
        </button>
      </div>
    </div>
  `;
});

// Mobile device specific handling
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('Mobile device detected, applying mobile optimizations');
  
  // Add mobile-specific error handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Only redirect on severe errors
    if (event.reason && (
      event.reason.toString().includes('Cannot read') ||
      event.reason.toString().includes('null is not an object') ||
      event.reason.toString().includes('undefined is not an object')
    )) {
      console.error('Critical error in promise, redirecting to fallback');
      window.location.href = '/fallback.html';
    }
  });
}

// Get the root element and render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.error('Error rendering React app:', e);
    window.location.href = '/fallback.html';
  }
} else {
  console.error('Root element not found');
  window.location.href = '/fallback.html';
}
