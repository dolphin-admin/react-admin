/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  /**
   * 禁用 preflight 样式解决与 antd 样式冲突问题
   * @see https://github.com/ant-design/ant-design/issues/38794
   */
  corePlugins: {
    preflight: false
  },
  darkMode: ['class', '[data-theme="dark"]']
}
