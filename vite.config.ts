import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

export default defineConfig(() => {
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
      'process.env': '{}',
    },
    plugins: [mkcert(),react()],
    server: {
      host: 'front.dev.sport-unite.it-mentor.space',
      port: 5173,
      strictPort: true,
      cors: true,
      open: true,
      hmr: {
        host: 'front.dev.sport-unite.it-mentor.space',
        port: 5173,
        protocol: 'wss',
      },
    },
  }
})
