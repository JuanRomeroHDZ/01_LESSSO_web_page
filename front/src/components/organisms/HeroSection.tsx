"use client";

import React from "react";
import { ArrowDown, Shield, Code, Server } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { GoldLine } from "@/components/atoms/GoldLine";
import { Spotlight } from "@/components/atoms/Spotlight";
import { CelestialSunburst } from "@/components/atoms/CelestialSunburst";
import { Locale, SITE_CONTENT } from "@/config/site-content";

export interface HeroSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo HeroSection
 * Seccion de apertura de alto impacto a ancho completo (Full-Width):
 * - Layout de dos columnas (7 columnas contenido / 5 columnas sol celestial).
 * - Tipografia Lora con acentos en cursiva (italic).
 * - Subtitulo en Poppins Light de tono corporativo y cercano.
 * - Atomo CelestialSunburst con ciclo de suspiro de 7 segundos.
 * - Indicador arquitectonico de scroll con linea fina en dorado (#A98242).
 * - Cero emojis.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ currentLocale }) => {
  const t = SITE_CONTENT[currentLocale].hero;

  const scrollToContact = () => {
    const contactElem = document.getElementById("contacto");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToUs = () => {
    const usElem = document.getElementById("nosotros");
    if (usElem) {
      usElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 lg:px-16 bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-200 overflow-hidden w-full">
      {/* Resplandor ambiental radial difuminado al 3% */}
      <Spotlight className="opacity-20 dark:opacity-35" />

      {/* Contenido Central: Layout de 2 Columnas a Ancho Completo */}
      <div className="w-full z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Columna Izquierda: 7 columnas de jerarquia editorial */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pre-titulo arquitectonico */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#A98242]" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A98242] font-medium">
                {t.pretitle}
              </span>
            </div>

            {/* Titulo Maestro en Lora con cursivas editoriales */}
            <Heading as="h1" size="display" className="text-[#080A0A] dark:text-[#FFFFFF] mb-8 font-normal max-w-3xl">
              {t.titleLine1}{" "}
              <span className="italic font-normal text-[#240B0B] dark:text-[#F8F8F6]">
                {t.titleLine2Italic}
              </span>{" "}
              {t.titleLine3}
            </Heading>

            {/* Subtitulo Tecnico y Cercano en Poppins Light */}
            <Text
              variant="lead"
              weight="light"
              className="text-[#080A0A]/75 dark:text-neutral-300 max-w-2xl mb-10 font-light leading-relaxed text-base md:text-lg"
            >
              {t.subtitle}
            </Text>

            {/* Botones de Accion Principal y Secundaria (Esquinas al 10%) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToContact}
                className="group bg-[#080A0A] text-[#FFFFFF] dark:bg-[#080A0A] dark:text-[#FFFFFF] border-[#A98242]/50 hover:border-[#A98242]"
              >
                <span>{t.ctaPrimary}</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToUs}
                className="text-[#080A0A] dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-[#A98242]"
              >
                <span>{t.ctaSecondary}</span>
              </Button>
            </div>

            {/* Micro-indicadores de Divisiones Tecnicas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-10 border-t border-neutral-200 dark:border-neutral-900 w-full text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">Blindaje de Infraestructura</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-4 h-4 text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">Desarrollo Crítico sin Brechas</span>
              </div>
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">Arquitectura Cloud Resiliente</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: 5 columnas con el Sol Celestial animado (Oculto en movil) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full overflow-visible">
            <CelestialSunburst />
          </div>
        </div>
      </div>

      {/* Indicador Arquitectonico de Scroll a todo el ancho */}
      <div className="w-full flex items-center justify-between pt-10 z-10 text-neutral-500 text-xs font-sans">
        <div className="flex items-center gap-3">
          <span className="tracking-widest uppercase text-[11px] font-light">
            {t.scrollHint}
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#A98242] animate-bounce" />
        </div>

        <GoldLine orientation="horizontal" className="w-24 opacity-40 hidden sm:block" />
      </div>
    </section>
  );
};
