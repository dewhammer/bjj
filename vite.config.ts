import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable the HMR error overlay
    },
  },
  base: '/', // Use root-relative paths for all assets
  build: {
    sourcemap: true, // Enable source maps for debugging
    outDir: 'dist',
    assetsInlineLimit: 0, // Don't inline any assets as base64
  },
  // Configure MIME types for assets
  assetsInclude: ['**/*.json'],
}); 