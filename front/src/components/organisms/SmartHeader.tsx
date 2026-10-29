"use client";

import React, { useState } from "react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { NavItem } from "@/components/molecules/NavItem";
import { CompactControls } from "@/components/molecules/CompactControls";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Locale, SITE_CONTENT } from "@/config/site-content";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface SmartHeaderProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

/**
 * Componente Organismo SmartHeader
 * - Logotipo alineado a la izquierda (nunca centrado).
 * - Navegacion a la derecha con separadores finos.
 * - Ocultamiento suave al hacer scroll hacia abajo y reaparicion inmediata al subir.
 * - Sin boton de Login (documentado en PENDIENTES.md para la Fase 2).
 * - Dos botones compactos (Idioma + Tema) al final del menu en Inicio.
 */
export const SmartHeader: React.FC<SmartHeaderProps> = ({
  currentLocale,
  onLocaleChange,
}) => {
  const { scrollDirection, isTop } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = SITE_CONTENT[currentLocale].nav;

  // Determinar si el header se oculta o se muestra
  const isHidden = scrollDirection === "down" && !isTop && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 backdrop-blur-md",
        isHidden ? "-translate-y-full" : "translate-y-0",
        isTop
          ? "bg-[#F8F8F6]/85 dark:bg-[#080A0A]/70 border-b border-transparent py-5"
          : "bg-[#F8F8F6]/95 dark:bg-[#080A0A]/95 border-b border-neutral-300/80 dark:border-neutral-800/80 py-3.5 shadow-sm dark:shadow-md"
      )}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logotipo a la izquierda (nunca centrado) */}
        <div className="shrink-0">
          <BrandLogo mode="vector-font" color="white" />
        </div>

        {/* Navegacion de Escritorio con separadores verticales finos */}
        <nav
          className="hidden lg:flex items-center gap-1.5"
          aria-label="Navegación Principal"
        >
          {/* Enlaces de Divisiones Técnicas hacia 404 con destellos cromáticos en hover */}
          <NavItem
            label={t.cybersecurity}
            href="/cybersecurity"
            divisionColor="cyber"
          />

          <span className="text-neutral-400 dark:text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          {/* Enlaces con desplazamiento suave (smooth scroll) */}
          <NavItem
            label={t.us}
            href="#nosotros"
            isScrollLink
          />

          <span className="text-neutral-400 dark:text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          <NavItem
            label={t.contact}
            href="#contacto"
            isScrollLink
          />

          <span className="text-neutral-400 dark:text-neutral-700 select-none text-xs ml-2 mr-1" aria-hidden="true">|</span>

          {/* Controles Compactos de Idioma (ES/EN) y Tema (Claro/Oscuro) */}
          <CompactControls
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
            className="ml-2"
          />
        </nav>

        {/* Boton Hamburguesa y controles para moviles */}
        <div className="flex items-center gap-2 lg:hidden">
          <CompactControls
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-11 min-h-11 flex items-center justify-center p-2 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-[2px] border border-neutral-300 dark:border-neutral-800"
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Desplegable Movil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F8F6] dark:bg-[#080A0A] border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          <NavItem
            label={t.cybersecurity}
            href="/cybersecurity"
            divisionColor="cyber"
            className="w-full min-h-11 flex items-center py-2"
            onNavigate={() => setMobileMenuOpen(false)}
          />
          <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 my-1" />
          <NavItem
            label={t.us}
            href="#nosotros"
            isScrollLink
            className="w-full min-h-11 flex items-center py-2"
            onNavigate={() => setMobileMenuOpen(false)}
          />
          <NavItem
            label={t.contact}
            href="#contacto"
            isScrollLink
            className="w-full min-h-11 flex items-center py-2"
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};
