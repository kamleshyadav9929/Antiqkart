/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // Pure white
        "oxford-blue": "#0B2545", // Deep, trustworthy navy blue
        "indigo-dye": "#134074", // Rich, classic indigo
        snow: "#F9FAFB", // Neutral light gray for section backgrounds
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
