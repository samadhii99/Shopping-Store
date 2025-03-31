// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    define: {
      // Expose environment variables to the client
      "import.meta.env.VITE_RECAPTCHA_SITE_KEY": JSON.stringify(
        env.VITE_RECAPTCHA_SITE_KEY || ""
      ),
    },
    server: {
      // This helps with some CORS issues during local development
      host: "localhost",
      port: 3000, // You can change this port if needed
    },
    build: {
      outDir: "dist",
      sourcemap: mode !== "production",
    },
  };
});
