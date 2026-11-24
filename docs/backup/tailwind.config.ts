import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f8fc",
        butter: "#fff0a6",
        taupe: "#dce8f5",
        espresso: "#1e3557",
        ink: "#111622",
        night: "#0b0f17",
        "night-surface": "#141b28",
        "night-elevated": "#1a2436",
        "night-hover": "#233047",
        coral: "#ffb4a2",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
        "surface-hover": "rgb(var(--color-surface-hover) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "'Be Vietnam Pro'", "sans-serif"],
        sans: ["var(--font-dm-sans)", "'DM Sans'", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
      screens: {
        desktop: "1200px",
        wide: "1400px",
      },
      maxWidth: {
        site: "1440px",
      },
      borderRadius: {
        "card-sm": "18px",
        card: "20px",
        "card-lg": "28px",
        sheet: "32px",
      },
      letterSpacing: {
        eyebrow: "0.06em",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        card: "0 10px 30px -15px rgba(17, 22, 34, 0.14)",
        "card-hover": "0 20px 40px -15px rgba(17, 22, 34, 0.22)",
        float: "0 18px 42px -12px rgba(17, 22, 34, 0.28)",
        modal: "0 28px 70px -16px rgba(5, 8, 15, 0.55)",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("butter", ".theme-butter-card &");
      addVariant("vi", 'html[data-lang="vi"] &');
    }),
  ],
};
export default config;
