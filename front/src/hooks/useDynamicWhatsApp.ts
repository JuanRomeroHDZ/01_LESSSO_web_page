"use client";

import { useMemo } from "react";
import { SITE_CONFIG } from "../config/site-content";

interface FormStateForWhatsApp {
  fullName?: string;
  companyName?: string;
  areaOfInterest?: string;
  projectDetails?: string;
}

/**
 * Hook para generar dinamicamente el enlace y mensaje de WhatsApp
 * Prohibido el uso de colores verdes o logos oficiales. Enfoque editorial sobrio.
 */
export function useDynamicWhatsApp(formData?: FormStateForWhatsApp) {
  const whatsappUrl = useMemo(() => {
    const phoneNumber = SITE_CONFIG.contact.whatsappNumber;

    const hasData =
      formData &&
      (formData.fullName?.trim() ||
        formData.companyName?.trim() ||
        formData.areaOfInterest ||
        formData.projectDetails?.trim());

    let messageText = "";

    if (hasData) {
      const parts: string[] = ["Hola equipo LESSSO,"];

      if (formData.fullName && formData.fullName.trim().length > 0) {
        if (formData.companyName && formData.companyName.trim().length > 0) {
          parts.push(`mi nombre es ${formData.fullName.trim()} de ${formData.companyName.trim()}.`);
        } else {
          parts.push(`mi nombre es ${formData.fullName.trim()}.`);
        }
      }

      if (formData.areaOfInterest) {
        parts.push(`Tengo interés en su división de ${formData.areaOfInterest}.`);
      }

      if (formData.projectDetails && formData.projectDetails.trim().length > 0) {
        parts.push(`Detalles preliminares: ${formData.projectDetails.trim()}`);
      }

      messageText = parts.join(" ");
    } else {
      messageText =
        "Hola equipo LESSSO, deseo consultar información técnica sobre sus servicios de ciberseguridad, desarrollo e infraestructura.";
    }

    const encodedMessage = encodeURIComponent(messageText);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }, [formData?.fullName, formData?.companyName, formData?.areaOfInterest, formData?.projectDetails]);

  return { whatsappUrl };
}
