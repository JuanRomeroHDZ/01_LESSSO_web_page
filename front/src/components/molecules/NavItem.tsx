import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  label: string;
  href: string;
  divisionColor?: "cyber" | "software" | "infra";
  isScrollLink?: boolean;
  className?: string;
  onNavigate?: () => void;
}

/**
 * Componente Molecula NavItem
 * Elemento de navegacion con micro-interacciones:
 * - Destello divisional sutil al pasar el cursor (Cyber: #240B0B, Software: #081416, Infra: #0C1024).
 * - Enlaces de seccion ejecutan scroll suave.
 */
export const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  divisionColor,
  isScrollLink = false,
  className,
  onNavigate,
}) => {
  const hoverStyles = {
    cyber: "hover:text-[#FFFFFF] hover:bg-[#240B0B]/80 hover:shadow-[0_0_12px_rgba(36,11,11,0.8)]",
    software: "hover:text-[#FFFFFF] hover:bg-[#081416]/90 hover:shadow-[0_0_12px_rgba(8,20,22,0.8)]",
    infra: "hover:text-[#FFFFFF] hover:bg-[#0C1024]/90 hover:shadow-[0_0_12px_rgba(12,16,36,0.8)]",
  };

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (isScrollLink && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleScrollClick}
      className={cn(
        "relative px-3 py-1.5 text-xs font-sans font-light uppercase tracking-widest text-[#080A0A]/75 dark:text-neutral-300 hover:text-[#080A0A] dark:hover:text-[#FFFFFF] transition-all duration-300",
        "rounded-[2px]", // Esquinas al 10%
        divisionColor && hoverStyles[divisionColor],
        !divisionColor && "hover:bg-[#EFECE6] dark:hover:bg-[#121616]",
        className
      )}
    >
      <span>{label}</span>
      {/* Indicador de trazo inferior ultra fino */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#A98242] transition-all duration-300 group-hover:w-full opacity-0 hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
};
