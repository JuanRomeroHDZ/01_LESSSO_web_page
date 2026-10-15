import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helper?: string;
  charCount?: {
    current: number;
    min?: number;
    max?: number;
  };
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente Molecula FormField
 * Contenedor estructurado para campos del formulario con contador en vivo y etiquetas accesibles
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  helper,
  charCount,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      <div className="flex items-center justify-between text-xs font-sans tracking-wider">
        <label className="text-neutral-300 font-light uppercase">
          {label} {required && <span className="text-[#A98242]">*</span>}
        </label>
        {charCount && (
          <span
            className={cn(
              "text-[11px] tabular-nums",
              charCount.min && charCount.current < charCount.min
                ? "text-neutral-500"
                : charCount.max && charCount.current > charCount.max
                ? "text-red-400 font-medium"
                : "text-[#A98242]"
            )}
          >
            {charCount.current} / {charCount.max || 500}
          </span>
        )}
      </div>

      <div className="relative">{children}</div>

      {helper && !error && (
        <span className="text-[11px] text-neutral-400 font-light">{helper}</span>
      )}

      {error && (
        <span className="flex items-center gap-1.5 text-xs text-red-400 font-light mt-0.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};
