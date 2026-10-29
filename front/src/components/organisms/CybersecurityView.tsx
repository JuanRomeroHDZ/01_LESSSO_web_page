"use client";

import React, { useEffect, useState } from "react";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { CybersecurityHeader } from "@/components/organisms/CybersecurityHeader";
import { CybersecurityHero } from "@/components/organisms/CybersecurityHero";
import { CybersecurityApproachSection } from "@/components/organisms/CybersecurityApproachSection";
import { CybersecuritySpecialtiesSection } from "@/components/organisms/CybersecuritySpecialtiesSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { Locale } from "@/config/site-content";

/**
 * Componente Organismo CybersecurityView
 * Vista completa e interactiva para el Hub General de Ciberseguridad (/cybersecurity):
 * - Modo Normal (#F8F8F6) por defecto y Modo Oscuro (#080A0A) conmutable.
 * - Header inteligente sin botones de idioma/tema (ubicados en el footer).
 * - Hero invertido con átomo BreachCorePrism a la izquierda (oculto en móviles).
 * - Sección 01: Nuestro Enfoque (#enfoque) con rayos diagonales de fondo.
 * - Sección 02: Especialidades y Acceso a Penetration Testing (#especialidades) con rayos diagonales.
 * - Sección 03: Contacto (#contact) con preselección de Ciberseguridad.
 * - Footer dinámico con enlaces actualizados y controles compactos (ES/EN y Tema).
 * - Cero emojis.
 */
export const CybersecurityView: React.FC = () => {
  const [currentLocale, setCurrentLocale] = useState<Locale>("es");
  useEffect(() => { document.documentElement.lang = currentLocale; }, [currentLocale]);

  return (
    <div
      id="top"
      className="min-h-screen bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-300 flex flex-col relative selection:bg-[#A98242] selection:text-[#080A0A]"
    >
      {/* Grano Editorial (Matte Film Grain) al 3.5% */}
      <FilmGrain opacity={0.035} />

      {/* Header Específico de Ciberseguridad (Full-Width, sin controles) */}
      <CybersecurityHeader currentLocale={currentLocale} />

      {/* Contenido Principal de Ciberseguridad */}
      <main className="flex-1 w-full">
        {/* Hero Section (Sin rayos de fondo) */}
        <CybersecurityHero currentLocale={currentLocale} />

        {/* Sección 01: Nuestro Enfoque en Ciberseguridad (#enfoque con rayos de fondo) */}
        <CybersecurityApproachSection currentLocale={currentLocale} />

        {/* Sección 02: Especialidades y Acceso a Penetration Testing (#especialidades con rayos de fondo) */}
        <CybersecuritySpecialtiesSection currentLocale={currentLocale} />

        {/* Sección 03: Contacto (#contact con rayos de fondo) */}
        <ContactSection
          currentLocale={currentLocale}
          isCybersecurity={true}
          defaultArea="Ciberseguridad"
        />
      </main>

      {/* Pie de Página Corporativo con Navegación Adaptada y Controles de Idioma/Tema */}
      <Footer
        currentLocale={currentLocale}
        onLocaleChange={setCurrentLocale}
        isCybersecurity={true}
      />
    </div>
  );
};
