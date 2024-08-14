import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {} 
  },
  server: {
    // proxy: {
    //   "/api": "http://localhost:3000" || "http://localhost:5000"
    // }
  }
})
