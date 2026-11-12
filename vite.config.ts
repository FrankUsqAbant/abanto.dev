import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      // Necesario para recarga en vivo dentro de Docker en Windows
      watch: { usePolling: !!process.env.CHOKIDAR_USEPOLLING },
    },
    plugins: [react(), tailwindcss()],
    define: {
      // Bridge for the API key to be available via standard import.meta.env
      "import.meta.env.VITE_GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
