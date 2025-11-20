/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Upwork-inspired colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#14a800', // Upwork green
          600: '#108a00',
          700: '#0d6b00'
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5', // Upwork light gray
          500: '#374151',
          600: '#1f2937',
          700: '#111827' // Upwork dark gray
        },
        accent: {
          500: '#00bfa5', // Upwork teal accent
          600: '#00a894'
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;