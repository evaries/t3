import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      layout: "200px minmax(900px, 1fr) 100px",
      fontFamily: {
        sans: ["var(--font-virgil)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
