import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import NodeGlobalsPolyfillPlugin from 'vite-plugin-node-stdlib-browser';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), NodeGlobalsPolyfillPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
