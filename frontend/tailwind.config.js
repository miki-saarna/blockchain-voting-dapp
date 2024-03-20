/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f5f2eb",
        zest: "#ffc000",
        teal: "#00c2b8",
        sage: {
          dark: "#04454d",
          light: "#BCB88A",
          DEFAULT: "#4c797c",
        },
      },
    },
  },
  plugins: [],
}

