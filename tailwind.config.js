/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Escala de radios de esquina (mantener consistencia en toda la web):
      // - rounded-md   (6px)  → enlaces de navegación
      // - rounded-xl   (12px) → elementos anidados pequeños (iconos, inputs, badges)
      // - rounded-2xl  (16px) → tarjetas y paneles
      // - rounded-3xl  (24px) → bloques grandes destacados (CTAs, formularios)
      // - rounded-full        → botones, píldoras y elementos circulares
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
