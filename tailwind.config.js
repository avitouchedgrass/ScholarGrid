/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        zinc: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
        },
        cyan: {
          400: '#00F0FF',
          500: '#00D8E6',
        },
        yellow: {
          400: '#FFE600',
        },
        red: {
          400: '#FF4D4D',
          500: '#EF4444',
        }
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        sans: ['Albert Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
