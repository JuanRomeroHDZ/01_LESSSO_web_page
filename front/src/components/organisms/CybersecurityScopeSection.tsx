"use client";

import React from "react";
import { Globe, Network, Server, ShieldCheck, ArrowRight } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { Locale } from "@/config/site-content";

export interface CybersecurityScopeSectionProps {
  currentLocale: Locale;
}

/**
 * Componente Organismo CybersecurityScopeSection
 * Sección 02: Alcance, Vectores y Hardening (Escalable y Conciso).
 * - Fondo en Blanco Hueso (#F8F8F6) con textos en #080A0A.
 * - Acentos en Rojo Oscuro (#240B0B) y detalles arquitectónicos en Dorado (#A98242).
 * - 4 bloques técnicos claros con iconos SVG de lucide-react.
 * - Esquinas al 10% (rounded-[3px]), sin emojis.
 */
export const CybersecurityScopeSection: React.FC<CybersecurityScopeSectionProps> = ({
  currentLocale,
}) => {
  const isEs = currentLocale === "es";

  const scopes = [
    {
      id: "web-api",
      icon: Globe,
      number: "01",
      tag: "APLICACIONES & SERVICIOS",
      standard: "OWASP TOP 10 // API SECURITY",
      title: isEs
        ? "Pentesting de Aplicaciones Web y APIs"
        : "Web Applications & API Penetration Testing",
      description: isEs
        ? "Evaluación exhaustiva de mecanismos de autenticación, control de accesos granular, inyecciones de código (SQLi, NoSQL, SSRF, XSS) y fallas de lógica transaccional según estándares internacionales OWASP."
        : "Exhaustive assessment of authentication workflows, broken access control, code injection vectors (SQLi, NoSQL, SSRF, XSS), and complex business logic flaws following rigorous OWASP standards.",
      vectors: isEs
        ? [
            "Autenticación rota y gestión de sesiones (JWT / OAuth / SAML).",
            "Validación de endpoints RESTful, GraphQL y microservicios.",
            "Inyecciones complejas, Server-Side Request Forgery y deserialización.",
            "Manipulación de lógica de pagos, carritos y flujos de negocio.",
          ]
        : [
            "Broken authentication and session management (JWT / OAuth / SAML).",
            "In-depth RESTful, GraphQL, and microservice endpoint auditing.",
            "Advanced code injection, SSRF, and unsafe deserialization vectors.",
            "Tampering with business logic, payment gates, and checkout flows.",
          ],
    },
    {
      id: "network",
      icon: Network,
      number: "02",
      tag: "INFRAESTRUCTURA DE RED",
      standard: "OSSTMM // NIST SP 800-115",
      title: isEs
        ? "Auditoría de Red Interna y Externa"
        : "Internal & External Network Infrastructure Audit",
      description: isEs
        ? "Identificación de servicios mal configurados, segmentación defectuosa de subredes, vectores de movimiento lateral y exposición perimetral que pudieran permitir el acceso no autorizado a activos centrales."
        : "Identification of misconfigured services, deficient subnet segmentation, lateral movement pathways, and perimeter exposure that could permit unauthorized traversal to critical internal assets.",
      vectors: isEs
        ? [
            "Escaneo perimetral externo y evasión de firewalls/WAF.",
            "Auditoría de Active Directory, LDAP, Kerberos y políticas GPO.",
            "Vectores de spoofing, envenenamiento ARP y sniffing de tráfico interno.",
            "Pruebas de saltos entre VLANs y control de accesos a zonas DMZ.",
          ]
        : [
            "External perimeter scanning and firewall/WAF evasion testing.",
            "Active Directory, LDAP, Kerberos, and GPO trust relationship auditing.",
            "Spoofing, ARP poisoning, and internal traffic interception vectors.",
            "VLAN hopping tests and DMZ to internal network traversal validation.",
          ],
    },
    {
      id: "servers",
      icon: Server,
      number: "03",
      tag: "SISTEMAS OPERATIVOS",
      standard: "LINUX // WINDOWS SERVER",
      title: isEs
        ? "Evaluación de Servidores y Sistemas"
        : "Server & Operating System Hardening Audit",
      description: isEs
        ? "Análisis profundo de permisos de sistema de archivos, servicios heredados con configuraciones débiles, credenciales por defecto y vectores de escalada local de privilegios (LPE) hasta nivel root o SYSTEM."
        : "Deep inspection of filesystem permissions, vulnerable legacy daemons, lingering default credentials, and local privilege escalation (LPE) vectors targeting root or SYSTEM access.",
      vectors: isEs
        ? [
            "Búsqueda de binarios SUID/SGID y capacidades Linux mal asignadas.",
            "Auditoría de tareas cron, servicios desprotegidos y rutas no entrecomilladas.",
            "Explotación controlada de vulnerabilidades de kernel conocidas (CVEs).",
            "Análisis de credenciales en memoria, registros y volcados LSASS.",
          ]
        : [
            "Enumeration of SUID/SGID binaries and insecure Linux capabilities.",
            "Cron jobs, unquoted service paths, and registry misconfiguration auditing.",
            "Controlled exploitation of verified kernel vulnerabilities (CVEs).",
            "Extraction and audit of credentials in memory and LSASS process dumps.",
          ],
    },
    {
      id: "hardening",
      icon: ShieldCheck,
      number: "04",
      tag: "BLINDAJE DEFENSIVO",
      standard: "CIS BENCHMARKS // ZERO REINCIDENCE",
      title: isEs
        ? "Hardening y Bastionado Post-Auditoría"
        : "Post-Audit Hardening & Systems Lockdown",
      description: isEs
        ? "No nos limitamos a enumerar fallos: acompañamos a su equipo en el endurecimiento directo de servidores, cierre de puertos innecesarios, reconfiguración de firewalls y fijación de líneas base CIS para erradicar reincidencias."
        : "We don't merely report vulnerabilities: we guide your team in direct server hardening, shutting unneeded attack vectors, tuning firewall policies, and applying CIS baseline configurations to prevent reoccurrence.",
      vectors: isEs
        ? [
            "Alineación estricta con guías de endurecimiento CIS Benchmarks Nivel 1 y 2.",
            "Configuración robusta de SSH, TLS 1.3, encabezados HTTP y Firewalls.",
            "Políticas de mínimos privilegios (PoLP) y desactivación de servicios huérfanos.",
            "Auditoría de re-testing final para certificar la efectividad de los parches.",
          ]
        : [
            "Strict alignment with CIS Benchmarks Level 1 and Level 2 security baselines.",
            "Robust hardening of SSH, TLS 1.3 ciphers, HTTP security headers, and firewalls.",
            "Enforcement of Principle of Least Privilege (PoLP) and legacy daemon removal.",
            "Comprehensive re-testing audit certifying the efficacy of applied patches.",
          ],
    },
  ];

  return (
    <section
      id="alcance"
      className="py-28 px-6 md:px-12 lg:px-16 bg-[#F8F8F6] text-[#080A0A] relative"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Encabezado Editorial en Alto Contraste */}
        <div className="flex flex-col items-start mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#A98242]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A98242] font-semibold">
              {isEs ? "ALCANCE TÉCNICO Y VECTORES" : "TECHNICAL SCOPE & VECTORS"}
            </span>
          </div>

          <Heading as="h2" size="xl" className="font-normal mb-6 text-[#080A0A]">
            {isEs ? (
              <>
                Superficie evaluada, vectores críticos y{" "}
                <span className="italic font-normal text-[#240B0B]">
                  bastionado definitivo
                </span>
                .
              </>
            ) : (
              <>
                Evaluated attack surface, key vectors, and{" "}
                <span className="italic font-normal text-[#240B0B]">
                  systemic lockdown
                </span>
                .
              </>
            )}
          </Heading>

          <Text variant="lead" className="text-neutral-700 font-light leading-relaxed">
            {isEs
              ? "Cada auditoría se ejecuta bajo reglas de compromiso estrictas, garantizando que sus servicios operen con total normalidad mientras medimos la resistencia real de cada capa tecnológica frente a tácticas y procedimientos de adversarios modernos."
              : "Every assessment is executed under strict rules of engagement, ensuring seamless business continuity while we measure the real resistance of each technological layer against modern adversary tactics."}
          </Text>
        </div>

        {/* Grilla 2x2 de Bloques Técnicos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {scopes.map((scope) => {
            const Icon = scope.icon;
            const isHardening = scope.id === "hardening";

            return (
              <div
                key={scope.id}
                className={`relative flex flex-col justify-between p-8 md:p-10 rounded-[3px] border transition-all duration-300 shadow-sm hover:shadow-md ${
                  isHardening
                    ? "bg-[#240B0B] text-[#FFFFFF] border-[#A98242]/50 hover:border-[#A98242]"
                    : "bg-[#FFFFFF] text-[#080A0A] border-neutral-300 hover:border-[#A98242]"
                }`}
              >
                <div>
                  {/* Fila Superior: Icono, Etiqueta y Norma */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200/60 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 flex items-center justify-center rounded-[2px] border ${
                          isHardening
                            ? "bg-[#080A0A] border-[#A98242] text-[#A98242]"
                            : "bg-[#240B0B] border-[#240B0B] text-[#FFFFFF]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={`font-mono text-[10px] tracking-widest uppercase font-semibold ${
                            isHardening ? "text-[#A98242]" : "text-[#7A1C1C]"
                          }`}
                        >
                          {scope.tag}
                        </span>
                        <span
                          className={`font-mono text-[9px] tracking-wider uppercase ${
                            isHardening ? "text-neutral-400" : "text-neutral-500"
                          }`}
                        >
                          {scope.standard}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-base font-medium ${
                        isHardening ? "text-[#A98242]" : "text-neutral-400"
                      }`}
                    >
                      {scope.number}
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <h3
                    className={`font-serif text-xl md:text-2xl font-normal mb-4 leading-snug ${
                      isHardening ? "text-[#FFFFFF]" : "text-[#080A0A]"
                    }`}
                  >
                    {scope.title}
                  </h3>

                  <p
                    className={`font-sans text-xs md:text-sm font-light leading-relaxed mb-8 ${
                      isHardening ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    {scope.description}
                  </p>
                </div>

                {/* Sub-lista de Vectores Técnicos Evaluados */}
                <div
                  className={`pt-6 border-t ${
                    isHardening ? "border-neutral-800" : "border-neutral-200"
                  }`}
                >
                  <span
                    className={`block font-mono text-[10px] tracking-widest uppercase mb-3 font-semibold ${
                      isHardening ? "text-[#A98242]" : "text-[#240B0B]"
                    }`}
                  >
                    {isEs ? "Vectores Auditados & Mitigados:" : "Audited & Mitigated Vectors:"}
                  </span>

                  <ul className="space-y-2.5">
                    {scope.vectors.map((vec, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs font-light leading-relaxed ${
                          isHardening ? "text-neutral-300" : "text-neutral-700"
                        }`}
                      >
                        <ArrowRight
                          className={`w-3 h-3 shrink-0 mt-0.5 ${
                            isHardening ? "text-[#A98242]" : "text-[#7A1C1C]"
                          }`}
                        />
                        <span>{vec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
