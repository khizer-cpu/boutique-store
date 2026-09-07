import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1c1a",
        ivory: "#f6f3ec",
        burgundy: "#6b2737",
        clay: "#b8935f",
        sage: "#8a9a80",
        line: "#dedad0"
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Work Sans'", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.25em"
      }
    }
  },
  plugins: []
};

export default config;
