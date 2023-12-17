/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        // boratBg: "#e3dcc2",
      },
      height: {
        112: "28rem",
        screenWithoutNavbar: "calc(100vh - 4rem)",
      },
      minHeight: {
        screenWithoutNavbar: "calc(100vh - 4rem)",
      },
      keyframes: {
        homeImageMoveIn: {
          "0%": { transform: "translatey(0) translatex(0)" },
          "25%": { transform: "translatey(100px) translatex(25px)" },
          "50%": { transform: "translatey(175px) translatex(40px)" },
          "75%": { transform: "translatey(250px) translatex(100px)" },
          "100%": { transform: "translatey(400px) translatex(250px)" },
          // from: { transform: "translatey(0) translatex(0)" },
          // to: { transform: "translatey(400px) translatex(200px)" },
        },
        homeImageMoveOut: {
          "0%": { transform: "translatey(0) translatex(0)" },
          "25%": { transform: "translatey(100px) translatex(25px)" },
          "50%": { transform: "translatey(175px) translatex(40px)" },
          "75%": { transform: "translatey(250px) translatex(100px)" },
          "100%": { transform: "translatey(400px) translatex(250px)" },
          // from: { transform: "translatey(400px) translatex(200px)" },
          // to: { transform: "translatey(0) translatex(0)" },
        },
      },
      animation: {
        home_image_move_in: "homeImageMoveIn 3s linear forwards",
        home_image_move_out: "homeImageMoveOut 2s linear forwards",
      },
    },
  },
  plugins: [],
};
