import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#232429FF",
        secondary: "#232429",
        neutral: "#cdb30c",
      },
      screens: {
        lg: "1082px",
      },
    },
  },
  plugins: [],
};
export default config;
