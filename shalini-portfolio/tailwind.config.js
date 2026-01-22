/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontSize: {
  hero: ["3.75rem", { lineHeight: "1.1" }],
  h1: ["2.5rem", { lineHeight: "1.2" }],
  h2: ["2rem", { lineHeight: "1.3" }],
  body: ["1rem", { lineHeight: "1.7" }],
  small: ["0.875rem", { lineHeight: "1.6" }],
},

      colors: {
        background: "#0b0f19",
        foreground: "#e5e7eb",
        muted: "#9ca3af",
        accent: "#6366f1",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

