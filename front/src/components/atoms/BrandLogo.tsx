import React from "react";
import Image from "next/image";
import Link from "next/link";
import { THEME_PALETTE } from "@/config/theme-palette";
import { cn } from "@/lib/utils";

export type LogoMode = "vector-svg" | "vector-font" | "image-png";
export type LogoColor = "white" | "black" | "gold";

export interface BrandLogoProps {
  mode?: LogoMode;
  color?: LogoColor;
  className?: string;
  showUnderline?: boolean;
}

/**
 * Componente Atomo BrandLogo
 * Alineado a la izquierda en Header (nunca centrado).
 * Soporta SVG vectorial, tipografia Lora vectorial, e imagen en proporcion 4:1 (1200x300).
 * Soporta variantes cromaticas: Blanco (#FFFFFF), Negro (#080A0A) y Dorado Oscuro (#A98242).
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  mode = "vector-font",
  color = "white",
  className,
  showUnderline = true,
}) => {
  const colorMap = {
    white: {
      text: "text-[#080A0A] dark:text-[#FFFFFF]",
      fill: "#FFFFFF",
      svgPath: THEME_PALETTE.logos.white,
    },
    black: {
      text: "text-[#080A0A]",
      fill: "#080A0A",
      svgPath: THEME_PALETTE.logos.black,
    },
    gold: {
      text: "text-[#A98242]",
      fill: "#A98242",
      svgPath: THEME_PALETTE.logos.gold,
    },
  };

  const activeColor = colorMap[color];

  // 1. Renderizado por Imagen (Proporcion 4:1, ej. 1200x300px)
  if (mode === "image-png") {
    return (
      <Link href="/" className={cn("inline-block text-left select-none", className)}>
        <Image
          src={activeColor.svgPath}
          alt="LESSSO Logotipo Corporativo"
          width={160}
          height={40}
          priority
          className="object-contain"
        />
      </Link>
    );
  }

  // 2. Renderizado por archivo vectorial SVG directo
  if (mode === "vector-svg") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center text-left select-none", className)}
        aria-label="LESSSO Inicio"
      >
        <Image
          src={activeColor.svgPath}
          alt="LESSSO"
          width={150}
          height={38}
          priority
          className="object-contain"
        />
      </Link>
    );
  }

  // 3. Renderizado Vectorial con Tipografia Lora y linea arquitectonica dorada
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start text-left select-none group",
        className
      )}
      aria-label="LESSSO - Inicio"
    >
      <span
        className={cn(
          "font-serif font-bold text-2xl tracking-[0.25em] transition-colors duration-300",
          activeColor.text
        )}
      >
        LESSSO
      </span>
      {showUnderline && (
        <span
          className="h-[1.5px] w-full max-w-[90px] bg-[#A98242] transition-all duration-300 group-hover:max-w-full"
          aria-hidden="true"
        />
      )}
    </Link>
  );
};
