import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
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
      colors: {
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
        },
      },
    },
  },
  plugins: [
        require('@tailwindcss/forms'),
  ],
};
