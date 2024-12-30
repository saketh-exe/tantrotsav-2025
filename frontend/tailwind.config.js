import { keyframes } from "framer-motion";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class";
export const theme = {
  extend: {
    screens: {
      md: "950px",
      "hide-img": { min: "950px", max: "1250px" }, // Change the 'md' breakpoint to 900px
    },
  },
};
export const plugins = [
  require("tailwind-scrollbar-hide"),
  addVariablesForColors, // Custom plugin for CSS variables
];

// Custom plugin to add CSS variables for colors
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
