"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { DiagonalLightRays } from "@/components/atoms/DiagonalLightRays";
import { Locale } from "@/config/site-content";

export interface CybersecuritySpecialtiesSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecuritySpecialtiesSection
 * Sección 02: Especialidades y Acceso a Penetration Testing (#especialidades).
 * - Bloque Principal (Activo): Penetration Testing con botón a /cybersecurity/penetration-testing.
 * - Bloque Secundario (En Desarrollo): Hardening y Defensa Activa con badge PROXIMAMENTE y link a 404 (/proximamente).
 * - Estética 70% Rojo Oscuro (#240B0B / #7A1C1C) / 30% Dorado (#A98242).
 * - Rayos Diagonales de fondo y esquinas al 10% (rounded-[3px]).
 * - Cero emojis.
 */
export const CybersecuritySpecialtiesSection: React.FC<CybersecuritySpecialtiesSectionProps> = ({
  currentLocale,
}) => {
  const isEs = currentLocale === "es";

  return (
    <section
      id="especialidades"
      className="py-28 px-6 md:px-12 lg:px-16 bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-300 relative border-t border-neutral-300/80 dark:border-[#7A1C1C]/20 overflow-hidden"
    >
      {/* Rayos diagonales de fondo (70% Rojo Oscuro / 30% Dorado Oscuro) */}
      <DiagonalLightRays variant="cybersecurity" opacity={0.35} />

      {/* Resplandores ambientales de profundidad */}
      <div
        className="pointer-events-none absolute top-1/3 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(122,28,28,0.1)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(169,130,66,0.1)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Encabezado Editorial */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1.5px] bg-[#7A1C1C] dark:bg-[#A98242]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A1C1C] dark:text-[#A98242] font-medium">
              {isEs ? "02 // ESPECIALIDADES DE LA DIVISION" : "02 // DIVISION SPECIALTIES"}
            </span>
          </div>

          <Heading as="h2" size="xl" className="font-normal mb-6 text-[#080A0A] dark:text-[#FFFFFF]">
            {isEs ? (
              <>
                Líneas técnicas para la{" "}
                <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                  resiliencia y contención
                </span>{" "}
                de amenazas.
              </>
            ) : (
              <>
                Technical lines designed for{" "}
                <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                  resilience and threat containment
                </span>
                .
              </>
            )}
          </Heading>

          <Text variant="lead" className="text-[#080A0A]/75 dark:text-neutral-300 font-light leading-relaxed">
            {isEs
              ? "Evaluamos la seguridad de sus sistemas para identificar vulnerabilidades y ayudarle a priorizar su corrección."
              : "We assess the security of your systems to identify vulnerabilities and help you prioritize fixes."}
          </Text>
        </div>

        {/* Grilla de los 2 Bloques Arquitectónicos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bloque Principal (Activo): Penetration Testing (7 cols) */}
          <div className="lg:col-span-12 group relative flex flex-col justify-between p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#0D1010] border border-[#7A1C1C]/40 dark:border-[#7A1C1C]/40 hover:border-[#7A1C1C] dark:hover:border-[#A98242] rounded-[3px] transition-all duration-300 shadow-sm hover:shadow-[0_8px_32px_rgba(122,28,28,0.2)]">
            <div>
              {/* Badge y Estado */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#240B0B]/10 dark:bg-[#240B0B] border border-[#7A1C1C]/40 rounded-[2px] text-[#7A1C1C] dark:text-[#A98242]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-[#7A1C1C] dark:text-[#A98242] uppercase font-medium">
                    {isEs ? "DISPONIBLE // LINEA PRINCIPAL" : "AVAILABLE // PRIMARY LINE"}
                  </span>
                </div>
                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-[#240B0B]/10 dark:bg-[#240B0B]/60 text-[#7A1C1C] dark:text-[#A98242] border border-[#7A1C1C]/30 rounded-[2px]">
                  {isEs ? "ACTIVO" : "ACTIVE"}
                </span>
              </div>

              {/* Título en Lora */}
              <Heading as="h3" size="lg" className="font-normal text-[#080A0A] dark:text-[#FFFFFF] mb-4">
                Penetration Testing (Seguridad Ofensiva)
              </Heading>

              <Text className="text-[#080A0A]/75 dark:text-neutral-300 font-light leading-relaxed mb-8 text-sm md:text-base">
                {isEs
                  ? "Pruebas de intrusión controladas sobre aplicaciones web, APIs, redes corporativas, infraestructuras en la nube y servidores críticos. Ejecutamos vectores de ataque del mundo real bajo esquemas de caja negra, gris y blanca con discreción y un alcance acordado con su equipo."
                  : "Controlled penetration tests across web applications, APIs, enterprise networks, cloud assets, and critical servers. We execute real-world attack vectors under black, gray, and white box models with discretion and a scope agreed with your team."}
              </Text>

              {/* Puntos de Valor Técnico */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-900/80 mb-10 text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#7A1C1C] dark:bg-[#A98242] rounded-[1px]" />
                  <span>{isEs ? "Simulación de Adversario Real" : "Real Adversary Simulation"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#7A1C1C] dark:bg-[#A98242] rounded-[1px]" />
                  <span>{isEs ? "OWASP Top 10 & API Security" : "OWASP Top 10 & API Security"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#7A1C1C] dark:bg-[#A98242] rounded-[1px]" />
                  <span>{isEs ? "Detección de fallas de seguridad" : "Internal Logic Flaw Discovery"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#7A1C1C] dark:bg-[#A98242] rounded-[1px]" />
                  <span>{isEs ? "Reporte Ejecutivo y de Remediación" : "Executive & Remediation Blueprint"}</span>
                </div>
              </div>
            </div>

            {/* Botón Prominente con Esquinas al 10% */}
            <div>
              <Link
                href="#contacto"
                className="inline-flex items-center justify-between w-full sm:w-auto gap-4 px-8 py-4 bg-[#240B0B] text-[#F8F8F6] hover:bg-[#3D1212] dark:bg-[#7A1C1C] dark:hover:bg-[#9E2A2B] font-sans text-xs uppercase tracking-widest font-medium rounded-[3px] transition-all duration-300 shadow-md group/btn"
              >
                <span>
                  {isEs ? "Consultar sobre Penetration Testing" : "Ask about Penetration Testing"}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Borde inferior decorativo */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A1C1C] dark:bg-[#A98242] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              aria-hidden="true"
            />
          </div>


        </div>
      </div>
    </section>
  );
};
