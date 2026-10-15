import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS resolviendo colisiones de manera inteligente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitiza cadenas de texto en el cliente para prevenir inyecciones visuales
 */
export function sanitizeClientString(str: string): string {
  if (!str) return "";
  return str.replace(/[<>]/g, "").trim();
}
