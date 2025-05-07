/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // <-- This avoids class name conflicts
  content: ["./dist/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
