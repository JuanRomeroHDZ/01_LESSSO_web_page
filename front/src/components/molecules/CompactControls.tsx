"use client";

import React from "react";
import { LangToggle } from "@/components/atoms/LangToggle";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Locale } from "@/config/site-content";
import { cn } from "@/lib/utils";

export interface CompactControlsProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  className?: string;
}

/**
 * Componente Molécula CompactControls
 * Presenta dos botones cuadrados compactos (w-9 h-9, rounded-[3px]) colocados uno al lado del otro:
 * 1. Botón de Idioma (ES / EN)
 * 2. Botón de Tema (Modo Normal Blanco / Modo Oscuro Negro)
 */
export const CompactControls: React.FC<CompactControlsProps> = ({
  currentLocale,
  onLocaleChange,
  className,
}) => {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <LangToggle
        currentLocale={currentLocale}
        onLocaleChange={onLocaleChange}
      />
      <ThemeToggle />
    </div>
  );
};
