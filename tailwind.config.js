import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
        mono: [
          "JetBrains Mono",
          "Monaco",
          "Menlo",
          "Ubuntu Mono",
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  plugins: [],
};
