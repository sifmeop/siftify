/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A4B52',
        'primary-blue': '#47B5FF',
        secondary: '#5F5D64',
        'secondary-light': '#8A8F96',
        'secondary-more-light': '#BBBBC1',
        tertiary: '#B5B5B9',
        border: '#606065'
      },
      maxWidth: {
        'header-width': '21.875rem'
      },
      margin: {
        'header-width': '21.875rem'
      }
    }
  },
  plugins: []
}
