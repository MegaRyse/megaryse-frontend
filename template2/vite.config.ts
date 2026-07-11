import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  assetsInclude: ['**/*.PNG'],
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 82 },
      jpeg: { quality: 82 },
      jpg: { quality: 82 },
      webp: { quality: 82 },
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('framer-motion') || id.includes('/motion/')) return 'vendor-motion'
          if (id.includes('@hcaptcha')) return 'vendor-hcaptcha'
        },
      },
    },
  },
})
