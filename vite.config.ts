import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.ts': 'ts',
      }
    },
  },
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/resolve-domain': {
        target: 'https://dns.google/resolve',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resolve-domain/, '')
      }
    }
  }
})

