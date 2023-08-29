/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "emerald", "fantasy", "corporate", "cmyk"],
  },
  plugins: [
    require("daisyui")
  ],
}
