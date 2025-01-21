/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightblue: {
          25: "58ADF2",
          50: '#F1F7FF',
          100: '#E2F0FF',
          200: '#6AA6FF',
          250: '#B6D5F9'
        },
        lightgray: {
          50: '#DFDFDF',
          100: '#D2D2D2',
          150: '#E6E6E6',
          200: '#A3A3A3',
          250: '#D9D9D9',
          300: '#C8C8C8',
          400: '#6D6C6C',
        }
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#E2F0FF",
          "link": "4a00ff",
          "info-content": "FFFFFF",
          "secondary": "F1F7FF",
          "base-100": "FFFFFF",
          "base-200": "E6E6E6",
          "hov": "D9D9D9",
          "accent": "#6AA6FF",
          "neutral": "DFDFDF",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#4A535C",
          "primary-content": "#FFFFFF",
          "secondary-content": "#FFFFFF",
          "link": "4a00ff",
          "info-content": "FFFFFF",
          "secondary": "2A2E32",
          "base-100": "2A2E32",
          "base-200": "D1D1D6",
          "base-300": "7C8188",
          "accent": "#376CDF",
          "accent-content": "#FFF9F9",
          "neutral": "898989",
          "base-content": "#FFFFFF",
        },
      },
    ],
  },
  darkMode: ['selector', '[data-theme="dark"]'],
};