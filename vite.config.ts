import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) {
            return "three-vendor";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) {
            return "motion-vendor";
          }
          if (id.includes("node_modules/@tsparticles") || id.includes("node_modules/tsparticles")) {
            return "particles-vendor";
          }
          if (id.includes("node_modules/i18next") || id.includes("node_modules/react-i18next")) {
            return "i18n-vendor";
          }
        },
      },
    },
  },
});
