/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        copper: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
      backgroundImage: {
        'elegant-dark': 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
        'copper-glow': 'radial-gradient(circle, rgba(191,160,148,0.1) 0%, rgba(26,26,26,0) 70%)',
      },
    },
  },
  plugins: [],
}

