/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      gridTemplateRows: {
        blank: "min-content auto min-content",
      },
    },
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      font: "rgba(255, 255, 255, 0.5)",
      border: "rgba(255, 255, 255, 0.1)",
      blue: {
        300: "#93c5fd",
      },
    },
  },
  plugins: [],
};
