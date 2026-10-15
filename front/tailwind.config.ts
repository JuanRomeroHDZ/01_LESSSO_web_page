import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Oficial LESSSO
        lessso: {
          black: "#080A0A",
          white: "#FFFFFF",
          offwhite: "#F8F8F6",
          gold: "#A98242",
          // Divisiones de negocio (destellos sutiles en hover)
          cyber: "#240B0B",
          software: "#081416",
          infra: "#0C1024",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "Poppins", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        // Geometria Arquitectonica: Estrictamente esquinas al 10% (2px - 4px)
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "4px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "4px",
        full: "4px", // Reemplazo de proteccion para evitar bordes pildora accidentales
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        goldGlow: "0 0 15px -3px rgba(169, 130, 66, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
