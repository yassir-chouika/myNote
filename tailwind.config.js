/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        space: [""],
      },

      colors: {
        skyTeal: "#7EE4EC",
        midnightBlue: "#114B5F",
        steelBlue: "#456990",
        coralPink: "#F45B69",
        softPeach: "#FFD4CA",
      },
    },
  },
  plugins: [],
};
