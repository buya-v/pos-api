/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A', // Deep Navy
        accent: '#3B82F6',  // Electric Blue
        success: '#10B981', // Emerald
        error: '#EF4444',   // Red
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        md: '6px',
      }
    },
  },
  plugins: [],
}