/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        "water-blue" : "#2CCCD3",
        "water-blue-hover" : "#31b5ba",
        "light-bone": "#F6F5F0",
        "mahekal-brown": "#614F25",
        "mahekal-input": "#e2e8f0"
      }
    },
  },
  plugins: [],
}

