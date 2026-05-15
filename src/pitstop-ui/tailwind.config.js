/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        accent: "#f97316",
        secondary: "#0f172a",
        success: "#16a34a",
        danger: "#dc2626",
        light: "#f1f5f9",
        dark: "#0f172a",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  corePlugins: {
    preflight: false,
  },
};
