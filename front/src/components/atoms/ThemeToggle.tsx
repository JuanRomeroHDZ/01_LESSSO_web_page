"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Componente Atomo ThemeToggle
 * Botón cuadrado compacto con esquinas al 10% (w-9 h-9, rounded-[3px])
 * Permite alternar con un clic entre Modo Normal (Blanco Hueso) y Modo Oscuro (Negro).
 * Sin emojis.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-[3px] border border-neutral-300 dark:border-neutral-800 bg-[#FFFFFF] dark:bg-[#080A0A] opacity-60",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-[3px] transition-all duration-300 select-none",
        "border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] dark:hover:border-[#A98242]",
        "bg-[#FFFFFF] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] hover:text-[#A98242] dark:hover:text-[#A98242]",
        "shadow-sm active:scale-95",
        className
      )}
      aria-label={isDark ? "Cambiar a Modo Normal (Claro)" : "Cambiar a Modo Oscuro"}
      title={isDark ? "Modo Normal (Claro)" : "Modo Oscuro"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#A98242] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#080A0A] hover:text-[#A98242] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
