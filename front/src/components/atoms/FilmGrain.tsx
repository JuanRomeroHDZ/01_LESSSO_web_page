import React from "react";
import { cn } from "@/lib/utils";

export interface FilmGrainProps {
  className?: string;
  opacity?: number; // 0.03 a 0.04 (3% a 4%)
}

/**
 * Componente Atomo FilmGrain
 * Filtro SVG superpuesto que genera una textura de papel mate editorial (Matte Film Grain)
 * Opacidad controlada entre el 3% y el 4%.
 * Cero patrones de cuadricula ni mallas de puntos.
 */
export const FilmGrain: React.FC<FilmGrainProps> = ({
  className,
  opacity = 0.035,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 w-full h-full overflow-hidden select-none",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="lessso-matte-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#lessso-matte-grain)" />
      </svg>
    </div>
  );
};
