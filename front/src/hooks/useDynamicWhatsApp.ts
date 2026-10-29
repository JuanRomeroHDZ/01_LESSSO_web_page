"use client";

import { useMemo } from "react";
import { SITE_CONFIG } from "../config/site-content";

export interface FormStateForWhatsApp {
  fullName?: string;
  companyName?: string;
  areaOfInterest?: string;
  projectDetails?: string;
}

export interface StructuredLeadData {
  entityType: "PERSON" | "COMPANY";
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  areaOfInterest: string;
  projectDetails: string;
  companyName?: string;
  jobTitle?: string;
  companySize?: string;
  urgencyLevel?: string;
  estimatedBudget?: string;
}

/**
 * Limpia y sanitiza cadenas de texto para insercion segura en URLs
 */
function cleanField(val?: string): string {
  if (!val) return "";
  return val
    .replace(/\0/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>'"`$]/g, "")
    .trim();
}

/**
 * Genera la URL oficial de WhatsApp con mensaje completo y estructurado
 * Adaptado segun sea Persona o Empresa
 */
export function buildStructuredWhatsAppUrl(data: StructuredLeadData): string {
  const rawNumber = SITE_CONFIG.contact.whatsappNumber || "000000000000";
  const targetNumber = rawNumber.replace(/\D/g, "") || "000000000000";

  const lines: string[] = [
    "Hola equipo LESSSO, envío mi solicitud técnica:",
    "",
    `*Modalidad:* ${data.entityType === "COMPANY" ? "Empresa" : "Persona"}`,
    `*Nombre:* ${cleanField(data.fullName)}`,
    `*Correo:* ${cleanField(data.email)}`,
    `*Teléfono:* ${cleanField(data.countryCode)} ${cleanField(data.phoneNumber)}`,
  ];

  if (data.entityType === "COMPANY") {
    if (data.companyName) lines.push(`*Empresa:* ${cleanField(data.companyName)}`);
    if (data.jobTitle) lines.push(`*Puesto / Rol:* ${cleanField(data.jobTitle)}`);
    if (data.companySize) lines.push(`*Tamaño:* ${cleanField(data.companySize)}`);
    if (data.urgencyLevel) lines.push(`*Urgencia:* ${cleanField(data.urgencyLevel)}`);
    if (data.estimatedBudget) lines.push(`*Presupuesto:* ${cleanField(data.estimatedBudget)}`);
  }

  lines.push(`*Área de Interés:* ${cleanField(data.areaOfInterest)}`);
  lines.push(`*Detalles del Proyecto:* ${cleanField(data.projectDetails)}`);

  const messageText = lines.join("\n");
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Hook para generar dinamicamente el enlace y mensaje de WhatsApp
 * Prohibido el uso de colores verdes o logos oficiales. Enfoque editorial sobrio.
 */
export function useDynamicWhatsApp(formData?: FormStateForWhatsApp) {
  const whatsappUrl = useMemo(() => {
    const rawNumber = SITE_CONFIG.contact.whatsappNumber || "000000000000";
    const targetNumber = rawNumber.replace(/\D/g, "") || "000000000000";

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
        const cleanName = cleanField(formData.fullName);
        if (formData.companyName && formData.companyName.trim().length > 0) {
          parts.push(`mi nombre es ${cleanName} de ${cleanField(formData.companyName)}.`);
        } else {
          parts.push(`mi nombre es ${cleanName}.`);
        }
      }

      if (formData.areaOfInterest) {
        parts.push(`Tengo interés en su división de ${cleanField(formData.areaOfInterest)}.`);
      }

      if (formData.projectDetails && formData.projectDetails.trim().length > 0) {
        parts.push(`Detalles preliminares: ${cleanField(formData.projectDetails)}`);
      }

      messageText = parts.join(" ");
    } else {
      messageText =
        "Hola equipo LESSSO, deseo consultar información técnica sobre sus servicios de ciberseguridad, desarrollo e infraestructura.";
    }

    const encodedMessage = encodeURIComponent(messageText);
    return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
  }, [formData]);

  return { whatsappUrl };
}
