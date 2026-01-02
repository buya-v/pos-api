/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        error: '#D32F2F',
        warning: '#FFA000',
        success: '#388E3C',
      },
      fontFamily: {
        main: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        active: '0 2px 8px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}