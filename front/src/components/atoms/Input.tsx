import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

/**
 * Componente Atomo Input
 * Estrictamente esquinas al 10% (rounded-[3px]), sin bordes estilo pildora.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-4 py-3 text-sm font-sans font-light",
          "rounded-[3px]", // Esquinas al 10%
          "bg-[#F8F8F6] dark:bg-[#080A0A]/40 text-[#080A0A] dark:text-[#FFFFFF] placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
          "border border-neutral-300 dark:border-neutral-800 transition-all duration-200 outline-none",
          "focus:border-[#A98242] focus:ring-1 focus:ring-[#A98242]/30",
          hasError && "border-red-500/80 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
