import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages: set base to '/<repo-name>/'
// Change 'moving-sale' to your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/moving-sale/',
});
