import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display" | "xl" | "lg" | "md" | "sm";
  italicAccent?: boolean;
}

/**
 * Tipografia Editorial para Titulos y Marca (Lora Serif)
 * Combina pesos regulares con acentos en cursiva para autoridad corporativa.
 */
export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  size = "md",
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    display: "text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-normal",
    xl: "text-3xl md:text-5xl leading-[1.15] font-normal",
    lg: "text-2xl md:text-4xl leading-[1.2] font-normal",
    md: "text-xl md:text-2xl leading-[1.3] font-normal",
    sm: "text-lg md:text-xl leading-[1.4] font-normal",
  };

  return (
    <Component
      className={cn(
        "font-serif tracking-tight",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "subtle" | "caption" | "lead";
  weight?: "thin" | "extralight" | "light" | "regular";
}

/**
 * Tipografia Geometrica para Cuerpo y UI (Poppins Sans)
 * Variantes delgadas (Thin 100, ExtraLight 200, Light 300, Regular 400).
 */
export const Text: React.FC<TextProps> = ({
  variant = "body",
  weight = "light",
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    lead: "text-base md:text-lg leading-relaxed",
    body: "text-sm md:text-base leading-relaxed",
    subtle: "text-xs md:text-sm leading-relaxed text-neutral-400",
    caption: "text-xs uppercase tracking-widest text-neutral-400",
  };

  const weightClasses = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    regular: "font-normal",
  };

  return (
    <p
      className={cn(
        "font-sans",
        variantClasses[variant],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
