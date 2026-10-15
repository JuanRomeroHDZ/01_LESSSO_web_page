"use client";

import React from "react";
import { MessageSquareShare } from "lucide-react";
import { useDynamicWhatsApp } from "@/hooks/useDynamicWhatsApp";
import { cn } from "@/lib/utils";

export interface WhatsAppButtonProps {
  formData?: {
    fullName?: string;
    companyName?: string;
    areaOfInterest?: string;
    projectDetails?: string;
  };
  label?: string;
  className?: string;
}

/**
 * Componente Molecula WhatsAppButton
 * Diseno editorial sobrio:
 * - Prohibido el uso del color verde de WhatsApp o su logotipo oficial.
 * - Paleta LESSSO: Fondo negro (#080A0A), texto blanco, borde y acento dorado (#A98242).
 * - Icono vectorial SVG limpio (MessageSquareShare de lucide-react).
 * - Mensaje dinamico que detecta los datos digitados en el formulario.
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  formData,
  label = "Canal Directo vía WhatsApp",
  className,
}) => {
  const { whatsappUrl } = useDynamicWhatsApp(formData);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-between gap-4 px-5 py-3.5",
        "bg-[#080A0A] text-[#FFFFFF] border border-[#A98242]/50 hover:border-[#A98242]",
        "rounded-[3px]", // Esquinas al 10%
        "font-sans text-xs uppercase tracking-widest transition-all duration-300",
        "hover:bg-[#080A0A]/90 hover:shadow-[0_0_15px_rgba(169,130,66,0.15)] group select-none",
        className
      )}
      aria-label="Contactar a LESSSO mediante WhatsApp con mensaje estructurado"
    >
      <div className="flex items-center gap-2.5">
        <MessageSquareShare className="w-4 h-4 text-[#A98242] transition-transform duration-300 group-hover:scale-110" />
        <span className="font-light">{label}</span>
      </div>

      <span className="text-[10px] text-[#A98242] font-mono tracking-normal opacity-80 group-hover:opacity-100">
        ENLACE DIRECTO
      </span>
    </a>
  );
};
