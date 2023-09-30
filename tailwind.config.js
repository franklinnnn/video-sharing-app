/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["Fira Sans"],
    },
    extend: {
      colors: {
        primary: "#0f2180",
        accent: "#b70e7a",
        "primary-light": "#0c056d",
        "primary-dark": "#0c056d",
        "gray-1": "#e6e6e6",
        "gray-2": "#cccccc",
        "main-light": "#fdfdfe",
        "main-dark": "#020201",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
