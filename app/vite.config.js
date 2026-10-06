import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  server: {
    // Nécessaire pour que le rechargement à chaud fonctionne dans le conteneur
    watch: {
      usePolling: true,
      interval: 100
    },
    host: true
  }
});
