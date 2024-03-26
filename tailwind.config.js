/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Generated by https://www.tailwindshades.com/
        brand: {
          DEFAULT: "#4DABF7",
          50: "#FDFEFF",
          100: "#E9F5FE",
          200: "#C2E2FC",
          300: "#9BD0FB",
          400: "#74BDF9",
          500: "#4DABF7",
          600: "#1792F5",
          700: "#0974CB",
          800: "#075595",
          900: "#04375F",
          950: "#032744",
        },
      },
    },
  },
  plugins: [],
};
