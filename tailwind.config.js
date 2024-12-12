/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {

      colors: {
        'dark-blue': '#00008B',
        'darker-blue': '#002453',
        'teal': '#2E8B57',
        'sea-green': '#2E8B57',
        'spring-green': '#00FF7F',
        'lime-green': '#00FF00',
        'nav-color': '#1e293b'
      },
      spacing: {
        '5.5': '22px',
      },
      backgroundImage: {
        'gray-pattern': "url('/images/gray.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}