/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"']
      },
      colors: {
        dark: {
          DEFAULT: '#121212',
          SECONDARY: '#1c1c1c',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

