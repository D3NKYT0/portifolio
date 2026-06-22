import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(() => {
  const isDocker = process.env.DOCKER === 'true'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: ['denky.dev.br', 'www.denky.dev.br', 'localhost'],
      watch: {
        usePolling: isDocker,
      },
      hmr: isDocker
        ? {
            host: 'denky.dev.br',
            protocol: 'wss',
            clientPort: 443,
            path: '/_hmr',
          }
        : true,
      proxy: {
        '/api': {
          target: isDocker ? 'http://backend:8000' : 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  }
})
