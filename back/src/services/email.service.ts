import nodemailer from "nodemailer";
import { env } from "../config/env";
import { LeadInput } from "../validators/lead.validator";

export class EmailUnavailableError extends Error {}

/** The visitor's data stays on the server; credentials are never exposed to the browser. */
export async function sendLeadEmail(lead: LeadInput): Promise<void> {
  if (!env.CONTACT_FORM_ENABLED || !env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD || !env.SMTP_FROM) {
    throw new EmailUnavailableError("Contact email delivery is not configured");
  }

  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    requireTLS: env.SMTP_PORT === 587,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const lines = [
    `Modalidad: ${lead.entityType === "COMPANY" ? "Empresa" : "Persona"}`,
    `Nombre: ${lead.fullName}`,
    `Correo: ${lead.email}`,
    `Teléfono: ${lead.countryCode} ${lead.phoneNumber}`,
    `Área: ${lead.areaOfInterest}`,
    ...(lead.entityType === "COMPANY" ? [
      `Empresa: ${lead.companyName || ""}`,
      `Puesto: ${lead.jobTitle || ""}`,
      `Tamaño: ${lead.companySize || ""}`,
      `Urgencia: ${lead.urgencyLevel || ""}`,
      `Presupuesto: ${lead.estimatedBudget || ""}`,
    ] : []),
    "",
    "Detalles:",
    lead.projectDetails,
  ];

  await transport.sendMail({
    from: env.SMTP_FROM,
    to: env.OFFICIAL_CONTACT_EMAIL,
    replyTo: lead.email,
    subject: "Nueva consulta desde el sitio LESSSO",
    text: lines.join("\n"),
  });
}
