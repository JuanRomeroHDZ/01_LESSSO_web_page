import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

/**
 * Componente Atomo Button
 * Cumple estrictamente con la geometria arquitectonica de esquinas al 10% (rounded-[3px])
 * Prohibido el uso de rounded-full o estilo pildora.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs tracking-wider",
      md: "px-6 py-3 text-sm tracking-widest",
      lg: "px-8 py-4 text-base tracking-widest",
    };

    const variantClasses = {
      primary:
        "bg-[#080A0A] text-[#FFFFFF] border border-[#A98242]/40 hover:border-[#A98242] hover:bg-[#080A0A]/90 transition-all duration-300 shadow-sm",
      secondary:
        "bg-transparent text-[#080A0A] dark:text-[#FFFFFF] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] transition-colors duration-300",
      gold:
        "bg-[#A98242] text-[#080A0A] font-medium border border-[#A98242] hover:bg-[#A98242]/90 transition-colors duration-300 shadow-sm",
      outline:
        "bg-transparent text-[#FFFFFF] border border-[#A98242] hover:bg-[#A98242]/10 transition-colors duration-300",
      white:
        "bg-[#F8F8F6] text-[#080A0A] font-medium border border-neutral-200 hover:bg-[#FFFFFF] transition-colors duration-300 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans font-light uppercase select-none transition-all duration-300",
          "rounded-[3px]", // Esquinas al 10%
          sizeClasses[size],
          variantClasses[variant],
          disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-[0.99]",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
