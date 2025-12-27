/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
   darkMode: "class", // REQUIRED for manual toggle
  theme: {
    extend: {},
  },
  plugins: [],
};
