"use client";

import React from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CooldownTimerProps {
  remainingSeconds: number;
  totalSeconds?: number;
  progressPercent: number;
  title?: string;
  message?: string;
  className?: string;
}

/**
 * Componente Molecula CooldownTimer
 * Indicador visual elegante con cuenta regresiva en vivo y barra de progreso fina en dorado (#A98242).
 * Sin un solo emoji: utiliza exclusivamente iconos vectoriales SVG de lucide-react.
 */
export const CooldownTimer: React.FC<CooldownTimerProps> = ({
  remainingSeconds,
  totalSeconds = 90,
  progressPercent,
  title = "Periodo de Espera Activo",
  message = "Podrá volver a enviar el formulario cuando termine el tiempo de espera.",
  className,
}) => {
  return (
    <div
      className={cn(
        "p-6 bg-[#080A0A] border border-[#A98242]/40 shadow-sm",
        "rounded-[3px]", // Esquinas al 10%
        "flex flex-col gap-4 text-left animate-fadeIn",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#A98242]" />
          <h4 className="font-serif text-base text-[#FFFFFF] font-normal tracking-wide">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-[#A98242]/30 rounded-[2px]">
          <Clock className="w-3.5 h-3.5 text-[#A98242]" />
          <span className="font-sans text-xs text-[#FFFFFF] font-medium tabular-nums tracking-widest">
            {remainingSeconds}s
          </span>
        </div>
      </div>

      <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
        {message}
      </p>

      {/* Barra de progreso fina en Dorado (#A98242) */}
      <div className="w-full flex flex-col gap-1.5 mt-1">
        <div className="w-full h-[2px] bg-neutral-800 rounded-[1px] overflow-hidden">
          <div
            className="h-full bg-[#A98242] transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500 font-sans tracking-wider">
          <span>Tiempo transcurrido: {totalSeconds - remainingSeconds}s</span>
          <span>Total: {totalSeconds}s</span>
        </div>
      </div>
    </div>
  );
};
