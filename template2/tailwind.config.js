/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#050B23',
        gold: '#C9A978',
        'gold-bright': '#FFD447',
        offwhite: '#F5F2EA',
        text: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A978 0%, #FFD447 100%)',
        'gradient-gold-soft': 'linear-gradient(135deg, rgba(201, 169, 120, 0.1) 0%, rgba(255, 212, 71, 0.1) 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(201, 169, 120, 0.05) 0%, rgba(255, 212, 71, 0.05) 100%)',
      },
    },
  },
  plugins: [],
}

