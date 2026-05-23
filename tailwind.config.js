/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#f5f5f7",
        primary: {
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
          light: "#a78bfa",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
          light: "#22d3ee",
        },
        accent: {
          pink: "#ec4899",
          yellow: "#eab308",
          red: "#ef4444",
        },
        cardBg: "rgba(17, 17, 19, 0.75)",
        cardBorder: "rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
        "dark-radial": "radial-gradient(circle at top, #1e1b4b 0%, #030303 80%)",
      },
      boxShadow: {
        "neon-purple": "0 0 15px rgba(139, 92, 246, 0.35)",
        "neon-cyan": "0 0 15px rgba(6, 182, 212, 0.35)",
        "neon-pink": "0 0 15px rgba(236, 72, 153, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 6s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { opacity: 0.3, transform: "scale(1)" },
          "100%": { opacity: 0.6, transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
