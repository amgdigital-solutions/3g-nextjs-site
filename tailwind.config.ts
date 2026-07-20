import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#E8EDF2",
          100: "#C5D1E0",
          200: "#9BB2C8",
          300: "#7193AF",
          400: "#4F7B9C",
          500: "#2D638A",
          600: "#26597D",
          700: "#1F4D6F",
          800: "#1E3A5F",
          900: "#172B47",
          950: "#0F1D30",
        },
        gold: "#C9A84C",
        cream: "#F5F0E8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
