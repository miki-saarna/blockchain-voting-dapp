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
        darkSage: "#4c797c",
        sage: "#BCB88A"
      },
    },
  },
  plugins: [],
}

