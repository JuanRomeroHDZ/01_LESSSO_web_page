"use client";

import React from "react";
import { Search, ShieldAlert, Zap, FileText, CheckCircle2, Award } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { Locale } from "@/config/site-content";

export interface CybersecurityPhasesSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecurityPhasesSection
 * Sección 03: Fases del Penetration Testing y Documentación.
 * - Diseño Visual Arquitectónico No Lineal: Circuito escalonado (zig-zag) con ángulos a 90 grados.
 * - Líneas SVG angulares (codos de 90 grados) en #A98242 y #7A1C1C con animación de pulso.
 * - Fase 04 destacada visualmente como el entregable de mayor valor corporativo:
 *   Reporte Ejecutivo, Reporte Técnico Paso a Paso y Re-Testing de Verificación.
 * - Esquinas al 10% (rounded-[3px]), sin emojis.
 */
export const CybersecurityPhasesSection: React.FC<CybersecurityPhasesSectionProps> = ({
  currentLocale,
}) => {
  const isEs = currentLocale === "es";

  return (
    <section
      id="fases"
      className="py-28 px-6 md:px-12 lg:px-16 bg-[#080A0A] text-[#FFFFFF] relative border-t border-[#A98242]/20 overflow-hidden"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(36,11,11,0.6)_0%,rgba(8,10,10,0)_70%)] blur-3xl opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(169,130,66,0.1)_0%,rgba(8,10,10,0)_70%)] blur-3xl opacity-40"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Encabezado Editorial */}
        <div className="flex flex-col items-start mb-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#A98242]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A98242] font-normal">
              {isEs ? "METODOLOGÍA Y ENTREGABLES" : "METHODOLOGY & DELIVERABLES"}
            </span>
          </div>

          <Heading as="h2" size="xl" className="font-normal mb-6 text-[#FFFFFF]">
            {isEs ? (
              <>
                Circuito metódico en cuatro fases con{" "}
                <span className="italic font-normal text-[#F8F8F6]">
                  certidumbre documental
                </span>
                .
              </>
            ) : (
              <>
                A rigorous four-phase circuit delivering{" "}
                <span className="italic font-normal text-[#F8F8F6]">
                  documentary certainty
                </span>
                .
              </>
            )}
          </Heading>

          <Text variant="lead" className="text-neutral-300 font-light leading-relaxed">
            {isEs
              ? "Cada fase del proceso de intrusión controlada responde a estándares internacionales (PTES y OSSTMM). No dejamos cabos sueltos: avanzamos de forma progresiva desde el reconocimiento perimetral hasta la entrega de soluciones técnicas exactas listas para implementar."
              : "Every phase in our ethical intrusion process conforms to global PTES and OSSTMM frameworks. We proceed with disciplined progression from perimeter intelligence to precise, patch-ready technical deliverables."}
          </Text>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CIRCUITO ESCALONADO / ZIG-ZAG CON CODOS DE 90 GRADOS               */}
        {/* ------------------------------------------------------------------ */}
        <div className="space-y-12 lg:space-y-0 relative">
          {/* FASE 01: Izquierda (Cols 1 a 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 bg-[#080A0A] border border-neutral-800 hover:border-[#A98242] p-8 md:p-10 rounded-[3px] shadow-xl relative transition-all duration-300 group">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#240B0B] border border-[#A98242]/40 rounded-[2px] text-[#A98242] group-hover:border-[#A98242]">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-[#A98242] uppercase">
                    {isEs ? "FASE 01 // INTELIGENCIA" : "PHASE 01 // INTELLIGENCE"}
                  </span>
                </div>
                <span className="font-mono text-base text-neutral-500 font-medium">01</span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-white mb-4">
                {isEs ? "Reconocimiento y Enumeración" : "Reconnaissance & Enumeration"}
              </h3>

              <p className="font-sans text-xs md:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {isEs
                  ? "Recopilación de inteligencia pasiva y activa, descubrimiento exhaustivo de subdominios, mapeo de puertos y servicios expuestos para definir con precisión matemática la superficie de ataque inicial."
                  : "Passive and active OSINT intelligence gathering, comprehensive subdomain enumeration, exposed port scanning, and service fingerprinting to mathematically outline the target surface."}
              </p>

              <div className="pt-4 border-t border-neutral-900/80 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">OSINT</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">DNS BRUTEFORCE</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">SERVICE FINGERPRINT</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">WHOIS / ASN</span>
              </div>
            </div>

            <div className="hidden lg:col-span-6 lg:flex items-center justify-start pl-8">
              {/* Conector Visual SVG: Codo de 90 grados hacia la derecha y hacia abajo */}
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 120" fill="none">
                <path
                  d="M 0 60 L 220 60 L 220 120"
                  stroke="#7A1C1C"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 0 60 L 220 60 L 220 120"
                  stroke="#A98242"
                  strokeWidth="1.6"
                  strokeDasharray="25 240"
                  strokeLinecap="square"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="25"
                    to="-240"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>
                {/* Vértice a 90 grados con nodo */}
                <rect x="218" y="58" width="5" height="5" fill="#A98242" />
              </svg>
            </div>
          </div>

          {/* FASE 02: Derecha (Cols 7 a 12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:pt-8">
            <div className="hidden lg:col-span-6 lg:flex items-center justify-end pr-8">
              {/* Conector Visual SVG: Codo de 90 grados hacia la izquierda y hacia abajo */}
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 120" fill="none">
                <path
                  d="M 400 60 L 180 60 L 180 120"
                  stroke="#7A1C1C"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 400 60 L 180 60 L 180 120"
                  stroke="#9E2A2B"
                  strokeWidth="1.6"
                  strokeDasharray="25 240"
                  strokeLinecap="square"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="25"
                    to="-240"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </path>
                {/* Vértice a 90 grados con nodo */}
                <rect x="178" y="58" width="5" height="5" fill="#9E2A2B" />
              </svg>
            </div>

            <div className="lg:col-span-6 bg-[#080A0A] border border-neutral-800 hover:border-[#A98242] p-8 md:p-10 rounded-[3px] shadow-xl relative transition-all duration-300 group">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#240B0B] border border-[#A98242]/40 rounded-[2px] text-[#A98242] group-hover:border-[#A98242]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-[#A98242] uppercase">
                    {isEs ? "FASE 02 // VULNERABILIDADES" : "PHASE 02 // WEAKNESS AUDIT"}
                  </span>
                </div>
                <span className="font-mono text-base text-neutral-500 font-medium">02</span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-white mb-4">
                {isEs ? "Análisis de Vulnerabilidades y Vectores" : "Vulnerability & Vector Identification"}
              </h3>

              <p className="font-sans text-xs md:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {isEs
                  ? "Identificación híbrida (manual, escaneo automatizado y correlación con IA) de puntos débiles, configuraciones inseguras, cifrados obsoletos y potenciales rutas de intrusión."
                  : "Hybrid identification combining manual scrutiny, automated scanning, and AI correlation to pinpoint security oversights, outdated ciphers, and entry vectors."}
              </p>

              <div className="pt-4 border-t border-neutral-900/80 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">CVE CORRELATION</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">AUTH BYPASS</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">MISCONFIG CHECK</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">CVSS SCORING</span>
              </div>
            </div>
          </div>

          {/* FASE 03: Izquierda (Cols 1 a 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:pt-8">
            <div className="lg:col-span-6 bg-[#080A0A] border border-neutral-800 hover:border-[#A98242] p-8 md:p-10 rounded-[3px] shadow-xl relative transition-all duration-300 group">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#240B0B] border border-[#A98242]/40 rounded-[2px] text-[#A98242] group-hover:border-[#A98242]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-[#A98242] uppercase">
                    {isEs ? "FASE 03 // EXPLOTACIÓN" : "PHASE 03 // EXPLOITATION"}
                  </span>
                </div>
                <span className="font-mono text-base text-neutral-500 font-medium">03</span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-white mb-4">
                {isEs ? "Explotación Controlada y Post-Explotación" : "Controlled Exploitation & Post-Exploitation"}
              </h3>

              <p className="font-sans text-xs md:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {isEs
                  ? "Demostración segura del impacto real sin interrumpir la operación del cliente. Evaluamos la posibilidad de movimientos laterales, escalada de privilegios y acceso a información crítica."
                  : "Safe proof-of-concept exploitation proving real-world operational exposure with zero service downtime. We evaluate lateral pivots, privilege escalations, and data confidentiality limits."}
              </p>

              <div className="pt-4 border-t border-neutral-900/80 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">SAFE POC</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">PRIVILEGE ESCALATION</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">LATERAL PIVOT</span>
                <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-[2px]">ZERO DOWNTIME</span>
              </div>
            </div>

            <div className="hidden lg:col-span-6 lg:flex items-center justify-start pl-8">
              {/* Conector Visual SVG hacia la Fase 04 */}
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 120" fill="none">
                <path
                  d="M 0 60 L 220 60 L 220 120"
                  stroke="#7A1C1C"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 0 60 L 220 60 L 220 120"
                  stroke="#A98242"
                  strokeWidth="1.6"
                  strokeDasharray="25 240"
                  strokeLinecap="square"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="25"
                    to="-240"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="2s"
                  />
                </path>
                <rect x="218" y="58" width="5" height="5" fill="#A98242" />
              </svg>
            </div>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* FASE 04: ENTREGABLE DE MAYOR VALOR (Destacado Visual a Ancho Completo) */}
          {/* ------------------------------------------------------------------ */}
          <div className="pt-10">
            <div className="bg-[#240B0B]/90 border-2 border-[#A98242] p-8 md:p-12 lg:p-14 rounded-[3px] shadow-[0_0_40px_rgba(169,130,66,0.18)] relative overflow-hidden">
              {/* Fondo arquitectónico sutil */}
              <div
                className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-[radial-gradient(circle,rgba(169,130,66,0.2)_0%,rgba(36,11,11,0)_70%)] blur-2xl opacity-60"
                aria-hidden="true"
              />

              {/* Encabezado del Entregable Maestro */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#A98242]/30">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#080A0A] border border-[#A98242] rounded-[2px] text-[#A98242]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-widest text-[#A98242] uppercase block">
                      {isEs ? "FASE 04 // ENTREGABLE PRINCIPAL" : "PHASE 04 // MASTER DELIVERABLE"}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-normal text-white">
                      {isEs ? "Documentación Ejecutiva, Técnica y Re-Testing" : "Executive, Technical Documentation & Re-Testing"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 bg-[#080A0A] border border-[#A98242]/50 rounded-[2px] text-xs font-mono text-[#A98242]">
                  <Award className="w-4 h-4 text-[#A98242]" />
                  <span>{isEs ? "MÁXIMO VALOR PARA EL CLIENTE" : "HIGHEST-VALUE DELIVERABLE"}</span>
                </div>
              </div>

              {/* Grilla de los 3 Componentes del Entregable */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Reporte Ejecutivo */}
                <div className="bg-[#080A0A]/90 border border-neutral-800 p-6 rounded-[2px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#A98242] mb-3 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#A98242]" />
                      <span>{isEs ? "Para Dirección & C-Level" : "For Executives & Board"}</span>
                    </div>
                    <h4 className="font-serif text-lg font-normal text-white mb-2">
                      {isEs ? "Reporte Ejecutivo" : "Executive Summary"}
                    </h4>
                    <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed mb-4">
                      {isEs
                        ? "Resumen de alto nivel, libre de jerga innecesaria, con matrices visuales de riesgo, impacto financiero/operativo y un plan de acción prioritario para respaldar decisiones de inversión."
                        : "High-level synthesis free of technical obscurity, featuring risk heatmaps, business impact assessments, and a prioritized roadmap for executive board decisions."}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider pt-3 border-t border-neutral-900">
                    DIRECTORIO // TOMA DE DECISIONES
                  </span>
                </div>

                {/* 2. Reporte Técnico Paso a Paso */}
                <div className="bg-[#080A0A]/90 border border-neutral-800 p-6 rounded-[2px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#A98242] mb-3 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#A98242]" />
                      <span>{isEs ? "Para Ingenieros & TI" : "For Engineers & DevOps"}</span>
                    </div>
                    <h4 className="font-serif text-lg font-normal text-white mb-2">
                      {isEs ? "Reporte Técnico Paso a Paso" : "Step-by-Step Technical Report"}
                    </h4>
                    <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed mb-4">
                      {isEs
                        ? "Evidencias reproducibles de cada hallazgo con puntuación CVSS v3.1, trazas de prueba completas y los comandos/archivos exactos de configuración para aplicar los parches de inmediato."
                        : "Fully reproducible proofs-of-concept with CVSS v3.1 scoring, payload traces, and precise commands or config snippets to deploy hardening patches immediately."}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider pt-3 border-t border-neutral-900">
                    CVSS V3.1 // COMANDOS DE REMEDIACIÓN
                  </span>
                </div>

                {/* 3. Re-Testing de Verificación */}
                <div className="bg-[#080A0A]/90 border border-neutral-800 p-6 rounded-[2px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#A98242] mb-3 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#A98242]" />
                      <span>{isEs ? "Validación Definitiva" : "Definitive Validation"}</span>
                    </div>
                    <h4 className="font-serif text-lg font-normal text-white mb-2">
                      {isEs ? "Re-Testing de Verificación" : "Verification Re-Testing"}
                    </h4>
                    <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed mb-4">
                      {isEs
                        ? "Segunda ronda de auditoría sin costo adicional tras la aplicación de parches por parte de su equipo, garantizando que ninguna brecha haya quedado parcialmente abierta."
                        : "Second-stage validation audit executed following your team's patch deployment, mathematically verifying that reported vulnerabilities have been permanently closed."}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider pt-3 border-t border-neutral-900">
                    CERTIFICACIÓN DE REMEDIACIÓN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
