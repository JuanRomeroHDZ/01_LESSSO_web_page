"use client";

import React from "react";
import { PageLayout } from "@/components/templates/PageLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { TrustPillarsSection } from "@/components/organisms/TrustPillarsSection";
import { CrmContactForm } from "@/components/organisms/CrmContactForm";

/**
 * Pagina de Inicio Oficial de LESSSO
 * Construida exclusivamente jugando con Negro (#080A0A) y Blanco (#F8F8F6),
 * utilizando el Dorado Oscuro (#A98242) unicamente para micro-detalles y lineas arquitectonicas.
 * Cero emojis.
 */
export default function HomePage() {
  return (
    <PageLayout>
      {({ currentLocale }) => (
        <>
          {/* Seccion Hero */}
          <HeroSection currentLocale={currentLocale} />

          {/* Seccion Nosotros (Los 3 Pilares de Confianza) */}
          <TrustPillarsSection currentLocale={currentLocale} />

          {/* Seccion Contacto (Formulario Avanzado para Twenty CRM) */}
          <CrmContactForm currentLocale={currentLocale} />
        </>
      )}
    </PageLayout>
  );
}
