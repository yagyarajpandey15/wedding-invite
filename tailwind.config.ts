import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        burgundy: {
          50: "#fdf6f7",
          100: "#fbebee",
          200: "#f6d8dc",
          300: "#eeb4be",
          400: "#e18495",
          500: "#cf576f",
          600: "#b53752",
          700: "#94253e",
          800: "#741b2c",
          850: "#681622",
          900: "#55131f",
          950: "#34070f",
        },
        paper: {
          light: "#FAF8F5",
          warm: "#F5F1EB",
          linen: "#ECE7E0",
          cream: "#F7F4EE",
        },
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      boxShadow: {
        paper: "0 4px 20px -2px rgba(45, 25, 20, 0.08), 0 2px 6px -1px rgba(45, 25, 20, 0.04)",
        card: "0 20px 40px -15px rgba(50, 20, 25, 0.15)",
        seal: "0 6px 14px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
