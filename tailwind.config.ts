import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        abrilFatface: ["var(--font-abrilFatface)"],
        circularStd: ["var(--font-circularStd)"],
      },
      colors: {
        tib: {
          black: "#000000",
          white: "#FFFFFF",
          blue: "#406EFF",
          red: "#BB0C0C",
          purple: "#260060",
          "light-purple": "#F5EEFF",
          "light-yellow": "#FFF9ED",
          "light-blue": "#F1F5FF",
          "light-border": "#C2C2C2",
          primary: "#474444",
          primary2: "#696767",
        },
      },
    },
  },
};
export default config;
