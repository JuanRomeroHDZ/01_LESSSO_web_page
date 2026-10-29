"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface BreachCorePrismProps {
  className?: string;
}

/**
 * Componente Atomo BreachCorePrism (El Prisma de Intrusión)
 * Composición vectorial SVG abstracta que representa las capas defensivas
 * de una infraestructura crítica (Perímetro, DMZ, Gateway de Aplicación y Núcleo de Sistemas).
 *
 * Dinámica:
 * - Anillos concéntricos y angulares con rotaciones contrarias muy lentas.
 * - Rutas quebradas a 90 grados que simulan vectores de ataque guiados.
 * - Destellos de intrusión en Dorado (#A98242) y Carmesí (#9E2A2B) que viajan
 *   hacia el núcleo central.
 * - Ondas expansivas de verificación que nacen en el centro cada ciclo.
 * - Esquinas y líneas geométricas casi rectas, sin emojis.
 */
export const BreachCorePrism: React.FC<BreachCorePrismProps> = ({ className }) => {
  const reducedMotion = useReducedMotion();
  // Graduaciones perimetrales cada 15 grados (24 marcas)
  const perimeterTicks = Array.from({ length: 24 }).map((_, i) => i * 15);

  return (
    <div
      className={cn(
        "relative w-full max-w-[420px] md:max-w-[480px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center select-none pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Resplandor ambiental de fondo en Rojo Oscuro (#240B0B) y Dorado (#A98242) */}
      <div
        className="absolute w-[85%] h-[85%] rounded-[3px] bg-[radial-gradient(circle,rgba(158,42,43,0.18)_0%,rgba(36,11,11,0.35)_45%,rgba(8,10,10,0)_75%)] blur-2xl opacity-75"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente radial del Núcleo Central */}
          <radialGradient id="prismCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9E2A2B" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#240B0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#080A0A" stopOpacity="0" />
          </radialGradient>

          {/* Gradiente lineal para el vector Alpha de Intrusión */}
          <linearGradient id="intrusionAlphaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A98242" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#9E2A2B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Gradiente lineal para el vector Beta de Intrusión */}
          <linearGradient id="intrusionBetaGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9E2A2B" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#7A1C1C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A98242" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Halo difuminado del núcleo */}
        <circle cx="250" cy="250" r="85" fill="url(#prismCoreGlow)" />

        {/* ------------------------------------------------------------------ */}
        {/* CORCHETES ARQUITECTONICOS PERIMETRALES (Esquinas al 10%)            */}
        {/* ------------------------------------------------------------------ */}
        <g stroke="#A98242" strokeWidth="0.8" strokeOpacity="0.4" fill="none">
          {/* Superior Izquierda */}
          <path d="M 40 65 L 40 40 L 65 40" />
          {/* Superior Derecha */}
          <path d="M 460 65 L 460 40 L 435 40" />
          {/* Inferior Izquierda */}
          <path d="M 40 435 L 40 460 L 65 460" />
          {/* Inferior Derecha */}
          <path d="M 460 435 L 460 460 L 435 460" />
        </g>

        {/* Etiquetas vectoriales de telemetría militar/arquitectónica */}
        <text
          x="44"
          y="32"
          fill="#A98242"
          fontSize="7"
          fontFamily="monospace"
          letterSpacing="0.2em"
          opacity="0.6"
        >
          SEC-VECT // PTES.L4
        </text>
        <text
          x="355"
          y="32"
          fill="#9E2A2B"
          fontSize="7"
          fontFamily="monospace"
          letterSpacing="0.2em"
          opacity="0.75"
        >
          ATTACK SURFACE: ACTIVE
        </text>

        {/* ------------------------------------------------------------------ */}
        {/* CAPA 1: PERÍMETRO DEFENSIVO EXTERNO (Rotación lenta horaria)        */}
        {/* ------------------------------------------------------------------ */}
        <g className="animate-celestial-rotate">
          {/* Octágono exterior de coordenadas */}
          <polygon
            points="250,15 416,84 485,250 416,416 250,485 84,416 15,250 84,84"
            fill="none"
            stroke="#7A1C1C"
            strokeWidth="0.6"
            strokeOpacity="0.35"
          />

          {/* Anillo exterior segmentado con aperturas (Firewall Ingress) */}
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke="#4A1212"
            strokeWidth="1.2"
            strokeOpacity="0.65"
            strokeDasharray="45 15 80 20 60 25 90 20"
          />

          {/* Graduaciones angulares */}
          {perimeterTicks.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 250 + 224 * Math.cos(rad);
            const y1 = 250 + 224 * Math.sin(rad);
            const x2 = 250 + 230 * Math.cos(rad);
            const y2 = 250 + 230 * Math.sin(rad);
            return (
              <line
                key={`prism-tick-${deg}`}
                x1={Number(x1.toFixed(4))}
                y1={Number(y1.toFixed(4))}
                x2={Number(x2.toFixed(4))}
                y2={Number(y2.toFixed(4))}
                stroke={deg % 90 === 0 ? "#A98242" : "#9E2A2B"}
                strokeWidth={deg % 90 === 0 ? 1 : 0.6}
                strokeOpacity={deg % 90 === 0 ? 0.8 : 0.35}
              />
            );
          })}
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* CAPA 2: SEGMENTACION DE RED Y DMZ (Rotación antihoraria)            */}
        {/* ------------------------------------------------------------------ */}
        <g className="animate-celestial-reverse">
          {/* Dodecágono de contención intermedia */}
          <polygon
            points="250,65 342,89 412,158 435,250 412,342 342,412 250,435 158,412 89,342 65,250 89,158 158,89"
            fill="none"
            stroke="#9E2A2B"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            strokeDasharray="8 6"
          />

          <circle
            cx="250"
            cy="250"
            r="175"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.5"
            strokeOpacity="0.4"
            strokeDasharray="3 4"
          />

          {/* Nodos angulares de verificación en vértices cardinales */}
          {[
            { cx: 250, cy: 75 },
            { cx: 425, cy: 250 },
            { cx: 250, cy: 425 },
            { cx: 75, cy: 250 },
          ].map((node, i) => (
            <rect
              key={`node-${i}`}
              x={node.cx - 2}
              y={node.cy - 2}
              width="4"
              height="4"
              fill="#240B0B"
              stroke="#A98242"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* CAPA 3: GATEWAY DE APLICACIÓN Y APIS (Rotación media horaria)      */}
        {/* ------------------------------------------------------------------ */}
        <g className="animate-celestial-rotate">
          <polygon
            points="250,125 338,162 375,250 338,338 250,375 162,338 125,250 162,162"
            fill="none"
            stroke="#7A1C1C"
            strokeWidth="1"
            strokeOpacity="0.75"
          />

          {/* Anillo de verificación interior con aperturas críticas */}
          <circle
            cx="250"
            cy="250"
            r="120"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            strokeOpacity="0.3"
            strokeDasharray="20 10 40 15 30 10"
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* CAPA 4: BASTIONADO DE HOST Y ZERO TRUST KERNEL                     */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Rombo diamantado estático a 45 grados */}
          <polygon
            points="250,170 330,250 250,330 170,250"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.8"
            strokeOpacity="0.65"
            strokeDasharray="4 3"
          />

          {/* Miras telescópicas axiales hacia el centro */}
          <line x1="250" y1="140" x2="250" y2="195" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="250" y1="305" x2="250" y2="360" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="140" y1="250" x2="195" y2="250" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="305" y1="250" x2="360" y2="250" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.4" />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* RUTAS QUEBRADAS DE INTRUSIÓN (Vectores a 90 grados)                */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Guía estática de la ruta Alpha (Entrada superior derecha) */}
          <path
            d="M 445 90 L 365 90 L 365 175 L 290 175 L 290 250 L 250 250"
            fill="none"
            stroke="#7A1C1C"
            strokeWidth="0.6"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />

          {/* Haz animado Alpha de intrusión (Viaja a lo largo de los codos hacia el centro) */}
          <path
            d="M 445 90 L 365 90 L 365 175 L 290 175 L 290 250 L 250 250"
            fill="none"
            stroke="url(#intrusionAlphaGrad)"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeDasharray="45 360"
          >
            {!reducedMotion && (
              <animate
              attributeName="stroke-dashoffset"
              from="45"
              to="-350"
              dur="5s"
              repeatCount="indefinite"
              begin="0s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0; 1; 1; 0.9; 0"
              keyTimes="0; 0.1; 0.75; 0.95; 1"
              dur="5s"
              repeatCount="indefinite"
              begin="0s"
            />
            )}
          </path>

          {/* Guía estática de la ruta Beta (Entrada inferior izquierda) */}
          <path
            d="M 55 410 L 135 410 L 135 325 L 210 325 L 210 250 L 250 250"
            fill="none"
            stroke="#4A1212"
            strokeWidth="0.6"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />

          {/* Haz animado Beta de intrusión (Desfasado en 2.5s) */}
          <path
            d="M 55 410 L 135 410 L 135 325 L 210 325 L 210 250 L 250 250"
            fill="none"
            stroke="url(#intrusionBetaGrad)"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeDasharray="45 360"
          >
            {!reducedMotion && (
              <animate
              attributeName="stroke-dashoffset"
              from="45"
              to="-350"
              dur="5s"
              repeatCount="indefinite"
              begin="2.5s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0; 1; 1; 0.9; 0"
              keyTimes="0; 0.1; 0.75; 0.95; 1"
              dur="5s"
              repeatCount="indefinite"
              begin="2.5s"
            />
            )}
          </path>
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* ONDAS EXPANSIVAS DE VERIFICACIÓN (Nacen del impacto en el núcleo)  */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Onda 1: Validación Dorada (#A98242) sincronizada con impacto Alpha */}
          <circle cx="250" cy="250" r="18" fill="none" stroke="#A98242" strokeWidth="0.8">
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="18"
              to="230"
              dur="5s"
              repeatCount="indefinite"
              begin="2.2s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.9; 0.45; 0"
              keyTimes="0; 0.5; 1"
              dur="5s"
              repeatCount="indefinite"
              begin="2.2s"
            />
            )}
          </circle>

          {/* Onda 2: Validación Carmesí (#9E2A2B) sincronizada con impacto Beta */}
          <circle cx="250" cy="250" r="18" fill="none" stroke="#9E2A2B" strokeWidth="0.8">
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="18"
              to="230"
              dur="5s"
              repeatCount="indefinite"
              begin="4.7s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.85; 0.4; 0"
              keyTimes="0; 0.5; 1"
              dur="5s"
              repeatCount="indefinite"
              begin="4.7s"
            />
            )}
          </circle>

          {/* Onda 3: Eco ultra fino blanco */}
          <circle cx="250" cy="250" r="18" fill="none" stroke="#FFFFFF" strokeWidth="0.5">
            {!reducedMotion && (
              <animate
              attributeName="r"
              from="18"
              to="240"
              dur="5s"
              repeatCount="indefinite"
              begin="2.4s"
            />
            )}
            {!reducedMotion && (
              <animate
              attributeName="opacity"
              values="0.7; 0.3; 0"
              keyTimes="0; 0.5; 1"
              dur="5s"
              repeatCount="indefinite"
              begin="2.4s"
            />
            )}
          </circle>
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* NUCLEO CENTRAL (The Target Vault)                                  */}
        {/* ------------------------------------------------------------------ */}
        <g>
          {/* Anillo de contención exterior del núcleo */}
          <rect
            x="222"
            y="222"
            width="56"
            height="56"
            fill="#080A0A"
            stroke="#A98242"
            strokeWidth="1.2"
            strokeOpacity="0.85"
            transform="rotate(45 250 250)"
          />

          {/* Núcleo interno en Rojo Profundo (#240B0B) */}
          <circle
            cx="250"
            cy="250"
            r="18"
            fill="#240B0B"
            stroke="#9E2A2B"
            strokeWidth="1"
          />

          {/* Corona interior dorada */}
          <circle
            cx="250"
            cy="250"
            r="9"
            fill="none"
            stroke="#A98242"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Punto estelar / Target Lock central */}
          <rect
            x="248"
            y="248"
            width="4"
            height="4"
            fill="#FFFFFF"
          >
            {!reducedMotion && (
              <animate
              attributeName="fill"
              values="#FFFFFF;#A98242;#9E2A2B;#FFFFFF"
              dur="2.5s"
              repeatCount="indefinite"
            />
            )}
          </rect>
        </g>
      </svg>
    </div>
  );
};
