/** @type {import('tailwindcss').Config} */
import tokens from "./tokens.json";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tokens.global.colors,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
