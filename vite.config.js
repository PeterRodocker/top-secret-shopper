// import dotenv from 'dotenv';
// dotenv.config();

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = 1337

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
      },
      '/auth': {
        target: `http://localhost:${PORT}`,
      },
    },
  },
})
