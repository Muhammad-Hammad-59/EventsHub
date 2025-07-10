/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        foreground: "var(--foreground)",
        background: '#F5F6FE',
        backgroundSecondary: '#EDF0FE',
        textPrimary: '#0C1B38',
        textSecondary: '#27335A',
        textMuted: '#B4BCD5',
        accent: '#2563EB',
        accentSecondary: '#041633',
        borderColor: '#B4BCD5',
      },
    },
  },
  plugins: [heroui()],
};
