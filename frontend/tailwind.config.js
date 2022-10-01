/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus"],
      borderColor: ["responsive", "hover", "focus"],
      display: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
