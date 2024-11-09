/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*/*.{js,jsx,ts,tsx}", // Include all JS/JSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'secondaryColor': "#FFA52F",
        'thirdColor':'#232321',
        'hoverColor':"#30302D",
        "blueColor":"#4A69E2",
        "sizeColor":"#707E6E",
        "secondaryBlue":'#4A69E2'
      },
      "fontSize":{
        "12xl":"12rem"
      },
      borderWidth:{
        "5":".4rem"
      }
    },
  },
  plugins: [],
};
