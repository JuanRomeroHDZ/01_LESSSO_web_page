import React from "react";
import { CheckCircle2, Search, Compass, Activity } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { GoldLine } from "@/components/atoms/GoldLine";
import { Locale, SITE_CONTENT } from "@/config/site-content";

export interface TrustPillarsSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo TrustPillarsSection (Seccion "Us" / Nosotros)
 * Despliega los 3 Pilares de Confianza con inversion de color por bloque:
 * - Pilar 1: El Problema que Resolvemos (Fondo Negro #080A0A)
 * - Pilar 2: Filosofia / Mision y Vision (Alto Contraste: un bloque negro y un bloque blanco #F8F8F6)
 * - Pilar 3: Transparencia y Proceso (Fondo Blanco #F8F8F6 con texto negro y detalles en #A98242)
 */
export const TrustPillarsSection: React.FC<TrustPillarsSectionProps> = ({
  currentLocale,
}) => {
  const t = SITE_CONTENT[currentLocale].pillars;

  return (
    <div id="nosotros" className="w-full">
      {/* -------------------------------------------------------------------- */}
      {/* PILAR 1: EL PROBLEMA QUE RESOLVEMOS (Fondo Negro #080A0A)             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 bg-[#080A0A] text-[#FFFFFF] relative">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado de Seccion */}
          <div className="flex flex-col items-start mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A98242] mb-3">
              {t.sectionBadge}
            </span>
            <Heading as="h2" size="xl" className="font-normal max-w-3xl">
              {t.sectionTitle}{" "}
              <span className="font-serif italic font-normal text-[#A98242]">
                {t.sectionTitleBrand}
              </span>
            </Heading>
            <GoldLine className="mt-8 max-w-xs opacity-60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Columna Izquierda: Identificador numerico e introduccion */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="font-serif text-6xl text-[#A98242]/30 font-light mb-2">
                {t.pillar1.number}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-[#A98242] mb-4">
                {t.pillar1.label}
              </span>
              <Heading as="h3" size="lg" className="text-[#FFFFFF] mb-6">
                {t.pillar1.title}
              </Heading>
            </div>

            {/* Columna Derecha: Explicacion profunda y puntos de valor */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <Text variant="lead" className="text-neutral-300 font-light leading-relaxed">
                {t.pillar1.description}
              </Text>

              <div className="flex flex-col gap-4 pt-4 border-t border-neutral-900">
                {t.pillar1.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A98242] shrink-0 mt-1" />
                    <span className="font-sans text-sm text-neutral-300 font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* PILAR 2: NUESTRA FILOSOFIA (Bloques en Alto Contraste Negro / Blanco)  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 bg-[#080A0A] border-t border-neutral-900 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start mb-16">
            <span className="font-serif text-6xl text-[#A98242]/30 font-light mb-2">
              {t.pillar2.number}
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#A98242] mb-3">
              {t.pillar2.label}
            </span>
            <Heading as="h3" size="xl" className="text-[#FFFFFF]">
              {t.pillar2.title}
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloque Mision: Fondo Negro (#080A0A) con acentos dorados */}
            <div className="p-8 md:p-12 bg-[#080A0A] border border-[#A98242]/30 rounded-[3px] flex flex-col justify-between shadow-sm">
              <div>
                <span className="inline-block px-3 py-1 bg-neutral-900 text-[#A98242] text-[11px] font-sans tracking-widest uppercase rounded-[2px] mb-6">
                  {t.pillar2.missionCard.tag}
                </span>
                <Heading as="h4" size="md" className="text-[#FFFFFF] mb-4 font-normal">
                  {t.pillar2.missionCard.heading}
                </Heading>
                <Text variant="body" className="text-neutral-300 font-light leading-relaxed">
                  {t.pillar2.missionCard.text}
                </Text>
              </div>

              <div className="w-12 h-[1px] bg-[#A98242] mt-10" />
            </div>

            {/* Bloque Vision: Fondo Blanco Editorial (#F8F8F6) con texto negro */}
            <div className="p-8 md:p-12 bg-[#F8F8F6] text-[#080A0A] border border-neutral-200 rounded-[3px] flex flex-col justify-between shadow-md">
              <div>
                <span className="inline-block px-3 py-1 bg-white text-[#080A0A] border border-neutral-300 text-[11px] font-sans tracking-widest uppercase rounded-[2px] mb-6 font-medium">
                  {t.pillar2.visionCard.tag}
                </span>
                <Heading as="h4" size="md" className="text-[#080A0A] mb-4 font-normal">
                  {t.pillar2.visionCard.heading}
                </Heading>
                <Text variant="body" className="text-neutral-700 font-light leading-relaxed">
                  {t.pillar2.visionCard.text}
                </Text>
              </div>

              <div className="w-12 h-[1px] bg-[#A98242] mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* PILAR 3: TRANSPARENCIA Y PROCESO (Inversion a Fondo Blanco #F8F8F6)  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F8F6] text-[#080A0A] relative border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start mb-16">
            <span className="font-serif text-6xl text-[#A98242]/40 font-light mb-2">
              {t.pillar3.number}
            </span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#A98242] mb-3 font-medium">
              {t.pillar3.label}
            </span>
            <Heading as="h3" size="xl" className="text-[#080A0A]">
              {t.pillar3.title}
            </Heading>
            <div className="w-24 h-[1px] bg-[#A98242] mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Etapa 1 */}
            <div className="p-8 bg-[#FFFFFF] border border-neutral-200 rounded-[3px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-[#A98242] font-semibold">
                    01
                  </span>
                  <Search className="w-5 h-5 text-[#A98242]" />
                </div>
                <Heading as="h4" size="sm" className="text-[#080A0A] mb-3 font-normal">
                  {t.pillar3.steps[0].title}
                </Heading>
                <Text variant="body" className="text-neutral-600 font-light leading-relaxed text-sm">
                  {t.pillar3.steps[0].description}
                </Text>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="p-8 bg-[#FFFFFF] border border-neutral-200 rounded-[3px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-[#A98242] font-semibold">
                    02
                  </span>
                  <Compass className="w-5 h-5 text-[#A98242]" />
                </div>
                <Heading as="h4" size="sm" className="text-[#080A0A] mb-3 font-normal">
                  {t.pillar3.steps[1].title}
                </Heading>
                <Text variant="body" className="text-neutral-600 font-light leading-relaxed text-sm">
                  {t.pillar3.steps[1].description}
                </Text>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="p-8 bg-[#FFFFFF] border border-neutral-200 rounded-[3px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-[#A98242] font-semibold">
                    03
                  </span>
                  <Activity className="w-5 h-5 text-[#A98242]" />
                </div>
                <Heading as="h4" size="sm" className="text-[#080A0A] mb-3 font-normal">
                  {t.pillar3.steps[2].title}
                </Heading>
                <Text variant="body" className="text-neutral-600 font-light leading-relaxed text-sm">
                  {t.pillar3.steps[2].description}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
