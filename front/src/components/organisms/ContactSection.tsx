"use client";

import { Mail } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { DiagonalLightRays } from "@/components/atoms/DiagonalLightRays";
import { CrmContactForm } from "@/components/organisms/CrmContactForm";
import { Locale, SITE_CONFIG, SITE_CONTENT } from "@/config/site-content";
import { AreaOfInterest } from "@/types";

export function ContactSection({ currentLocale, isCybersecurity = false, defaultArea }: {
  currentLocale: Locale; isCybersecurity?: boolean; defaultArea?: AreaOfInterest;
}) {
  if (process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true" && process.env.NEXT_PUBLIC_LEGAL_PAGES_ENABLED === "true") {
    return <CrmContactForm currentLocale={currentLocale} isCybersecurity={isCybersecurity} defaultArea={defaultArea} />;
  }
  const t = SITE_CONTENT[currentLocale].contact;
  const isEs = currentLocale === "es";
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-900 bg-[#F8F8F6] dark:bg-[#080A0A] px-6 md:px-12 py-24 md:py-28">
      <span id="contact" className="sr-only" aria-hidden="true" />
      <DiagonalLightRays variant={isCybersecurity ? "cybersecurity" : "home"} opacity={0.55} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#76591F] dark:text-[#C9A66B] font-semibold">{t.sectionBadge}</span>
        <Heading as="h2" size="xl" className="font-normal mt-4 mb-5 text-[#080A0A] dark:text-white">{t.sectionTitle} <span className="italic">{t.sectionTitleItalic}</span></Heading>
        <Text variant="lead" className="text-[#080A0A]/80 dark:text-neutral-300 font-light mx-auto max-w-xl">
          {isEs ? "Cuéntenos qué necesita y con gusto conversaremos sobre su proyecto." : "Tell us what you need and we will be happy to discuss your project."}
        </Text>
        <a href={`mailto:${SITE_CONFIG.contact.officialEmail}?subject=${encodeURIComponent(isEs ? "Consulta de servicios LESSSO" : "LESSSO services inquiry")}`} className="inline-flex items-center justify-center gap-3 mt-8 px-7 py-4 min-h-12 bg-[#080A0A] text-white dark:bg-[#F8F8F6] dark:text-[#080A0A] hover:opacity-85 rounded-[3px] font-sans text-sm font-medium transition-opacity">
          <Mail className="w-4 h-4" aria-hidden="true" /> {SITE_CONFIG.contact.officialEmail}
        </a>
      </div>
    </section>
  );
}
