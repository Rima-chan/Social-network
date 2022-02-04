const plugin = require("tailwindcss/plugin");

module.exports = {
  mod: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
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
  plugins: [
    // plugin(function ({ addVariant, e }) {
    //   addVariant("invalid", ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`invalid${separator}${className}`)}: invalid`;
    //     });
    //   });
    // }),
    // ,
    // plugin(function ({ addVariant, e }) {
    //   addVariant("valid", ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`valid${separator}${className}`)}: valid`;
    //     });
    //   });
    // }),
  ],
};
