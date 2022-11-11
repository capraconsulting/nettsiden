module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Source Sans Pro'", "sans-serif"],
      serif: ["'Source Sans Pro'", "serif"],
      monospace: ["monospace"],
    },
    extend: {
      spacing: {
        "nav-height": "72px",
      },
      screens: {
        desktop: "1200px",
        xl: "1360px",
      },
      colors: {
        red: {
          DEFAULT: "#f2665c",
          light: "#fde9e7",
          darker: "#f2665c",
        },
        blue: {
          DEFAULT: "#3289d1",
          lighter: "#e6f4ff",
          light: "#c1dce5",
          dark: "#1d7fcf",
          darker: "#303145",
        },
        azureRadiance: "#1184e3",
        mariner: "#2878ba",
        "east-bay": "#424785",
        green: {
          light: "#edf6f4",
          darker: "#88c9b6",
        },
        "minty-breeze": "#d1e8cd",
        "cannon-pink": "#8d475a",
        white: "#fff",
        grey: {
          DEFAULT: "#333333",
          light: "#a2a2a2",
          dark: "#2d2d2d",
        },
        yellow: "#ffdf77",

        // Typography
        ingress: "#3d3d3d",
        brodtext: "#2b2b2b",
        header: "#333",

        // New colors
        main: {
          DEFAULT: "#fd414d",
          darker: "#e63b47",
        },
        secondary: {
          DEFAULT: "#001641",
          80: "#334467",
          60: "#66738d",
          40: "#99a2b3",
          20: "#ccd0d9",
          7: "#edeff2",
        },
        peach: {
          DEFAULT: "#ffd2b9",
          50: "#ffe8dc",
          20: "#fff6f1",
        },
        "light-blue": {
          DEFAULT: "#bbdde6",
          50: "#ddeef2",
          20: "#f1f8fa",
        },
        bordeaux: {
          DEFAULT: "#651d32",
          80: "#844a5b",
          50: "#b28e98",
          20: "#e0d2d6",
        },
        background: "#fdfdfc",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
