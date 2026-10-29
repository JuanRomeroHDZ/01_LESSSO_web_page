"use client";

import React, { useId } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface DiagonalLightRaysProps {
  variant?: "home" | "cybersecurity";
  className?: string;
  opacity?: number;
}

/**
 * Componente Atomo DiagonalLightRays
 * Dibuja haces de luz ultra finos (0.5px a 1px) que caen suavemente en ángulo diagonal
 * con una estela sutil que se desvanece periódicamente.
 *
 * Adaptación:
 * - Home: Dorado Oscuro (#A98242) + trazos sutiles en #080A0A (en modo claro) o blanco tenue (en modo oscuro).
 * - Ciberseguridad: 70% Rojo Oscuro (#7A1C1C / #9E2A2B) y 30% Dorado Oscuro (#A98242).
 *
 * Excluido del Hero de cada página por regla de diseño.
 */
export const DiagonalLightRays: React.FC<DiagonalLightRaysProps> = ({
  variant = "home",
  className,
  opacity = 0.65,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();

  // Definición de 14 rayos distribuidos horizontalmente (en porcentajes) con duraciones y desfases escalonados
  const rays = [
    { xPct: 4, dur: 7.2, begin: 0.2, length: 550, isPrimary: true },
    { xPct: 11, dur: 9.5, begin: 2.1, length: 620, isPrimary: false },
    { xPct: 19, dur: 8.0, begin: 4.3, length: 580, isPrimary: true },
    { xPct: 27, dur: 10.2, begin: 1.5, length: 640, isPrimary: true },
    { xPct: 35, dur: 7.8, begin: 3.7, length: 520, isPrimary: false },
    { xPct: 42, dur: 8.9, begin: 0.8, length: 600, isPrimary: true },
    { xPct: 51, dur: 11.0, begin: 5.0, length: 650, isPrimary: false },
    { xPct: 59, dur: 7.5, begin: 2.9, length: 540, isPrimary: true },
    { xPct: 67, dur: 9.1, begin: 1.2, length: 610, isPrimary: true },
    { xPct: 74, dur: 8.4, begin: 4.0, length: 570, isPrimary: false },
    { xPct: 82, dur: 10.5, begin: 2.4, length: 630, isPrimary: true },
    { xPct: 89, dur: 7.9, begin: 0.5, length: 560, isPrimary: true },
    { xPct: 96, dur: 9.8, begin: 3.3, length: 610, isPrimary: false },
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0",
        className
      )}
      style={{ opacity: Math.min(opacity * 1.15, 1) }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente Dorado */}
          <linearGradient id={`goldRayGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A98242" stopOpacity="0" />
            <stop offset="40%" stopColor="#A98242" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A98242" stopOpacity="0" />
          </linearGradient>

          {/* Gradiente Rojo Ciberseguridad */}
          <linearGradient id={`cyberRedGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A1C1C" stopOpacity="0" />
            <stop offset="50%" stopColor="#9E2A2B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#240B0B" stopOpacity="0" />
          </linearGradient>

          {/* Gradiente de Contraste para Home en Modo Claro/Oscuro */}
          <linearGradient id={`homeContrastGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {rays.map((ray, idx) => {
          // Desplazamiento diagonal a ~35 grados: deltaX = 140, deltaY = 400
          const x1 = ray.xPct * 10;
          const y1 = -60;
          const x2 = x1 + 180;
          const y2 = y1 + ray.length;

          // Determinación cromática según variante
          let stroke = `url(#goldRayGrad-${uniqueId})`;
          let strokeClass = "";

          if (variant === "cybersecurity") {
            // Regla: 70% Rojo Oscuro / 30% Dorado
            const isRed = idx % 10 < 7;
            stroke = isRed ? `url(#cyberRedGrad-${uniqueId})` : `url(#goldRayGrad-${uniqueId})`;
          } else {
            // Home: Mayoría dorado con acentos adaptables al tema
            if (ray.isPrimary) {
              stroke = `url(#goldRayGrad-${uniqueId})`;
            } else {
              stroke = `url(#homeContrastGrad-${uniqueId})`;
              strokeClass = "text-[#080A0A] dark:text-[#FFFFFF]";
            }
          }

          return (
            <line
              key={`diag-ray-${idx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={stroke}
              strokeWidth={idx % 3 === 0 ? "1.05" : "0.7"}
              strokeDasharray="60 380"
              strokeLinecap="round"
              className={strokeClass}
            >
              {!reducedMotion && <><animate
                attributeName="stroke-dashoffset"
                from="440"
                to="-440"
                dur={`${ray.dur}s`}
                repeatCount="indefinite"
                begin={`${ray.begin}s`}
              />
              <animate
                attributeName="opacity"
                values="0; 0.85; 0.7; 0"
                keyTimes="0; 0.2; 0.8; 1"
                dur={`${ray.dur}s`}
                repeatCount="indefinite"
                begin={`${ray.begin}s`}
              /></>}
            </line>
          );
        })}
      </svg>
    </div>
  );
};
