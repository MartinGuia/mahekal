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
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth: "thin", 
          scrollbarColor: "rgb(31 29 29) white"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar" : {
            width: "8px",
          },
          "&::webkit-scrollbar-track" : {
            background: "white"
          },
          "&::webkit-scrollbar-thumb" : {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid whithe",
          },
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

