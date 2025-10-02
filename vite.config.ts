// vite.config.ts (Create this file if it doesn't exist)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "brotliCompress" }), // adds compressed assets for deploy pipelines (optional)
    checker({ typescript: true }), // VSCode-friendly type checks during dev
  ],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1500,
  },
});
