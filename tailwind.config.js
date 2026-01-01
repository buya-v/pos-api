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
          primary: 'var(--brand-primary)',
        },
        status: {
          error: 'var(--status-error)',
          success: 'var(--status-success)',
        },
        surface: {
          bg: 'var(--surface-bg)',
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
      },
      spacing: {
        md: 'var(--spacing-md)',
      },
      fontFamily: {
        main: ['var(--font-main)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}