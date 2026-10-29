"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ShieldAlert, Cpu, Terminal, ArrowRight } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { GoldLine } from "@/components/atoms/GoldLine";
import { BreachCorePrism } from "@/components/atoms/BreachCorePrism";
import { Locale } from "@/config/site-content";

export interface CybersecurityHeroProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecurityHero
 * Hero Section a ancho completo (Full-Width) con layout invertido:
 * - Columna Izquierda (5 cols, hidden lg:flex): Atomo BreachCorePrism (El Prisma de Intrusion).
 * - Columna Derecha (7 cols): Jerarquia editorial en Lora y Poppins Light.
 * - Modo Normal (#F8F8F6) por defecto y Modo Oscuro (#080A0A).
 * - Botones con esquinas al 10% (rounded-[3px]).
 * - Sin rayos diagonales en esta seccion Hero.
 * - Cero emojis.
 */
export const CybersecurityHero: React.FC<CybersecurityHeroProps> = ({ currentLocale }) => {
  const isEs = currentLocale === "es";

  const scrollToContact = () => {
    const contactElem = document.getElementById("contact") || document.getElementById("contacto");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 lg:px-16 bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-300 overflow-hidden w-full"
    >
      {/* Atmósfera difuminada de fondo en tonos rojo sutil y dorado */}
      <div
        className="pointer-events-none absolute top-10 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(122,28,28,0.12)_0%,rgba(248,248,246,0)_70%)] dark:bg-[radial-gradient(circle,rgba(36,11,11,0.85)_0%,rgba(8,10,10,0)_70%)] blur-3xl opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-1/4 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(169,130,66,0.15)_0%,rgba(248,248,246,0)_70%)] dark:bg-[radial-gradient(circle,rgba(169,130,66,0.12)_0%,rgba(8,10,10,0)_70%)] blur-3xl opacity-40"
        aria-hidden="true"
      />

      {/* Contenido Central: Layout Invertido de 2 Columnas (5 cols Izq / 7 cols Der) */}
      <div className="w-full z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Columna Izquierda: 5 columnas con el Prisma de Intrusión (Oculto en móvil) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full overflow-visible">
            <BreachCorePrism />
          </div>

          {/* Columna Derecha: 7 columnas con Contenido Principal Editorial */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Etiqueta superior con línea dorada/roja */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1.5px] bg-[#7A1C1C] dark:bg-[#A98242]" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A1C1C] dark:text-[#A98242] font-medium">
                {isEs
                  ? "DIVISION DE CIBERSEGURIDAD E INGENIERIA DE DEFENSA"
                  : "CYBERSECURITY & DEFENSE ENGINEERING DIVISION"}
              </span>
            </div>

            {/* Título Maestro en Lora con cursivas editoriales */}
            <Heading as="h1" size="display" className="text-[#080A0A] dark:text-[#FFFFFF] mb-8 font-normal max-w-3xl">
              {isEs ? (
                <>
                  Seguridad para{" "}
                  <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                    sus sistemas
                  </span>{" "}
                  y su información.
                </>
              ) : (
                <>
                  Security for{" "}
                  <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                    your systems
                  </span>{" "}
                  and your information.
                </>
              )}
            </Heading>

            {/* Subtítulo General en Poppins Light */}
            <Text
              variant="lead"
              weight="light"
              className="text-[#080A0A]/75 dark:text-neutral-300 max-w-2xl mb-10 font-light leading-relaxed text-base md:text-lg"
            >
              {isEs
                ? "Identificamos vulnerabilidades en sus sistemas y le ayudamos a entender los riesgos y las acciones necesarias para reducirlos."
                : "We uncover critical breaches and vulnerabilities before adversaries exploit them. We reinforce your technological infrastructure and digital assets through methodical rigor, offensive engineering, and absolute technical transparency."}
            </Text>

            {/* Botones de Acción con Esquinas al 10% (rounded-[3px]) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="#especialidades"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#240B0B] text-[#F8F8F6] hover:bg-[#3D1212] dark:bg-[#7A1C1C] dark:hover:bg-[#9E2A2B] font-sans text-xs uppercase tracking-widest font-medium rounded-[3px] transition-all duration-300 shadow-md group border border-[#240B0B] dark:border-[#7A1C1C]"
              >
                <span>
                  {isEs ? "Explorar Penetration Testing" : "Explore Penetration Testing"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#080A0A] dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-[#7A1C1C] dark:hover:border-[#A98242] hover:bg-neutral-100/60 dark:hover:bg-[#0D1010] font-sans text-xs uppercase tracking-widest font-normal rounded-[3px] transition-all duration-300"
              >
                <span>
                  {isEs ? "Solicitar Diagnóstico" : "Request Diagnostic Assessment"}
                </span>
              </button>
            </div>

            {/* Micro-indicadores Técnicos de Ciberseguridad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-10 border-t border-neutral-200 dark:border-neutral-900 w-full text-xs font-sans text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-[#7A1C1C] dark:text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">
                  {isEs ? "Auditoría Ofensiva Integral" : "Comprehensive Offensive Audit"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#7A1C1C] dark:text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">
                  {isEs ? "Estándares PTES & OWASP" : "PTES & OWASP Standards"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-[#7A1C1C] dark:text-[#A98242] shrink-0" />
                <span className="font-light tracking-wide">
                  {isEs ? "Defensa Asistida por IA" : "AI-Augmented Defense"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador Arquitectónico de Scroll */}
      <div className="w-full flex items-center justify-between pt-10 z-10 text-neutral-500 dark:text-neutral-500 text-xs font-sans">
        <div className="flex items-center gap-3">
          <span className="tracking-widest uppercase text-[11px] font-light">
            {isEs ? "Desplazar para explorar" : "Scroll to explore"}
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#7A1C1C] dark:text-[#A98242] animate-bounce" />
        </div>

        <GoldLine orientation="horizontal" className="w-24 opacity-40 hidden sm:block" />
      </div>
    </section>
  );
};
