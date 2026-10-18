/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#800020',
          dark: '#4a0012',
          light: '#a0304a',
        },
        'rose-gold': {
          DEFAULT: '#b76e79',
          light: '#d4a0a7',
          dark: '#8a4a54',
        },
        cream: '#fef0e4',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

