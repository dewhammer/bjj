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
          event.error.toString().includes('undefined')
        )) {
          console.log('Fatal error detected, redirecting to fallback page');
          window.location.href = '/fallback';
        }
      } catch (e) {
        console.error('Error in error handler:', e);
      }
    });
    
  } catch (e) {
    console.error('Error in initialization script:', e);
  }
})();

import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Console logging for debugging
console.log('Starting application...');
console.log('User agent:', navigator.userAgent);

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
                onclick="window.location.href='/fallback'">
          Go to Fallback Page
        </button>
      </div>
    </div>
  `;
});

// Get the root element and render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
