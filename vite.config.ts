import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ondorealestateui/',
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
    // Only update files that actually changed
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Deterministic chunk names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
