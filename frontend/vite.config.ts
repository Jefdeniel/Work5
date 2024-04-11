import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': loadEnv('', process.cwd()),
  },
  plugins: [react()],
});
