/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ye line Tailwind ko batati hai ki classes kahan check karni hain
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
    },
  },
  plugins: [],
}