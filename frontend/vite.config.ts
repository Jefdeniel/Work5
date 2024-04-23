import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'frontend/dist',
    target: 'esnext',
  },
});
