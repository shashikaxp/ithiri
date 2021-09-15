const { join } = require('path');

module.exports = {
  purge: [join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}')],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: "'Source Sans Pro'",        
      },
      colors: {
        primary: {
          light: '#F0F2FF',
          DEFAULT:'#4454E4',
          dark: '#4454E4',
        },
        text: {
          light: '#4E4E4E',
          DEFAULT: '#000000'
        },
        gray: {
          DEFAULT: '#E5E5E5'
        },
        green: {
          light: "rgba(53, 188, 83, 0.37)",
          DEFAULT: "rgba(53, 188, 83, 0.63)"
        },
        red: {
          light: "rgba(246, 53, 53, 0.37)",
          DEFAULT: "rgba(246, 53, 53, 0.63)"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}



