/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB', // Blue 600
        },
        status: {
          success: '#10B981', // Emerald 500
          error: '#EF4444', // Red 500
          warning: '#F59E0B', // Amber 500
        },
        bg: {
          main: '#F9FAFB', // Gray 50
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        md: '6px',
      }
    },
  },
  plugins: [],
}