"use client";

import React, { useState } from "react";
import { SmartHeader } from "@/components/organisms/SmartHeader";
import { Footer } from "@/components/organisms/Footer";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { Locale } from "@/config/site-content";

export interface PageLayoutProps {
  children: (props: { currentLocale: Locale; setLocale: (loc: Locale) => void }) => React.ReactNode;
}

/**
 * Componente Template PageLayout
 * Estructura la pagina principal integrando el SmartHeader reactivo,
 * la textura de grano editorial y el Footer corporativo.
 */
export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>("es");

  return (
    <div className="min-h-screen bg-[#080A0A] text-[#FFFFFF] flex flex-col relative selection:bg-[#A98242] selection:text-[#080A0A]">
      {/* Grano Editorial (Matte Film Grain) al 3.5% */}
      <FilmGrain opacity={0.035} />

      {/* Header Inteligente */}
      <SmartHeader
        currentLocale={currentLocale}
        onLocaleChange={setCurrentLocale}
      />

      {/* Contenido Principal */}
      <main className="flex-1 w-full">
        {children({ currentLocale, setLocale: setCurrentLocale })}
      </main>

      {/* Pie de Pagina Corporativo */}
      <Footer currentLocale={currentLocale} />
    </div>
  );
};
