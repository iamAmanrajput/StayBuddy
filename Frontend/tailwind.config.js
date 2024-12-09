import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: "#D8A54D",
        navyBlue: "#1D232A",
      },
    },
  },
  plugins: [daisyui],
};
