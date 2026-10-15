/**
 * Paleta Oficial e Identidad Cromatica de LESSSO
 * Define los codigos hexadecimales normativos y las rutas de los logotipos vectoriales.
 */
export const THEME_PALETTE = {
  // Colores Maestros
  black: "#080A0A",
  white: "#FFFFFF",
  offwhite: "#F8F8F6",
  gold: "#A98242",

  // Colores de Divisiones Tecnicas (utilizados solo para acentos sutiles en hover del Header)
  divisions: {
    cybersecurity: "#240B0B",
    software: "#081416",
    infrastructure: "#0C1024",
  },

  // Rutas de recursos de marca
  logos: {
    white: "/assets/logos/lessso-white.svg",
    black: "/assets/logos/lessso-black.svg",
    gold: "/assets/logos/lessso-gold.svg",
  },
} as const;

export type ThemePalette = typeof THEME_PALETTE;
