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
        "light-bone": "#F6F5F0",
        "mahekal-brown": "#614F25",
      }
    },
  },
  
}

