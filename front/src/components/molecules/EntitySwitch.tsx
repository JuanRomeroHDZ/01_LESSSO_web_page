import React from "react";
import { User, Building2 } from "lucide-react";
import { EntityType } from "@/types";
import { cn } from "@/lib/utils";

export interface EntitySwitchProps {
  value: EntityType;
  onChange: (value: EntityType) => void;
  personLabel?: string;
  companyLabel?: string;
  className?: string;
}

/**
 * Componente Molecula EntitySwitch
 * Conmutador Persona / Empresa con esquinas al 10% (rounded-[3px]).
 * Prohibido el uso de estilo pildora.
 */
export const EntitySwitch: React.FC<EntitySwitchProps> = ({
  value,
  onChange,
  personLabel = "Persona",
  companyLabel = "Empresa",
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-neutral-100 dark:bg-[#080A0A]/80 border border-neutral-300 dark:border-neutral-800",
        "rounded-[3px]", // Esquinas al 10%
        className
      )}
      role="tablist"
      aria-label="Tipo de Entidad"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "PERSON"}
        onClick={() => onChange("PERSON")}
        className={cn(
          "flex items-center gap-2 px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300",
          "rounded-[2px]", // Esquinas al 10%
          value === "PERSON"
            ? "bg-[#080A0A] text-[#FFFFFF] dark:bg-[#F8F8F6] dark:text-[#080A0A] font-medium shadow-sm"
            : "text-neutral-600 dark:text-neutral-400 hover:text-[#080A0A] dark:hover:text-[#FFFFFF]"
        )}
      >
        <User className="w-3.5 h-3.5" />
        <span>{personLabel}</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={value === "COMPANY"}
        onClick={() => onChange("COMPANY")}
        className={cn(
          "flex items-center gap-2 px-5 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-300",
          "rounded-[2px]", // Esquinas al 10%
          value === "COMPANY"
            ? "bg-[#080A0A] text-[#FFFFFF] dark:bg-[#F8F8F6] dark:text-[#080A0A] font-medium shadow-sm"
            : "text-neutral-600 dark:text-neutral-400 hover:text-[#080A0A] dark:hover:text-[#FFFFFF]"
        )}
      >
        <Building2 className="w-3.5 h-3.5" />
        <span>{companyLabel}</span>
      </button>
    </div>
  );
};
