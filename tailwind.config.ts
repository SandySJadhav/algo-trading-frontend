import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "master-blue": "#6873e0",
        "master-pink": "#ff8081",
      },
      textColor: {
        "master-blue": "#6873e0",
        "master-pink": "#ff8081",
      },
      boxShadow: {
        master: "0 .5rem 1rem rgba(0,0,0,.15)",
      },
      fill: {
        "master-blue": "#6873e0",
        "master-pink": "#ff8081",
      },
    },
  },
  plugins: [],
};
export default config;
