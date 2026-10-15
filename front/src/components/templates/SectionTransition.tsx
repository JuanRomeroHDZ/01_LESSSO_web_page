import React from "react";
import { GoldLine } from "@/components/atoms/GoldLine";
import { cn } from "@/lib/utils";

export interface SectionTransitionProps {
  fromColor?: "black" | "white";
  toColor?: "black" | "white";
  className?: string;
}

/**
 * Componente Template SectionTransition
 * Hilo arquitectonico de conexion entre bloques con inversion cromatica
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  className,
}) => {
  return (
    <div className={cn("w-full relative flex items-center justify-center", className)}>
      <GoldLine className="opacity-40" />
      <div className="absolute w-3 h-3 rotate-45 border border-[#A98242] bg-[#080A0A]" />
    </div>
  );
};
