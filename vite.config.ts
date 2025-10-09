// vite.config.ts (Create this file if it doesn't exist)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import checker from "vite-plugin-checker";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "brotliCompress" }),
    checker({ typescript: true }),
    ViteImageOptimizer({
      /* pass your config */
    }),
  ],
  server: {
    host: true,
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1500,
    sourcemap: true,
  },
});
