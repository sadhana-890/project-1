/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // very important for Next.js app router
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
