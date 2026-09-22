import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ── Path aliases ──────────────────────────────────────────────
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@data': resolve(__dirname, 'src/data'),
      '@services': resolve(__dirname, 'src/services'),
    },
  },

  // ── Build configuration ───────────────────────────────────────
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'oxc',
    target: 'es2020',
    chunkSizeWarningLimit: 900,

    rollupOptions: {
      output: {
        // Manual code-splitting — function form required by rolldown/vite 8
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3') || id.includes('node_modules/victory')) {
            return 'charts'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  // ── Preview server ────────────────────────────────────────────
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },

  // ── Dev server ────────────────────────────────────────────────
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: false,
  },

  // ── Optimise deps pre-bundling ────────────────────────────────
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'lucide-react'],
  },
})
