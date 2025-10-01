import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      colors: {
        bg: "#f7f9fc",
        fg: "#0f172a",
        muted: "#475569",
        acc: "#2563eb",
      },
      fontFamily: { display: ["Inter", "system-ui", "sans-serif"] },
      boxShadow: {
        glow: "0 0 40px rgba(37,99,235,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
