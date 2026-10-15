"use client";

import React from "react";
import { Locale } from "@/config/site-content";
import { cn } from "@/lib/utils";

export interface LangSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  className?: string;
}

/**
 * Componente Molecula LangSwitcher
 * Selector sutil de idioma ES / EN para el Header
 */
export const LangSwitcher: React.FC<LangSwitcherProps> = ({
  currentLocale,
  onLocaleChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onLocaleChange("es")}
        className={cn(
          "transition-colors duration-200 px-1 py-0.5 rounded-[2px]",
          currentLocale === "es"
            ? "text-[#A98242] font-semibold"
            : "text-neutral-400 hover:text-[#FFFFFF]"
        )}
        aria-label="Cambiar idioma a Español"
      >
        ES
      </button>

      <span className="text-neutral-600 text-[10px]" aria-hidden="true">/</span>

      <button
        type="button"
        onClick={() => onLocaleChange("en")}
        className={cn(
          "transition-colors duration-200 px-1 py-0.5 rounded-[2px]",
          currentLocale === "en"
            ? "text-[#A98242] font-semibold"
            : "text-neutral-400 hover:text-[#FFFFFF]"
        )}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
};
