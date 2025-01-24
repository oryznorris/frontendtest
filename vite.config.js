import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Garante que os assets sejam carregados corretamente
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 4173,      // Use a porta que você está usando
  },
});


