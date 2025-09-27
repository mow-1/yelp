/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette mapped to existing theme
        brand: {
          blue: {
            900: '#1E2A44',
            800: '#2A4066'
          },
          yellow: {
            400: '#FFC107'
          },
          red: {
            500: '#D32F2F',
            600: '#B71C1C'
          },
          cream: '#F5E8C7'
        }
      }
    }
  },
  plugins: []
};


