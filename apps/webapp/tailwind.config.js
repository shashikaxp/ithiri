const { join } = require('path');

module.exports = {
  purge: {
    content: [
      join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
      join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    ],
    safelist: ['bg-red-light', 'bg-red', 'bg-green-light', 'bg-green'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: "'Source Sans Pro'",
        secondary: "'Grand Hotel'",
      },
      backgroundImage: {
        store: "url('../assets/img/store.jpg')",
      },
      colors: {
        primary: {
          light: '#E1F5FE',
          DEFAULT: '#0277BD',
          dark: '#01579B',
        },
        text: {
          light: '#4E4E4E',
          DEFAULT: '#4E4E4E',
        },
        background: {
          DEFAULT: '#efefef',
        },
        green: {
          light: 'rgba(53, 188, 83, 0.37)',
          DEFAULT: 'rgba(53, 188, 83, 0.63)',
        },
        red: {
          light: 'rgba(246, 53, 53, 0.37)',
          DEFAULT: 'rgba(246, 53, 53, 0.63)',
        },
      },
      gridTemplateColumns: {
        auto: ' repeat(auto-fit, 250px);',
        'shopping-list': '3fr repeat(4, 1fr);',
        'shopping-list-mobile': '4fr repeat(3, 1fr);',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  plugins: [],
};
