/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          linkedin: {
            50: '#F0F8FF',
            100: '#E1F0FF',
            200: '#C3E0FF',
            300: '#A5D0FF',
            400: '#87C0FF',
            500: '#0A66C2', 
            600: '#0073B1', 
            700: '#005885',
            800: '#003D5A',
            900: '#002233',
          }
        }
      },
    },
    plugins: [],
  }