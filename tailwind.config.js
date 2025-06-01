/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Incluye todos los archivos dentro de src
    "./public/**/*.html",         // Opcional: incluye archivos HTML en public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};