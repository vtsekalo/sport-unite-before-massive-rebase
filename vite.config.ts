import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isDevWithMocks = mode === 'development';

    return {
    base: './',
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  define: {
    global: 'window',
    'process.env': {},
  },
  plugins: [react()],
  server: {
    host: 'front.dev.sport-unite.it-mentor.space',
    port: 5173,
    strictPort: true,
    cors: true,
    open: true,
    hmr: {
      host: 'front.dev.sport-unite.it-mentor.space',
      port: 5173
    },
    https: isDevWithMocks ? {
      key: fs.readFileSync('./front.dev.sport-unite.it-mentor.space+2-key.pem'),
      cert: fs.readFileSync('./front.dev.sport-unite.it-mentor.space+2.pem')
    } : undefined, 
    proxy: isDevWithMocks ? undefined : {
      '/user-service': {
        target: 'http://api-gateway.dev.sport-unite.it-mentor.space',
        changeOrigin: true,
        secure: false
      },
      '/oauth2': {
        target: 'http://api-gateway.dev.sport-unite.it-mentor.space',
        changeOrigin: true,
        secure: false
      },
      '/chat-service': {
        target: 'http://api-gateway.dev.sport-unite.it-mentor.space',
        changeOrigin: true,
        ws: true, 
        secure: false,
      },
      '/event-service': {
        target: 'http://api-gateway.dev.sport-unite.it-mentor.space',
        changeOrigin: true,
        secure: false
      },
    },
    },
  }
})

