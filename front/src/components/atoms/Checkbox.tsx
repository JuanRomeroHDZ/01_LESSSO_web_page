import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
}

/**
 * Componente Atomo Checkbox
 * Diseno minimalista con esquinas al 10% y checkmark vectorial
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, hasError = false, checked, onChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "w-4 h-4 flex items-center justify-center transition-all duration-200",
            "rounded-[2px]", // Esquinas al 10%
            "border border-neutral-700 bg-[#080A0A]/60",
            "peer-checked:border-[#A98242] peer-checked:bg-[#A98242]",
            "peer-focus:ring-1 peer-focus:ring-[#A98242]/40",
            hasError && "border-red-500",
            className
          )}
        >
          <Check className="w-3 h-3 text-[#080A0A] stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
