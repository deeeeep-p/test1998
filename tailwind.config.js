/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const { color } = require("framer-motion");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      backgroundImage: {
        "custom-gradient":
          " radial-gradient(circle at left bottom, #0572a8 , #05202e)",
      },
    },
    color: {
      "medium-purple": "#885add",
      "deep-cove": "#080842",
      "east-bay": "#424286",
      jacarta: "#2e2d6f",
      manatee: "#898e9f",
      "san-juan": "#374471",
      "mulled-wine": "#4b4e6d",
      lynch: "#7984a0",
      "royal-purple": "#543bac",
      "black-pearl": "#040417",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
