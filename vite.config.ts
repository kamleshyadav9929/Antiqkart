import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // tailwind v4 Vite plugin
    compression({ algorithm: "brotliCompress" }), // adds compressed assets for deploy pipelines (optional)
    checker({ typescript: true }), // VSCode-friendly type checks during dev
  ],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1500,
  },
});
