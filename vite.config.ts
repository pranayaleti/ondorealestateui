import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3001,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
