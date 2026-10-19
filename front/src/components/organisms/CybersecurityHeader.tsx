"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Locale } from "@/config/site-content";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface CybersecurityHeaderProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecurityHeader
 * Barra de navegación superior de ancho completo (Full-Width) especializada para /cybersecurity:
 * - Ocultamiento inteligente al desplazarse hacia abajo y reaparición inmediata al subir.
 * - Logotipo LESSSO a la izquierda que redirige al inicio (/).
 * - Navegación técnica exacta: | Próximamente | Penetration Testing | Enfoque | Contacto
 * - Sin botones de ES/EN ni Tema (van en el Footer de esta página).
 * - Cero emojis.
 */
export const CybersecurityHeader: React.FC<CybersecurityHeaderProps> = ({
  currentLocale,
}) => {
  const { scrollDirection, isTop } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHidden = scrollDirection === "down" && !isTop && !mobileMenuOpen;

  const navLinks = currentLocale === "es"
    ? [
        { label: "Próximamente", href: "/proximamente", isScroll: false },
        { label: "Penetration Testing", href: "/cybersecurity/penetration-testing", isScroll: false },
        { label: "Enfoque", href: "#enfoque", isScroll: true },
        { label: "Contacto", href: "#contact", isScroll: true },
      ]
    : [
        { label: "Coming Soon", href: "/proximamente", isScroll: false },
        { label: "Penetration Testing", href: "/cybersecurity/penetration-testing", isScroll: false },
        { label: "Approach", href: "#enfoque", isScroll: true },
        { label: "Contact", href: "#contact", isScroll: true },
      ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isScroll: boolean
  ) => {
    if (isScroll && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 backdrop-blur-md",
        isHidden ? "-translate-y-full" : "translate-y-0",
        isTop
          ? "bg-[#F8F8F6]/85 dark:bg-[#080A0A]/85 border-b border-neutral-300/60 dark:border-[#7A1C1C]/30 py-5"
          : "bg-[#F8F8F6]/95 dark:bg-[#080A0A]/95 border-b border-neutral-300/80 dark:border-[#7A1C1C]/40 py-3.5 shadow-sm dark:shadow-[0_4px_24px_rgba(36,11,11,0.4)]"
      )}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Izquierda: Logotipo LESSSO que redirige al inicio */}
        <div className="shrink-0 flex items-center gap-3">
          <BrandLogo mode="vector-font" color="white" />
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-[#7A1C1C] dark:text-[#A98242] uppercase pl-2 border-l border-neutral-300 dark:border-neutral-800">
            CIBERSEGURIDAD
          </span>
        </div>

        {/* Derecha: Estructura exacta con separadores | */}
        <nav
          className="hidden lg:flex items-center gap-1.5"
          aria-label="Navegación de Ciberseguridad"
        >
          <span className="text-neutral-400 dark:text-neutral-700 select-none text-xs mr-1" aria-hidden="true">
            |
          </span>

          {navLinks.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href, item.isScroll)}
                className="group relative px-3 py-1.5 text-xs font-sans font-light uppercase tracking-widest text-[#080A0A]/75 dark:text-neutral-300 hover:text-[#240B0B] dark:hover:text-[#FFFFFF] hover:bg-[#240B0B]/10 dark:hover:bg-[#240B0B]/70 rounded-[2px] transition-all duration-300 hover:shadow-[0_0_12px_rgba(122,28,28,0.3)]"
              >
                <span>{item.label}</span>
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#A98242] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
              {index < navLinks.length - 1 && (
                <span className="text-neutral-400 dark:text-neutral-700 select-none text-xs" aria-hidden="true">
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Boton Hamburguesa para Dispositivos Moviles */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-[2px] border border-neutral-300 dark:border-[#7A1C1C]/40 bg-neutral-100/50 dark:bg-[#240B0B]/40"
            aria-label="Abrir Menú de Navegación de Ciberseguridad"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Desplegable Movil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F8F6] dark:bg-[#080A0A] border-b border-neutral-200 dark:border-[#7A1C1C]/30 px-6 py-6 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href, item.isScroll)}
              className="px-3 py-2 text-xs font-sans font-light uppercase tracking-widest text-[#080A0A]/80 dark:text-neutral-300 hover:text-[#240B0B] dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-[#240B0B]/70 rounded-[2px] transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
