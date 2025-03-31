const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Light Mode Color Palette
        primary: {
          DEFAULT: "#3B82F6", // Vibrant Light Blue
          50: "#EBF5FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        // Dark Mode Color Palette
        dark: {
          primary: {
            DEFAULT: "#5E81F7", // Softer, slightly lighter blue for dark mode
            50: "#1A2238", // Darkest background
            100: "#253049",
            200: "#2F3D5A",
            300: "#3A4B6B",
            400: "#45597C",
            500: "#5E81F7", // Main dark mode primary
            600: "#7094F9",
            700: "#8CAAFB",
            800: "#A9C0FD",
            900: "#C5D6FF",
          },
          secondary: {
            DEFAULT: "#4A90E2", // Complementary dark mode blue
            50: "#1E2530",
            100: "#2A3341",
            200: "#364152",
            300: "#424F63",
            400: "#4E5D74",
            500: "#4A90E2",
            600: "#6AA3E8",
            700: "#86B6EE",
            800: "#A2C9F4",
            900: "#BEDCFA",
          },
          background: {
            DEFAULT: "#121826", // Deep dark background
            secondary: "#1E2433", // Slightly lighter for cards/sections
            tertiary: "#283140", // Even lighter for subtle differentiation
          },
          text: {
            DEFAULT: "#E0E6ED", // Light text for dark backgrounds
            muted: "#8F9BAE", // Muted text color
            inverse: "#FFFFFF", // Completely white for highest contrast
          },
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      boxShadow: {
        subtle: "0 2px 4px rgba(94, 129, 247, 0.1)", // Dark mode shadow
        medium: "0 4px 6px rgba(94, 129, 247, 0.15)",
        dark: "0 2px 8px rgba(0, 0, 0, 0.2)", // Deeper shadow for dark mode
      },
      backgroundColor: {
        dark: {
          primary: "#121826",
          secondary: "#1E2433",
          tertiary: "#283140",
        },
      },
      textColor: {
        dark: {
          primary: "#E0E6ED",
          secondary: "#8F9BAE",
          inverse: "#FFFFFF",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
