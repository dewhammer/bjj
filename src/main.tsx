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

// Console logging for debugging
console.log('Starting application...');
console.log('User agent:', navigator.userAgent);

// Simple test component that doesn't depend on any other files
const SimpleApp = () => {
  // Log successful component creation
  React.useEffect(() => {
    console.log('SimpleApp component mounted successfully');
    
    // Clean up static content if it exists
    const rootElement = document.getElementById('root');
    const staticContent = rootElement?.querySelector('.static-content');
    if (staticContent && rootElement) {
      console.log('Removing static content placeholder');
      rootElement.removeChild(staticContent);
    }
  }, []);
  
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#0284c7', marginBottom: '20px' }}>Himalayan BJJ</h1>
      <p style={{ color: '#333', marginBottom: '20px' }}>
        This is a test page to verify that basic React rendering works.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '8px', 
        border: '1px solid #bae6fd',
        marginBottom: '20px',
        width: '100%'
      }}>
        <h2 style={{ color: '#0369a1', marginBottom: '10px' }}>Debug Information</h2>
        <p>If you're seeing this page, React is successfully rendering.</p>
        <p>Current Time: {new Date().toLocaleString()}</p>
        <p>User Agent: {navigator.userAgent}</p>
      </div>
      <button 
        style={{ 
          backgroundColor: '#0284c7', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => {
          alert('Button clicked! JavaScript is working correctly.');
        }}
      >
        Click to Test JavaScript
      </button>
    </div>
  );
};

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

// Basic DOM check to make sure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 40px auto; max-width: 800px;">
      <h1 style="color: #b91c1c; margin-bottom: 10px;">Root Element Missing</h1>
      <p>The application could not find the "root" element to render into.</p>
      <p>This is usually caused by an HTML structure issue.</p>
      <button style="margin-top: 20px; padding: 10px 20px; background-color: #4b5563; color: white; border: none; border-radius: 4px; cursor: pointer;" 
              onclick="window.location.href='/fallback'">
        Go to Fallback Page
      </button>
    </div>
  `;
} else {
  try {
    console.log('Root element found, trying to render React app...');
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <SimpleApp />
      </React.StrictMode>
    );
    
    console.log('React rendering completed successfully');
  } catch (error) {
    console.error('Error during rendering:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 40px auto; max-width: 800px;">
        <h1 style="color: #b91c1c; margin-bottom: 10px;">Rendering Error</h1>
        <p>React encountered an error while trying to render the application:</p>
        <pre style="background-color: #fff; padding: 10px; border-radius: 4px; overflow: auto; margin-top: 10px;">
          ${error instanceof Error ? error.stack || error.message : String(error)}
        </pre>
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
  }
}
