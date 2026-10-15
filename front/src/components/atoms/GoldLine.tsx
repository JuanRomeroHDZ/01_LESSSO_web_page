import React from "react";
import { cn } from "@/lib/utils";

export interface GoldLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  glow?: boolean;
}

/**
 * Componente Atomo GoldLine
 * Hilo arquitectonico de 1px en color Dorado Oscuro (#A98242)
 * Conecta visualmente secciones y delimita bloques con precision.
 */
export const GoldLine: React.FC<GoldLineProps> = ({
  orientation = "horizontal",
  className,
  glow = false,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-[1px] bg-[#A98242] shrink-0",
          glow && "shadow-[0_0_8px_rgba(169,130,66,0.5)]",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn(
        "h-[1px] w-full bg-[#A98242] shrink-0",
        glow && "shadow-[0_0_8px_rgba(169,130,66,0.5)]",
        className
      )}
      aria-hidden="true"
    />
  );
};
