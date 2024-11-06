/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        delius: ['Delius', 'sans-serif'],
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
}

function addVariablesForColors({ addBase, theme }) {
  const flattenColorPalette = (colors) => {
    let flatColors = {};
    Object.keys(colors).forEach((key) => {
      const value = colors[key];
      if (typeof value === 'object') {
        Object.keys(value).forEach((shade) => {
          flatColors[`${key}-${shade}`] = value[shade];
        });
      } else {
        flatColors[key] = value;
      }
    });
    return flatColors;
  };

  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

