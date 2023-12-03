/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        muted: '#999999'
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]']
}
