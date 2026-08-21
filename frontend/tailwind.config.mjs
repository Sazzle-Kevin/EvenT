/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Wichtig für Dark Mode Toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deine Farben
        "satin-grey": "#636367",
        "beige": "#DDC49A",
        "olive": "#8A9A76",
      },
    },
  },
  plugins: [],
};
