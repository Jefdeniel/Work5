import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    'process.env': process.env,
  },
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
});
