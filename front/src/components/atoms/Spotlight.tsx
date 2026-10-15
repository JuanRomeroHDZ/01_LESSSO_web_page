import React from "react";
import { cn } from "@/lib/utils";

export interface SpotlightProps {
  className?: string;
}

/**
 * Componente Atomo Spotlight
 * Iluminacion ambiental radial difuminada al 3% de opacidad para fondos oscuros (#080A0A)
 */
export const Spotlight: React.FC<SpotlightProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px]",
        "bg-[radial-gradient(circle,rgba(169,130,66,0.12)_0%,rgba(8,10,10,0)_70%)]",
        "blur-3xl select-none",
        className
      )}
      style={{ opacity: 0.35 }}
      aria-hidden="true"
    />
  );
};
