import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6291,
    host: '0.0.0.0',
    allowedHosts: ['giftmarkindustries.com', 'www.giftmarkindustries.com', 'gifty.cyberpunk.co.in', 'giftmark.growithcp.live'],
    proxy: {
      '/api': {
        target: 'http://localhost:5025',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5025',
        changeOrigin: true,
      },
    },
  },
})

