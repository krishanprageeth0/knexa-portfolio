/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030303',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1c1c1c',
          600: '#252525'
        },
        electric: {
          DEFAULT: '#087f8c',
          light: '#0a9bb0',
          dark: '#055d67'
        },
        gold: {
          DEFAULT: '#f37021',
          light: '#f68f51',
          dark: '#c7540f'
        },
        magenta: {
          DEFAULT: '#d61a7a',
          light: '#e24497',
          dark: '#a20f59'
        },
        silver: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
          dark: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
