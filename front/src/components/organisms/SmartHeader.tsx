"use client";

import React, { useState } from "react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { NavItem } from "@/components/molecules/NavItem";
import { LangSwitcher } from "@/components/molecules/LangSwitcher";
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
          ? "bg-[#080A0A]/70 border-b border-transparent py-5"
          : "bg-[#080A0A]/95 border-b border-neutral-800/80 py-3.5 shadow-md"
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

          <span className="text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          <NavItem
            label={t.software}
            href="/software"
            divisionColor="software"
          />

          <span className="text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          <NavItem
            label={t.infrastructure}
            href="/infrastructure"
            divisionColor="infra"
          />

          <span className="text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          {/* Enlaces con desplazamiento suave (smooth scroll) */}
          <NavItem
            label={t.us}
            href="#nosotros"
            isScrollLink
          />

          <span className="text-neutral-700 select-none text-xs" aria-hidden="true">|</span>

          <NavItem
            label={t.contact}
            href="#contacto"
            isScrollLink
          />

          <span className="text-neutral-700 select-none text-xs ml-2 mr-1" aria-hidden="true">|</span>

          {/* Selector sutil de Idioma ES / EN */}
          <LangSwitcher
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
            className="ml-2"
          />
        </nav>

        {/* Boton Hamburguesa para moviles */}
        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitcher
            currentLocale={currentLocale}
            onLocaleChange={onLocaleChange}
          />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-[2px] border border-neutral-800"
            aria-label="Abrir Menú de Navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Desplegable Movil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080A0A] border-b border-neutral-800 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          <NavItem
            label={t.cybersecurity}
            href="/cybersecurity"
            divisionColor="cyber"
            className="w-full py-2"
          />
          <NavItem
            label={t.software}
            href="/software"
            divisionColor="software"
            className="w-full py-2"
          />
          <NavItem
            label={t.infrastructure}
            href="/infrastructure"
            divisionColor="infra"
            className="w-full py-2"
          />
          <div className="h-[1px] bg-neutral-800 my-1" />
          <NavItem
            label={t.us}
            href="#nosotros"
            isScrollLink
            className="w-full py-2"
          />
          <NavItem
            label={t.contact}
            href="#contacto"
            isScrollLink
            className="w-full py-2"
          />
        </div>
      )}
    </header>
  );
};
