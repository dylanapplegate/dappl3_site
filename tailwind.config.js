/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-gray": {
          50: "#eae6e0",
          100: "#e1ddd7",
          200: "#d9d3cc",
          300: "#d4cbc2",
          400: "#cfc3b6",
          500: "#c6bdb5",
          600: "#b0a59b",
          700: "#8e7f73",
        },
        "hot-pink": {
          50: "#FFF0F8",
          100: "#FFD6EB",
          200: "#FFB3D6",
          300: "#FF8FC1",
          400: "#FF5FA9",
          500: "#FF2D88",
          600: "#E60073",
          700: "#CC0066",
          800: "#99004D",
          900: "#660033",
        },
        "hot-blue": {
          50: "#F0F7FF",
          100: "#CCE5FF",
          200: "#99CCFF",
          300: "#66B2FF",
          400: "#3399FF",
          500: "#007BFF",
          600: "#0066CC",
          700: "#0052A3",
          800: "#003D7A",
          900: "#00264D",
        },
        "hot-purple": {
          50: "#F7F0FF",
          100: "#E6D6FF",
          200: "#D1B3FF",
          300: "#BA8CFF",
          400: "#A366FF",
          500: "#8A2BE2",
          600: "#7A1FD1",
          700: "#6619AA",
          800: "#4D1380",
          900: "#330D55",
        },
      },
    },
  },
  plugins: [typography],
};
