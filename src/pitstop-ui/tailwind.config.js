/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          fg: "var(--brand-fg)",
          hover: "var(--brand-hover)",
          tint: "var(--brand-tint)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          sunken: "var(--surface-sunken)",
          inverse: "var(--surface-inverse)",
        },
        content: {
          DEFAULT: "var(--content)",
          muted: "var(--content-muted)",
          inverse: "var(--content-inverse)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        // Legacy tokens — kept until existing usages migrate.
        primary: "#1d4ed8",
        accent: "#f97316",
        secondary: "#0f172a",
        success: "#16a34a",
        danger: "#dc2626",
        light: "#f1f5f9",
        dark: "#0f172a",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "page-title": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "section-title": ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "kpi": ["2.5rem", { lineHeight: "1", fontWeight: "600" }],
        "meta": ["0.75rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  corePlugins: {
    preflight: false,
  },
};
