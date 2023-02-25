/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A4B52',
        'primary-light': '#949497',
        'primary-blue': '#47B5FF',
        'primary-blue-light': 'rgba(0, 102, 255, 0.1)',
        'primary-blue-dark': '#20A5FF',
        secondary: '#5F5D64',
        'secondary-light': '#8A8F96',
        'secondary-more-light': '#BBBBC1',
        'primary-gray': '#f9f9f9',
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
  plugins: [require('@tailwindcss/line-clamp')]
}
