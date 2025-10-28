/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We can add our custom 'Bangladesh' theme colors here later
      colors: {
        'bangla-green': {
          DEFAULT: '#006A4E', // A common green from the flag
          light: '#018f69',
          dark: '#004d38',
        },
        'bangla-red': '#F42A41', // A common red from the flag
      }
    },
    fontFamily: {
      // Setting a clean, readable default
      sans: ['"Inter"', 'system-ui', 'sans-serif'],
      // We could add a Bangla font like 'Hind Siliguri' later
    }
  },
  plugins: [
    require('@tailwindcss/typography'), // For styling the blog/animal descriptions
  ],
}