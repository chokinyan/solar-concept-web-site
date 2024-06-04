/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./solar_concept/**/*.{html,js}"],
  prefix : "tw-",
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
  }
  ],
}

