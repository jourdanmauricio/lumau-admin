/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-color': 'var(--bg-color)',
        'dark-bg-color': 'var(--dark-bg-color)',
        'text-color': 'var(--text-color)',
        'dark-text-color': 'var(--dark-text-color)',
      },
    },
  },
  plugins: [],
};
