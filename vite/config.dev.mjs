import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project-phaser/',
  plugins: [react()],
  server: {
    port: 8080,
  },
});
