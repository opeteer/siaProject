/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        usd: {
          navy: '#0E2A47',
          'navy-dark': '#091c30',
          'navy-light': '#163B63',
          'navy-surface': '#1E3A5F',
          gold: '#F5A623',
          'gold-light': '#FEF3C7',
          'gold-dark': '#D48810',
          'gold-accent': '#FDE68A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
