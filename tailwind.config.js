/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        yellow: "#f8d49a",
        lightYellow: "#fad79d",
        orange: "#fca61f",
        primary: "#ff919d",
        primaryDark: "#28282C",
        primaryLight: "#f799a354",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
