import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import NodeGlobalsPolyfillPlugin from 'vite-plugin-node-stdlib-browser';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), NodeGlobalsPolyfillPlugin()],
  server: {
    port: 3000,
  },
});
