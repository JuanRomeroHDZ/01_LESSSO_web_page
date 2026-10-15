import { z } from "zod";

/**
 * Funcion de sanitizacion estricta contra inyecciones XSS y caracteres maliciosos
 * Remueve etiquetas HTML, ejecutables y secuencias de escape
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Eliminar etiquetas HTML completas
    .replace(/[<>'"&]/g, (char) => {
      // Reemplazo de caracteres peligrosos por entidades seguras
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "&": return "&amp;";
        default: return char;
      }
    })
    .trim();
}

/**
 * Expresion regular para nombres validos (letras latinas, tildes, dieresis y espacios)
 */
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/;

/**
 * Expresion regular para validar telefono de 10 digitos numericos
 */
const phoneDigitsRegex = /^\d{10}$/;

/**
 * ----------------------------------------------------------------------------
 * ESQUEMA BASE PARA CONTACTO INDIVIDUAL (PERSONA)
 * Para anadir nuevos campos al modo Persona:
 * 1. Anadir la propiedad en baseLeadSchema con su validador Zod correspondiente.
 * 2. Anadir la columna en db/src/schema/leads.schema.ts.
 * 3. Mapear el nuevo campo en back/src/services/twenty-crm.service.ts.
 * ----------------------------------------------------------------------------
 */
export const baseLeadSchema = z.object({
  entityType: z.enum(["PERSON", "COMPANY"]).default("PERSON"),
  fullName: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(80, "El nombre no puede exceder 80 caracteres")
    .regex(nameRegex, "El nombre solo puede contener letras y espacios")
    .transform((val) => sanitizeInput(val)),
  email: z
    .string()
    .email("Formato de correo electronico invalido")
    .max(255, "El correo no puede exceder 255 caracteres")
    .toLowerCase()
    .trim(),
  countryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, "El codigo de pais debe tener formato internacional (ej. +52)")
    .default("+52"),
  phoneNumber: z
    .string()
    .regex(phoneDigitsRegex, "El telefono debe contener exactamente 10 digitos numericos"),
  areaOfInterest: z.enum([
    "Ciberseguridad",
    "Desarrollo de Software",
    "Infraestructura",
    "Consultoría Integral",
  ], {
    errorMap: () => ({ message: "Debe seleccionar un area de interes valida" }),
  }),
  projectDetails: z
    .string()
    .min(20, "Los detalles del proyecto deben tener al menos 20 caracteres")
    .max(500, "Los detalles del proyecto no pueden exceder 500 caracteres")
    .transform((val) => sanitizeInput(val)),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "Debe aceptar los Terminos y el Aviso de Privacidad"),

  // Campo Honeypot para neutralizacion de bots (debe llegar vacio)
  website_verification_code: z.string().optional(),
});

/**
 * ----------------------------------------------------------------------------
 * ESQUEMA EXPANDIDO PARA EMPRESAS (EMPRESA)
 * Se activa condicionalmente cuando entityType === 'COMPANY'
 * Para anadir nuevos campos de Empresa:
 * 1. Declarar la propiedad opcional/obligatoria en companyFields.
 * 2. Incorporar el campo a la interfaz de React en front/src/types/index.ts.
 * ----------------------------------------------------------------------------
 */
export const companyFields = z.object({
  companyName: z
    .string()
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
    .max(120, "El nombre de la empresa no puede exceder 120 caracteres")
    .transform((val) => sanitizeInput(val))
    .optional(),
  jobTitle: z
    .string()
    .max(80, "El puesto no puede exceder 80 caracteres")
    .transform((val) => sanitizeInput(val))
    .optional(),
  companySize: z
    .enum([
      "1-10 empleados",
      "11-50 empleados",
      "51-200 empleados",
      "Más de 200 empleados",
    ])
    .optional(),
  urgencyLevel: z
    .enum(["Inmediato / Crítico", "1 a 3 meses", "Explorando opciones"])
    .optional(),
  estimatedBudget: z
    .enum([
      "Menos de $2,500 USD",
      "$2,500 - $10,000 USD",
      "Más de $10,000 USD",
      "A definir / Necesito cotización",
    ])
    .optional(),
});

/**
 * Esquema unificado y validado con superRefine para forzar requisitos de Empresa
 */
export const leadInputSchema = baseLeadSchema.merge(companyFields).superRefine((data, ctx) => {
  if (data.entityType === "COMPANY") {
    if (!data.companyName || data.companyName.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "El nombre de la empresa es obligatorio en la modalidad Empresa",
      });
    }
  }
});

export type LeadInput = z.infer<typeof leadInputSchema>;
