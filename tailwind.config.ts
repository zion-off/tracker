import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/utils/colors.ts'
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.6rem'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gh-green-1": "var(--gh-green-one)",
        "gh-green-2": "var(--gh-green-two)",
        "gh-green-3": "var(--gh-green-three)",
        "gh-green-4": "var(--gh-green-four)",
        "gh-green-5": "var(--gh-green-five)",
        "gh-outline": "var(--gh-outline)",
      },
      keyframes: {
        interpolate: {
          "0%": { backgroundColor: "var(--gh-green-five)" },
          "20%": { backgroundColor: "var(--gh-green-four)" },
          "40%": { backgroundColor: "var(--gh-green-three)" },
          "60%": { backgroundColor: "var(--gh-green-two)" },
          "80%": { backgroundColor: "var(--gh-green-one)" },
          "100%": { backgroundColor: "var(--gh-green-five)" },
        },
        jiggle: {
          "0%": {
            transform: "rotate(-1deg)",
            "animation-timing-function": "ease-in",
          },
          "50%": {
            transform: "rotate(1.5deg)",
            "animation-timing-function": "ease-out",
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(45deg)' }
        }
      },
      animation: {
        interpolate: "interpolate 5s infinite",
        jiggle: "jiggle 0.25s infinite",
        wiggle: 'wiggle 0.5s ease-in-out',
      },
      transformOrigin: {
        jiggle: "50% 10%",
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
