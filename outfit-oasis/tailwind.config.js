/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Italiana', 'sans-serif'], // Replace 'Roboto' with your Google Font
    },},
  },
  plugins: [],
}

