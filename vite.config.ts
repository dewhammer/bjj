import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    server: {
      hmr: {
        overlay: false, // Disable the HMR error overlay
      },
    },
    base: '/', // Use root-relative paths for all assets
    build: {
      sourcemap: !isProduction, // Only generate source maps in development
      outDir: 'dist',
      assetsInlineLimit: 0, // Don't inline any assets as base64
      // For private repositories, explicitly set these options
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    // Configure MIME types for assets
    assetsInclude: ['**/*.json', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.ico', '**/*.webp']
  };
}); 