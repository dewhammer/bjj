const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable the HMR error overlay
    },
  },
  base: "./", // Use relative paths for all assets
}); 