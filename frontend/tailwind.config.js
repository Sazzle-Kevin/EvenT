/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "satin-grey": "#636367",
        "beige": "#DDC49A",
        "olive": "#8A9A76",
      },
    },
  },
  plugins: [],
};
