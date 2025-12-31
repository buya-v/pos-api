/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        blue: {
          600: '#2563EB',
        },
        green: {
          600: '#16A34A',
        },
        orange: {
          600: '#EA580C',
        },
        red: {
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}