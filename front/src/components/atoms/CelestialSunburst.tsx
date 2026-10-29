"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface CelestialSunburstProps {
  className?: string;
}

/**
 * Componente Atomo CelestialSunburst
 * Composicion vectorial SVG abstracta de lineas astronomicas y celestiales.
 * Ciclo de "suspiro" de 7 segundos con cubic-bezier(0.22, 1, 0.36, 1).
 * Trazos finos (0.5px a 1.5px) con paleta: Dorado (#A98242), Contraste adaptativo
 * (#080A0A en Modo Claro / #FFFFFF en Modo Oscuro) y destellos de divisiones:
 * Rojo (#6E1F1F), Jade (#164248) y Azul (#1E2B66).
 * Cero emojis.
 */
export const CelestialSunburst: React.FC<CelestialSunburstProps> = ({
  className,
}) => {
  const reducedMotion = useReducedMotion();
  // Generacion matematica de rayos astronomicos desde el nucleo (250, 250)
  const rays = [
    // Rayos Cardinales Mayores (Dorado #A98242)
    { angle: 0, length: 235, stroke: "#A98242", width: 1.2, opacity: 0.9, hasCross: true },
    { angle: 90, length: 235, stroke: "#A98242", width: 1.2, opacity: 0.9, hasCross: true },
    { angle: 180, length: 235, stroke: "#A98242", width: 1.2, opacity: 0.9, hasCross: true },
    { angle: 270, length: 235, stroke: "#A98242", width: 1.2, opacity: 0.9, hasCross: true },

    // Rayos Intercardinales (Contraste Adaptativo)
    { angle: 45, length: 215, isContrast: true, width: 0.8, opacity: 0.65, dash: "4 3" },
    { angle: 135, length: 215, isContrast: true, width: 0.8, opacity: 0.65, dash: "4 3" },
    { angle: 225, length: 215, isContrast: true, width: 0.8, opacity: 0.65, dash: "4 3" },
    { angle: 315, length: 215, isContrast: true, width: 0.8, opacity: 0.65, dash: "4 3" },

    // Destellos Division Cybersecurity (Rojo #6E1F1F)
    { angle: 22.5, length: 195, stroke: "#6E1F1F", width: 1.2, opacity: 0.85 },
    { angle: 202.5, length: 195, stroke: "#6E1F1F", width: 1.2, opacity: 0.85 },

    // Destellos Division Software (Jade #164248)
    { angle: 67.5, length: 190, stroke: "#164248", width: 1.2, opacity: 0.85 },
    { angle: 247.5, length: 190, stroke: "#164248", width: 1.2, opacity: 0.85 },

    // Destellos Division Infrastructure (Azul #1E2B66)
    { angle: 112.5, length: 190, stroke: "#1E2B66", width: 1.2, opacity: 0.85 },
    { angle: 292.5, length: 190, stroke: "#1E2B66", width: 1.2, opacity: 0.85 },

    // Rayos Astronomicos Secundarios (Dorado / Contraste con opacidades sutiles)
    { angle: 11.25, length: 160, stroke: "#A98242", width: 0.6, opacity: 0.4 },
    { angle: 33.75, length: 140, isContrast: true, width: 0.5, opacity: 0.35 },
    { angle: 56.25, length: 170, stroke: "#A98242", width: 0.6, opacity: 0.45 },
    { angle: 78.75, length: 145, isContrast: true, width: 0.5, opacity: 0.3 },
    { angle: 101.25, length: 165, stroke: "#A98242", width: 0.6, opacity: 0.4 },
    { angle: 123.75, length: 150, isContrast: true, width: 0.5, opacity: 0.35 },
    { angle: 146.25, length: 175, stroke: "#A98242", width: 0.6, opacity: 0.45 },
    { angle: 168.75, length: 140, isContrast: true, width: 0.5, opacity: 0.3 },
    { angle: 191.25, length: 160, stroke: "#A98242", width: 0.6, opacity: 0.4 },
    { angle: 213.75, length: 155, isContrast: true, width: 0.5, opacity: 0.35 },
    { angle: 236.25, length: 170, stroke: "#A98242", width: 0.6, opacity: 0.45 },
    { angle: 258.75, length: 145, isContrast: true, width: 0.5, opacity: 0.3 },
    { angle: 281.25, length: 165, stroke: "#A98242", width: 0.6, opacity: 0.4 },
    { angle: 303.75, length: 150, isContrast: true, width: 0.5, opacity: 0.35 },
    { angle: 326.25, length: 175, stroke: "#A98242", width: 0.6, opacity: 0.45 },
    { angle: 348.75, length: 140, isContrast: true, width: 0.5, opacity: 0.3 },
  ];

  // Graduaciones de grados perimetrales cada 10 grados (36 marcas)
  const perimeterTicks = Array.from({ length: 36 }).map((_, i) => i * 10);

  return (
    <div
      className={cn(
        "relative w-full max-w-[420px] md:max-w-[480px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center select-none pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="absolute w-[80%] h-[80%] rounded-[3px] bg-[radial-gradient(circle,rgba(169,130,66,0.15)_0%,rgba(169,130,66,0)_70%)] blur-2xl opacity-60"
        aria-hidden="true"
      />

      {/* SVG Principal con ciclo de suspiro (Inhalacion / Exhalacion de 7s) */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full animate-celestial-sigh overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="celestialCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A98242" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A98242" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#A98242" stopOpacity="0" />
          </radialGradient>
        </defs>

        <style>{`
          .sun-contrast {
            stroke: #080A0A;
          }
          .dark .sun-contrast {
            stroke: #FFFFFF;
          }
          .sun-core-bg {
            fill: #F8F8F6;
          }
          .dark .sun-core-bg {
            fill: #080A0A;
          }
        `}</style>

        {/* Nucleo con halo difuminado */}
        <circle cx="250" cy="250" r="70" fill="url(#celestialCoreGlow)" />

        {/* ------------------------------------------------------------------ */}
        {/* GRUPO DE ORBITAS Y ANILLOS ASTRONOMICOS (Rotacion lenta)           */}
        {/* ------------------------------------------------------------------ */}
        <g className="animate-celestial-rotate">
          {/* Circunferencia exterior de coordenadas */}
          <circle
            cx="250"
            cy="250"
            r="235"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />

          {/* Marcas de graduacion perimetral */}
          {perimeterTicks.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 250 + 231 * Math.cos(rad);
            const y1 = 250 + 231 * Math.sin(rad);
            const x2 = 250 + 235 * Math.cos(rad);
            const y2 = 250 + 235 * Math.sin(rad);
            return (
              <line
                key={`tick-${deg}`}
                x1={Number(x1.toFixed(4))}
                y1={Number(y1.toFixed(4))}
                x2={Number(x2.toFixed(4))}
                y2={Number(y2.toFixed(4))}
                className="sun-contrast"
                strokeWidth="0.6"
                strokeOpacity={deg % 90 === 0 ? 0.75 : deg % 30 === 0 ? 0.45 : 0.25}
              />
            );
          })}

          {/* Anillos concentricos del astrolabio */}
          <circle
            cx="250"
            cy="250"
            r="195"
            fill="none"
            className="sun-contrast"
            strokeWidth="0.5"
            strokeOpacity="0.25"
            strokeDasharray="3 5"
          />
          <circle
            cx="250"
            cy="250"
            r="165"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />
          <circle
            cx="250"
            cy="250"
            r="125"
            fill="none"
            className="sun-contrast"
            strokeWidth="0.5"
            strokeOpacity="0.25"
            strokeDasharray="2 4"
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* GRUPO DE ELIPSES ARMI LARES (Rotacion en sentido contrario)        */}
        {/* ------------------------------------------------------------------ */}
        <g className="animate-celestial-reverse">
          {/* Elipse Division Infrastructure (Azul #1E2B66) */}
          <ellipse
            cx="250"
            cy="250"
            rx="175"
            ry="65"
            fill="none"
            stroke="#1E2B66"
            strokeWidth="1.2"
            strokeOpacity="0.8"
            transform="rotate(-28 250 250)"
          />

          {/* Elipse Division Software (Jade #164248) */}
          <ellipse
            cx="250"
            cy="250"
            rx="180"
            ry="75"
            fill="none"
            stroke="#164248"
            strokeWidth="1.2"
            strokeOpacity="0.8"
            transform="rotate(38 250 250)"
          />

          {/* Elipse Division Cybersecurity (Rojo #6E1F1F) */}
          <ellipse
            cx="250"
            cy="250"
            rx="160"
            ry="55"
            fill="none"
            stroke="#6E1F1F"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            transform="rotate(82 250 250)"
          />

          {/* Elipse Equatorial Dorada (#A98242) */}
          <ellipse
            cx="250"
            cy="250"
            rx="155"
            ry="60"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.8"
            strokeOpacity="0.55"
            strokeDasharray="4 4"
            transform="rotate(-65 250 250)"
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* RAYOS ASTRONOMICOS QUE NACEN DESDE EL NUCLEO                       */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {rays.map((ray, idx) => {
            const rad = (ray.angle * Math.PI) / 180;
            const startDist = 38;
            const x1 = 250 + startDist * Math.cos(rad);
            const y1 = 250 + startDist * Math.sin(rad);
            const x2 = 250 + ray.length * Math.cos(rad);
            const y2 = 250 + ray.length * Math.sin(rad);

            // Coordenadas de cruceta en puntas cardinales
            const crossLen = 4;
            const perpAngle = rad + Math.PI / 2;
            const cx1 = x2 - crossLen * Math.cos(perpAngle);
            const cy1 = y2 - crossLen * Math.sin(perpAngle);
            const cx2 = x2 + crossLen * Math.cos(perpAngle);
            const cy2 = y2 + crossLen * Math.sin(perpAngle);

            return (
              <g key={`ray-${idx}`}>
                <line
                  x1={Number(x1.toFixed(4))}
                  y1={Number(y1.toFixed(4))}
                  x2={Number(x2.toFixed(4))}
                  y2={Number(y2.toFixed(4))}
                  stroke={ray.isContrast ? undefined : ray.stroke}
                  className={ray.isContrast ? "sun-contrast" : undefined}
                  strokeWidth={ray.width}
                  strokeOpacity={ray.opacity}
                  strokeDasharray={ray.dash}
                />
                {ray.hasCross && (
                  <line
                    x1={Number(cx1.toFixed(4))}
                    y1={Number(cy1.toFixed(4))}
                    x2={Number(cx2.toFixed(4))}
                    y2={Number(cy2.toFixed(4))}
                    stroke={ray.stroke}
                    strokeWidth={1}
                    strokeOpacity={ray.opacity}
                  />
                )}
                {/* Micro punto terminal en rayos intercardinales */}
                {ray.angle % 45 === 0 && !ray.hasCross && (
                  <circle
                    cx={Number(x2.toFixed(4))}
                    cy={Number(y2.toFixed(4))}
                    r="1.5"
                    className="sun-contrast"
                    fill="currentColor"
                    opacity={ray.opacity}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* PULSOS DE ESTELA EN RAYOS (stroke-dashoffset hacia las puntas)     */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {[
            { angle: 0, length: 235, stroke: "#A98242", begin: "0s" },
            { angle: 45, length: 215, isContrast: true, begin: "1s" },
            { angle: 90, length: 235, stroke: "#A98242", begin: "2s" },
            { angle: 135, length: 215, isContrast: true, begin: "3s" },
            { angle: 180, length: 235, stroke: "#A98242", begin: "0.5s" },
            { angle: 225, length: 215, isContrast: true, begin: "1.5s" },
            { angle: 270, length: 235, stroke: "#A98242", begin: "2.5s" },
            { angle: 315, length: 215, isContrast: true, begin: "3.5s" },
          ].map((pulse, idx) => {
            const rad = (pulse.angle * Math.PI) / 180;
            const x1 = 250 + 38 * Math.cos(rad);
            const y1 = 250 + 38 * Math.sin(rad);
            const x2 = 250 + pulse.length * Math.cos(rad);
            const y2 = 250 + pulse.length * Math.sin(rad);
            const lineLen = pulse.length - 38;

            return (
              <line
                key={`pulse-${idx}`}
                x1={Number(x1.toFixed(4))}
                y1={Number(y1.toFixed(4))}
                x2={Number(x2.toFixed(4))}
                y2={Number(y2.toFixed(4))}
                stroke={pulse.isContrast ? undefined : pulse.stroke}
                className={pulse.isContrast ? "sun-contrast" : undefined}
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeDasharray="26 260"
              >
                {!reducedMotion && (
              <animate
                  attributeName="stroke-dashoffset"
                  from="26"
                  to={`-${lineLen}`}
                  dur="4s"
                  repeatCount="indefinite"
                  begin={pulse.begin}
                />
            )}
                {!reducedMotion && (
              <animate
                  attributeName="opacity"
                  values="0; 0.95; 0.85; 0"
                  keyTimes="0; 0.15; 0.85; 1"
                  dur="4s"
                  repeatCount="indefinite"
                  begin={pulse.begin}
                />
            )}
              </line>
            );
          })}
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* ONDAS ANULARES PERIODICAS DESDE EL NUCLEO (Trazo ultra fino 0.5px) */}
        {/* ------------------------------------------------------------------ */}
        <g>
          <circle
            cx="250"
            cy="250"
            r="38"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.5"
          >
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="38"
              to="240"
              dur="6s"
              repeatCount="indefinite"
              begin="0s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.75; 0.45; 0"
              keyTimes="0; 0.55; 1"
              dur="6s"
              repeatCount="indefinite"
              begin="0s"
            />
            )}
          </circle>
          <circle
            cx="250"
            cy="250"
            r="38"
            fill="none"
            className="sun-contrast"
            strokeWidth="0.5"
          >
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="38"
              to="240"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.65; 0.35; 0"
              keyTimes="0; 0.55; 1"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
            )}
          </circle>
          <circle
            cx="250"
            cy="250"
            r="38"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.5"
          >
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="38"
              to="240"
              dur="6s"
              repeatCount="indefinite"
              begin="4s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.75; 0.45; 0"
              keyTimes="0; 0.55; 1"
              dur="6s"
              repeatCount="indefinite"
              begin="4s"
            />
            )}
          </circle>
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* NUCLEO CENTRAL CELESTIAL                                           */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Anillo de contencion media */}
          <circle
            cx="250"
            cy="250"
            r="85"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.8"
            strokeOpacity="0.45"
            strokeDasharray="2 3"
          />

          {/* Anillo interior del nucleo */}
          <circle
            cx="250"
            cy="250"
            r="38"
            className="sun-core-bg"
            stroke="#A98242"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Corona interior */}
          <circle
            cx="250"
            cy="250"
            r="24"
            fill="none"
            className="sun-contrast"
            strokeWidth="0.6"
            strokeOpacity="0.4"
            strokeDasharray="2 2"
          />

          <circle
            cx="250"
            cy="250"
            r="12"
            className="sun-core-bg"
            stroke="#A98242"
            strokeWidth="1"
            strokeOpacity="0.9"
          />

          {/* Punto estelar centro */}
          <circle
            cx="250"
            cy="250"
            r="3.5"
            fill="#A98242"
          />
        </g>
      </svg>
    </div>
  );
};
