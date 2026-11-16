import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f8fc",
        butter: "#fff0a6",
        taupe: "#dce8f5",
        espresso: "#1e3557",
        ink: "#111622",
      },
      fontFamily: {
        display: ["'Stagheiz'", "sans-serif"],
        sans: ["var(--font-dm-sans)", "'DM Sans'", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
