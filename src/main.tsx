import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global error handler to catch and log errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Create a visible error message for debugging in production
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.padding = '20px';
  errorDiv.style.background = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.zIndex = '9999';
  errorDiv.textContent = `Error: ${event.error?.message || 'Unknown error occurred'}`;
  document.body.appendChild(errorDiv);
});

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
