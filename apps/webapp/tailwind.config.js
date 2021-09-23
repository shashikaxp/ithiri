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
          DEFAULT:'#6C63FF',
          dark: '#6C63FF',
        },
        text: {
          light: '#4E4E4E',
          DEFAULT: '#4E4E4E'
        },      
        background: {
          DEFAULT: '#efefef'
        },
        green: {
          light: "rgba(53, 188, 83, 0.37)",
          DEFAULT: "rgba(53, 188, 83, 0.63)"
        },
        red: {
          light: "rgba(246, 53, 53, 0.37)",
          DEFAULT: "rgba(246, 53, 53, 0.63)"
        }
      }, 
      gridTemplateColumns: {
        'auto': ' repeat(auto-fit, 250px);',
        'shopping-list': '3fr repeat(4, 1fr);',
      }
    },
  },
  variants: {
    extend: {
      margin: ['last']
    },
  },
  plugins: [],
}



