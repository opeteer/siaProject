import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.PORT || env.VITE_PORT || 8020);
  const backendPort = env.BACKEND_PORT || 8020;

  return {
    plugins: [react()],
    server: {
      port,
      host: true,
      proxy: {
        '/api': {
          target: `http://localhost:${backendPort}`,
          changeOrigin: true
        }
      }
    },
    preview: {
      port,
      host: true
    }
  };
});

