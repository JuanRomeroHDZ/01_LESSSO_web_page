import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: (string | SelectOption)[];
  placeholder?: string;
  hasError?: boolean;
}

/**
 * Componente Atomo Select
 * Estilo arquitectonico con icono vectorial ChevronDown y esquinas al 10%.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, hasError = false, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-3 text-sm font-sans font-light appearance-none",
            "rounded-[3px]", // Esquinas al 10%
            "bg-[#F8F8F6] dark:bg-[#080A0A]/40 text-[#080A0A] dark:text-[#FFFFFF]",
            "border border-neutral-300 dark:border-neutral-800 transition-all duration-200 outline-none pr-10",
            "focus:border-[#A98242] focus:ring-1 focus:ring-[#A98242]/30",
            hasError && "border-red-500/80 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#FFFFFF] dark:bg-[#080A0A] text-neutral-400 dark:text-neutral-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val} className="bg-[#FFFFFF] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF]">
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
          <ChevronDown className="w-4 h-4 text-[#A98242]" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
