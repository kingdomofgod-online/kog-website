import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 3000,  // Use PORT environment variable, fallback to 3000
    host: true, // This allows Vite to listen on all available network interfaces
  },
});
