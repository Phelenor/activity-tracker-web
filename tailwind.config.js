/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#515B92",
          on: "#FFFFFF",
          container: "#DEE0FF",
          onContainer: "#0A154B",
        },
        secondary: {
          light: "#5B5D72",
          on: "#FFFFFF",
          container: "#DFE1F9",
          onContainer: "#171A2C",
        },
        tertiary: {
          light: "#76546D",
          on: "#FFFFFF",
          container: "#FFD7F2",
          onContainer: "#2D1228",
        },
        error: {
          light: "#BA1A1A",
          on: "#FFFFFF",
          container: "#FFDAD6",
          onContainer: "#410002",
        },
        background: {
          light: "#FBF8FF",
          on: "#1B1B21",
        },
        surface: {
          light: "#FBF8FF",
          on: "#1B1B21",
          variant: "#E3E1EC",
          onVariant: "#46464F",
          dim: "#DBD9E0",
          bright: "#FBF8FF",
          lowest: "#FFFFFF",
          low: "#F5F2FA",
          default: "#EFEDF4",
          high: "#E9E7EF",
          highest: "#E3E1E9",
        },
        outline: {
          light: "#767680",
          variant: "#C6C5D0",
        },
        scrim: {
          light: "#000000",
        },
        inverse: {
          surface: "#303036",
          onSurface: "#F2F0F7",
          primary: "#BAC3FF",
        },
      },
    },
  },
  plugins: [],
};
