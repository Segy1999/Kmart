import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80
      },
      png: {
        quality: 80
      },
      webp: {
        quality: 80
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'gsap'],
          three: ['@react-three/drei', '@react-three/fiber', 'three']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});