/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "murshidi-sky-blue": "#1DA1F2",
        "murshidi-purple": "#6C5CE7",
        "murshidi-light-blue": "#E6F4FF",
        "murshidi-light-purple": "#F1E8FF"
      }
    }
  },
  plugins: []
};
