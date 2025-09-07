import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        brand: {
          primary: "#111111", // rich black
          secondary: "#6B6B6B", // muted gray
          accent: "#D4AF37", // optional gold accent (for premium feel)
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
