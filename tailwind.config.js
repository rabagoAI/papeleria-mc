/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rojo: '#C0392B',
        dorado: '#D4A017',
        marino: '#1B2A4A',
        crema: '#FAF8F5',
        verde: '#2E7D52',
        'gris-suave': '#F0EDE8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
