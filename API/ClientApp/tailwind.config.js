/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        112: "28rem",
        140: "35rem",

        screenWithoutNavbar: "calc(100vh - 4rem)",
      },
      width: {
        75: "18.75rem",
        100: "25rem",
        112: "28rem",
        125: "31.25rem",
        200: "50rem",
        175: "43.75rem",
      },
      minHeight: {
        screenWithoutNavbar: "calc(100vh - 4rem)",
        109: "27.25rem",
      },
      padding: {
        100: "25rem",
      },
      spacing: {
        105: "26.25rem",
      },
    },
  },
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{vue,jsx,tsx,ts,js}",
    // etc.
  ],
};
