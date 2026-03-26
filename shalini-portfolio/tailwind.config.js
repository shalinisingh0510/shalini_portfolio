/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        hero: ["3.75rem", { lineHeight: "1.05" }],
        h1: ["2.75rem", { lineHeight: "1.15" }],
        h2: ["2rem", { lineHeight: "1.3" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
      },
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dim": "rgb(var(--accent-dim) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "surface-lowest": "rgb(var(--surface-lowest) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px rgb(var(--accent) / 0.25)",
        soft: "0 8px 30px rgba(0, 0, 0, 0.4)",
        "liquid-ambient": "0 40px 80px rgba(0, 0, 0, 0.5)",
      },
      transitionTimingFunction: {
        'liquid': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        'fluid': '85% 15% 75% 25% / 30% 70% 30% 70%',
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        liquidMorph: {
          "0%, 100%": { borderRadius: "85% 15% 75% 25% / 30% 70% 30% 70%" },
          "50%": { borderRadius: "30% 70% 70% 30% / 75% 30% 85% 15%" },
        },
        float3D: {
          "0%, 100%": { transform: "translateY(0) rotateX(0) rotateY(0)" },
          "25%": { transform: "translateY(-15px) rotateX(5deg) rotateY(10deg)" },
          "50%": { transform: "translateY(-30px) rotateX(-5deg) rotateY(-10deg)" },
          "75%": { transform: "translateY(-15px) rotateX(10deg) rotateY(5deg)" },
        },
        aurora: {
          "0%, 100%": { transform: "scale(1) translate(0, 0) rotate(0deg)" },
          "33%": { transform: "scale(1.2) translate(5vw, -5vh) rotate(5deg)" },
          "66%": { transform: "scale(0.9) translate(-5vw, 5vh) rotate(-5deg)" },
        }
      },
      animation: {
        float: "float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        shimmer: "shimmer 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        fadeUp: "fadeUp 700ms cubic-bezier(0.4, 0, 0.2, 1) both",
        liquid: "liquidMorph 8s ease-in-out infinite",
        float3D: "float3D 12s ease-in-out infinite",
        aurora: "aurora 25s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
