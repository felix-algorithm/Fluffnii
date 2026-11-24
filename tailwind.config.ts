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
        "coral-soft": "#ffd7cd",
        "espresso-deep": "#12223a",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-alt": "rgb(var(--color-surface-alt) / <alpha-value>)",
        "surface-hover": "rgb(var(--color-surface-hover) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--color-fg-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        hairline: "rgb(var(--color-hairline) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "'Be Vietnam Pro'", "sans-serif"],
        sans: ["var(--font-dm-sans)", "'DM Sans'", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
      fontSize: {
        "fluid-hero": [
          "clamp(2.75rem, 6.8vw, 6.5625rem)",
          { lineHeight: "0.94", letterSpacing: "-0.02em" },
        ],
        "fluid-hero-vi": [
          "clamp(2.35rem, 6vw, 5.75rem)",
          { lineHeight: "1.18", letterSpacing: "-0.015em" },
        ],
        "fluid-section": [
          "clamp(2rem, 4.6vw, 4.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
        "fluid-section-vi": [
          "clamp(1.8rem, 4.2vw, 3.75rem)",
          { lineHeight: "1.18", letterSpacing: "-0.015em" },
        ],
        "fluid-sub": [
          "clamp(1.25rem, 2.2vw, 1.875rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
        ],
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
        "tight-display": "-0.03em",
        "tight-vi": "-0.015em",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.22, 1, 0.36, 1)",
        curtain: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      boxShadow: {
        card: "0 10px 30px -15px rgba(17, 22, 34, 0.14)",
        "card-hover": "0 20px 40px -15px rgba(17, 22, 34, 0.22)",
        float: "0 18px 42px -12px rgba(17, 22, 34, 0.28)",
        modal: "0 28px 70px -16px rgba(5, 8, 15, 0.55)",
        curtain: "0 -26px 84px -22px rgba(30, 53, 87, 0.45)",
        "curtain-dark": "0 -28px 90px -24px rgba(255, 240, 166, 0.22)",
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
