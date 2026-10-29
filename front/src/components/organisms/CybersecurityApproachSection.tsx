"use client";

import React from "react";
import { Terminal, Cpu, BrainCircuit, Check } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { DiagonalLightRays } from "@/components/atoms/DiagonalLightRays";
import { Locale } from "@/config/site-content";

export interface CybersecurityApproachSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecurityApproachSection
 * Sección 01: Enfoque Híbrido Tripartito (Manual + Automatizado + IA).
 * - Estilo editorial homólogo a la sección 01 de Inicio.
 * - Fondo Blanco Hueso (#F8F8F6) en Modo Normal y Negro (#080A0A) en Modo Oscuro.
 * - Rayos diagonales de fondo (70% Rojo / 30% Dorado).
 * - 3 tarjetas arquitectónicas con esquinas al 10% (rounded-[3px]).
 * - Cero emojis.
 */
export const CybersecurityApproachSection: React.FC<CybersecurityApproachSectionProps> = ({
  currentLocale,
}) => {
  const isEs = currentLocale === "es";

  const pillars = [
    {
      id: "manual",
      number: "01",
      icon: Terminal,
      badge: isEs ? "INGENIERÍA HUMANA" : "HUMAN EXPERTISE",
      title: isEs ? "Ejecución Manual (Mentalidad de Atacante)" : "Manual Execution (Adversary Mindset)",
      description: isEs
        ? "Pruebas dirigidas por especialistas para detectar fallos de lógica de negocio, encadenamiento de vulnerabilidades y escalada de privilegios que ningún software detecta por sí solo."
        : "Specialist-driven testing designed to uncover business logic flaws, vulnerability chaining, and privilege escalation that no automated scanner can detect autonomously.",
      highlights: isEs
        ? [
            "Auditoría profunda de lógica de negocio y flujos transaccionales.",
            "Encadenamiento de fallas para demostrar impacto real sin daño.",
            "Revisión manual de los hallazgos para reducir falsos positivos.",
            "Escalada de privilegios horizontal y vertical simulada.",
          ]
        : [
            "In-depth audit of business logic and transactional flows.",
            "Exploit chaining to demonstrate verified real-world impact.",
            "Manual review of findings to reduce false positives.",
            "Horizontal and vertical privilege escalation testing.",
          ],
    },
    {
      id: "automated",
      number: "02",
      icon: Cpu,
      badge: isEs ? "HERRAMIENTAS DE APOYO" : "SUPPORTING TOOLS",
      title: isEs ? "Automatización Inteligente y Escaneo" : "Intelligent Automation & Surface Scanning",
      description: isEs
        ? "Usamos herramientas para identificar puertos, servicios, configuraciones expuestas y vulnerabilidades conocidas dentro del alcance acordado."
        : "We use scanning tools to identify ports, services, exposed configurations, and known vulnerabilities within the agreed scope.",
      highlights: isEs
        ? [
            "Identificación de subdominios y activos expuestos.",
            "Revisión de puertos y servicios activos.",
            "Detección acelerada de CVEs y configuraciones por defecto.",
            "Sondeo no destructivo respetando umbrales de disponibilidad.",
          ]
        : [
            "Identification of exposed subdomains and assets.",
            "Review of ports and active services.",
            "Accelerated identification of known CVEs and default credentials.",
            "Non-destructive scanning adhering strictly to availability thresholds.",
          ],
    },
    {
      id: "ai",
      number: "03",
      icon: BrainCircuit,
      badge: isEs ? "ANÁLISIS DE RIESGOS" : "RISK ANALYSIS",
      title: isEs ? "Análisis y prioridades" : "Analysis and priorities",
      description: isEs
        ? "Analizamos los resultados de las pruebas y priorizamos los riesgos para ayudarle a decidir qué atender primero."
        : "We review test results and prioritize risks to help you decide what to address first.",
      highlights: isEs
        ? [
            "Análisis de hallazgos en el contexto de su organización.",
            "Relación entre vulnerabilidades y sistemas afectados.",
            "Priorización según impacto y riesgo.",
            "Recomendaciones claras para corregir los problemas.",
          ]
        : [
            "Reviewing findings in the context of your organization.",
            "Connecting vulnerabilities with affected systems.",
            "Prioritizing by impact and risk.",
            "Clear recommendations for addressing the findings.",
          ],
    },
  ];

  return (
    <section
      id="enfoque"
      className="py-28 px-6 md:px-12 lg:px-16 bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-300 relative border-t border-neutral-300/80 dark:border-[#7A1C1C]/20 overflow-hidden"
    >
      {/* Rayos diagonales de fondo (70% Rojo Oscuro / 30% Dorado Oscuro) */}
      <DiagonalLightRays variant="cybersecurity" opacity={0.35} />

      {/* Resplandor ambiental de profundidad sutil */}
      <div
        className="pointer-events-none absolute -top-40 right-10 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(169,130,66,0.1)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(122,28,28,0.12)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Encabezado Editorial de la Sección */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1.5px] bg-[#7A1C1C] dark:bg-[#A98242]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A1C1C] dark:text-[#A98242] font-medium">
              {isEs ? "01 // NUESTRO ENFOQUE EN CIBERSEGURIDAD" : "01 // OUR CYBERSECURITY APPROACH"}
            </span>
          </div>

          <Heading as="h2" size="xl" className="font-normal mb-6 text-[#080A0A] dark:text-[#FFFFFF]">
            {isEs ? (
              <>
                Un diagnóstico efectivo exige la convergencia de{" "}
                <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                  tres capacidades críticas
                </span>
                .
              </>
            ) : (
              <>
                An effective security assessment demands the convergence of{" "}
                <span className="italic font-normal text-[#7A1C1C] dark:text-[#F8F8F6]">
                  three critical capabilities
                </span>
                .
              </>
            )}
          </Heading>

          <Text variant="lead" className="text-[#080A0A]/75 dark:text-neutral-300 font-light leading-relaxed">
            {isEs
              ? "Combinamos pruebas manuales y herramientas de apoyo para revisar los sistemas dentro del alcance acordado y presentar hallazgos que su equipo pueda atender."
              : "We reject commodity audits driven by automated scanners that inflate reports with noise, as well as unassisted manual testing that misses perimeter sprawl. We unify human expertise, scalable automation, and predictive models to fortify every angle."}
          </Text>
        </div>

        {/* Grilla de las 3 Capacidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative flex flex-col justify-between p-8 md:p-9 bg-[#FFFFFF] dark:bg-[#0D1010] border border-neutral-200 dark:border-[#7A1C1C]/30 hover:border-[#7A1C1C] dark:hover:border-[#A98242] rounded-[3px] transition-all duration-300 shadow-sm hover:shadow-[0_6px_24px_rgba(122,28,28,0.15)] dark:hover:shadow-[0_4px_24px_rgba(169,130,66,0.15)] hover:-translate-y-1"
              >
                {/* Cabecera de la Tarjeta */}
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100 dark:border-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#240B0B]/10 dark:bg-[#240B0B] border border-[#7A1C1C]/30 dark:border-[#A98242]/40 rounded-[2px] text-[#7A1C1C] dark:text-[#A98242] group-hover:border-[#7A1C1C] dark:group-hover:border-[#A98242] group-hover:text-[#240B0B] dark:group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] tracking-widest text-[#7A1C1C] dark:text-[#A98242] uppercase font-medium">
                        {pillar.badge}
                      </span>
                    </div>

                    <span className="font-mono text-sm text-neutral-400 dark:text-neutral-600 group-hover:text-[#7A1C1C] dark:group-hover:text-[#A98242] transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#080A0A] dark:text-[#FFFFFF] mb-4 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-[#080A0A]/70 dark:text-neutral-300 font-light leading-relaxed mb-8">
                    {pillar.description}
                  </p>
                </div>

                {/* Lista de Especificaciones */}
                <ul className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-900/80">
                  {pillar.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#080A0A]/65 dark:text-neutral-400 font-light leading-relaxed">
                      <div className="mt-1 w-3.5 h-3.5 rounded-[1px] bg-[#240B0B]/10 dark:bg-[#240B0B] border border-[#7A1C1C]/40 dark:border-[#A98242]/40 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#7A1C1C] dark:text-[#A98242]" />
                      </div>
                      <span className="group-hover:text-[#080A0A] dark:group-hover:text-neutral-200 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Línea sutil de acento inferior */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#7A1C1C] dark:bg-[#A98242] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
