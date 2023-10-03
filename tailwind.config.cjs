/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        muted: '#999999'
      },
      backgroundColor: {
        'layout-light': '#F5F6F7',
        'layout-dark': '#0F0F0F',
        'default-light': '#FEFEFE',
        'default-dark': '#141414'
        // 'default-dark': '#36393F'
      }
    }
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
}
