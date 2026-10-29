"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { GoldLine } from "@/components/atoms/GoldLine";
import { Text } from "@/components/atoms/Typography";
import { CompactControls } from "@/components/molecules/CompactControls";
import { SITE_CONFIG, SITE_CONTENT, Locale } from "@/config/site-content";
import { Mail, Phone, MapPin } from "lucide-react";

export interface FooterProps {
  currentLocale: Locale;
  onLocaleChange?: (locale: Locale) => void;
  isCybersecurity?: boolean;
}

/**
 * Componente Organismo Footer
 * - Modo Normal (#F8F8F6) y Modo Oscuro (#080A0A).
 * - Columna de marca y fila de botones cuadrados para redes sociales.
 * - Navegación dinámica: en /cybersecurity muestra Enfoque, Penetration Testing, Próximamente y Contacto.
 * - En páginas internas muestra los controles compactos (ES/EN y Tema) debajo de redes sociales.
 * - Frase interactiva "Just a leap of faith." con tipografía Lora italic y animación dorada en hover.
 * - Esquinas al 10% (rounded-[3px]), sin emojis.
 */
export const Footer: React.FC<FooterProps> = ({
  currentLocale,
  onLocaleChange,
  isCybersecurity = false,
}) => {
  const t = SITE_CONTENT[currentLocale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F8F8F6] dark:bg-[#080A0A] text-[#080A0A] dark:text-[#FFFFFF] transition-colors duration-300 border-t border-neutral-300/80 dark:border-neutral-900 pt-16 pb-12 px-6 md:px-12 lg:px-16 relative">
      <div className="w-full">
        {/* Grilla Principal de 6 Columnas */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${process.env.NEXT_PUBLIC_LEGAL_PAGES_ENABLED === "true" ? "lg:grid-cols-6" : "lg:grid-cols-5"} gap-10 pb-16`}>
          {/* Columna 1 y 2: Marca, Filosofia y Redes Sociales Oficiales */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <BrandLogo mode="vector-font" color="white" className="mb-6" />
            <Text variant="subtle" className="text-[#080A0A]/70 dark:text-neutral-400 max-w-sm mb-6 font-light">
              {t.footer.tagline}
            </Text>



            {/* Cambiar los enlaces genéricos por los perfiles oficiales antes del lanzamiento. */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={SITE_CONFIG.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.87-4.47V8.62a8.28 8.28 0 0 0 4.9 1.58V6.75a4.85 4.85 0 0 1-1-.06z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href={SITE_CONFIG.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={SITE_CONFIG.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center bg-white dark:bg-[#080A0A] border border-neutral-300 dark:border-neutral-800 hover:border-[#A98242] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#FFFFFF] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>


            {/* Controles de Idioma y Tema en Footer (Exclusivo para páginas internas) */}
            {isCybersecurity && onLocaleChange && (
              <div className="mt-6 flex flex-col items-start gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  {currentLocale === "es" ? "PREFERENCIAS DE VISTA:" : "VIEW PREFERENCES:"}
                </span>
                <CompactControls
                  currentLocale={currentLocale}
                  onLocaleChange={onLocaleChange}
                />
              </div>
            )}
          </div>

          {/* Columna 3: NAVEGACION (Dinámico según página) */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#76591F] dark:text-[#C9A66B] mb-2 font-medium">
              {t.footer.navigationHeading}
            </span>
            {isCybersecurity ? (
              <>
                <Link
                  href="#enfoque"
                  className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-[#7A1C1C] dark:hover:text-white transition-colors font-light"
                >
                  {currentLocale === "es" ? "Enfoque" : "Approach"}
                </Link>
                <Link
                  href="#especialidades"
                  className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-[#7A1C1C] dark:hover:text-white transition-colors font-light"
                >
                  Penetration Testing
                </Link>
                <Link
                  href="#contact"
                  className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-[#7A1C1C] dark:hover:text-white transition-colors font-light"
                >
                  {currentLocale === "es" ? "Contacto" : "Contact"}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="#nosotros"
                  className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors font-light"
                >
                  {t.nav.us}
                </Link>
                <Link
                  href="#contacto"
                  className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors font-light"
                >
                  {t.nav.contact}
                </Link>
              </>
            )}
          </div>

          {/* Columna 4: SERVICIOS (Ciberseguridad, Software, Infraestructura) */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#76591F] dark:text-[#C9A66B] mb-2 font-medium">
              {t.footer.servicesHeading}
            </span>
            <Link
              href="/cybersecurity"
              className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-[#7A1C1C] dark:hover:text-white hover:translate-x-0.5 transition-all font-light"
            >
              {t.nav.cybersecurity}
            </Link>
          </div>

          {/* Mostrar únicamente cuando los documentos definitivos estén publicados. */}
          {process.env.NEXT_PUBLIC_LEGAL_PAGES_ENABLED === "true" && <div className="flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#76591F] dark:text-[#C9A66B] mb-2 font-medium">
              {t.footer.legalHeading}
            </span>
            <Link href="/privacidad" className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors font-light">
              {t.footer.privacyLink}
            </Link>
            <Link href="/terminos" className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors font-light">
              {t.footer.termsLink}
            </Link>
            <Link href="/cookies" className="text-xs font-sans text-[#080A0A]/70 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors font-light">
              {t.footer.cookiesLink}
            </Link>
          </div>}

          {/* Columna 6: Contacto Directo */}
          <div className="flex flex-col gap-3.5">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#76591F] dark:text-[#C9A66B] mb-2 font-medium">
              {t.footer.contactHeading}
            </span>

            <a
              href={`mailto:${SITE_CONFIG.contact.officialEmail}`}
              className="flex items-center gap-2.5 text-xs text-[#080A0A]/80 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors font-light"
            >
              <Mail className="w-3.5 h-3.5 text-[#A98242] shrink-0" />
              <span>{SITE_CONFIG.contact.officialEmail}</span>
            </a>

            <a href="tel:+526642276711" className="flex items-center gap-2.5 text-xs text-[#080A0A]/70 dark:text-neutral-400 font-light">
              <Phone className="w-3.5 h-3.5 text-[#A98242] shrink-0" />
              <span>{SITE_CONFIG.contact.displayPhone}</span>
            </a>

            <a href="https://www.google.com/maps/search/?api=1&query=Tijuana%2C+Baja+California%2C+Mexico" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-xs text-[#080A0A]/70 dark:text-neutral-400 font-light">
              <MapPin className="w-3.5 h-3.5 text-[#A98242] shrink-0 mt-0.5" />
              <span>
                {SITE_CONFIG.contact.address.city}, Baja California, {SITE_CONFIG.contact.address.country}
              </span>
            </a>
          </div>
        </div>

        {/* Separador fino dorado */}
        <GoldLine className="opacity-30 mb-8" />

        {/* Barra Inferior de Derechos y Frase "Just a leap of faith." */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500 font-light">
          <span>
            © {currentYear} {SITE_CONFIG.brandName}. {t.footer.rights}
          </span>

          {/* Frase interactiva con tipografia Lora italic y hover en dorado */}
          <div className="relative group inline-flex flex-col items-center sm:items-end cursor-default select-none">
            <span className="font-serif italic font-normal text-sm md:text-base text-[#080A0A]/75 dark:text-neutral-300 transition-all duration-300 group-hover:text-[#A98242] group-hover:tracking-wider">
              {t.footer.leapOfFaith || "Just a leap of faith."}
            </span>
            <span
              className="h-[1px] w-0 bg-[#A98242] transition-all duration-300 group-hover:w-full mt-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
