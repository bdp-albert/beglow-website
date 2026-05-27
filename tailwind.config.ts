import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#050505",
        graphite: "#101113",
        ash: "#d8d4c8",
        champagne: "#d9b778",
        pearl: "#f4f0e6",
        steel: "#8aa0aa",
        brand: "#ef1016"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(217, 183, 120, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
