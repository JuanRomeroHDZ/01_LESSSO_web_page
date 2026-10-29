"use client";

import React from "react";
import { Locale } from "@/config/site-content";
import { cn } from "@/lib/utils";

export interface LangToggleProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  className?: string;
}

/**
 * Componente Atomo LangToggle
 * Botón cuadrado compacto con esquinas al 10% (w-11 h-11 lg:w-9 lg:h-9, rounded-[3px])
 * Alterna entre ES y EN con un solo clic rápido.
 * Sin emojis.
 */
export const LangToggle: React.FC<LangToggleProps> = ({
  currentLocale,
  onLocaleChange,
  className,
}) => {
  const toggleLocale = () => {
    onLocaleChange(currentLocale === "es" ? "en" : "es");
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center rounded-[3px] transition-all duration-300 select-none",
        "border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] dark:hover:border-[#A98242]",
        "bg-[#FFFFFF] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] hover:text-[#A98242] dark:hover:text-[#A98242]",
        "font-mono text-xs font-semibold tracking-wider",
        "shadow-sm active:scale-95",
        className
      )}
      aria-label={`Cambiar idioma a ${currentLocale === "es" ? "Inglés" : "Español"}`}
      title={currentLocale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className="text-[#76591F] dark:text-[#C9A66B] font-semibold">{currentLocale.toUpperCase()}</span>
    </button>
  );
};
