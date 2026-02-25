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
        'blue-custom': '#00275E',
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
        'gradient-gold': 'linear-gradient(135deg, #D5AD36 0%, #E8C547 50%, #FAF0E0 100%)',
        'gradient-gold-soft': 'linear-gradient(135deg, rgba(201,169,120,0.08) 0%, rgba(213,173,54,0.12) 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(201, 169, 120, 0.05) 0%, rgba(24, 31, 101, 0.8) 50%, rgba(201, 169, 120, 0.04) 100%)',
      },
      keyframes: {
        'partner-scroll': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'partner-scroll': 'partner-scroll 25s linear infinite',
      },
    },
  },
  plugins: [],
}

