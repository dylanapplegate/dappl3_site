/** @type {import('tailwindcss').Config} */
const colors = require("./tailwind_figma_tokens.json").global.color;

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
