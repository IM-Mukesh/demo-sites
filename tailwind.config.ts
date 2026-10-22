import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#20211E",
        paper: "#F5F3ED",
        stone: "#D8D3C8",
        taupe: "#A79B87",
        olive: "#78816D",
        charcoal: "#343630",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 24px 80px rgba(32, 33, 30, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
