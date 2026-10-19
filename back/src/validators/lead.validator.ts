import { z } from "zod";

/**
 * Patrones detectores de inyeccion SQL (SQLi) clasica y avanzada
 */
export const SQLI_PATTERNS = [
  /--/,
  /;\s*$/,
  /;\s*(--|\/\*|\w)/,
  /\/\*/,
  /\*\//,
  /['"]\s*(OR|AND)\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\b(OR|AND)\s+\d+\s*=\s*\d+\b/i,
  /\b(OR|AND)\s+['"][^'"]+['"]\s*=\s*['"][^'"]+['"]/i,
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bINSERT\s+INTO\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bUPDATE\s+.+\s+SET\b/i,
  /\bEXEC(\s+|\()/i,
  /\bSLEEP\s*\(/i,
  /\bBENCHMARK\s*\(/i,
  /\bWAITFOR\s+DELAY\b/i,
  /\bINFORMATION_SCHEMA\b/i,
  /\bSELECT\s+.+\s+FROM\b/i,
  /\bALTER\s+TABLE\b/i,
  /\bCREATE\s+TABLE\b/i,
];

/**
 * Patrones detectores de Cross-Site Scripting (XSS) e inyeccion de comandos
 */
export const XSS_COMMAND_PATTERNS = [
  /<script\b/i,
  /<\/script>/i,
  /<iframe\b/i,
  /javascript\s*:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /onclick\s*=/i,
  /<svg\b/i,
  /<img\b/i,
  /eval\s*\(/i,
  /\x00/,
  /&&/,
  /\|\|/,
  /`/,
  /\$\(/,
  /<[^>]+>/,
];

/**
 * Evalua si un texto contiene secuencias de inyeccion SQL
 */
export function containsSqlInjection(input: string): boolean {
  if (!input) return false;
  return SQLI_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Evalua si un texto contiene vectores XSS o inyeccion de comandos
 */
export function containsXssOrCommandInjection(input: string): boolean {
  if (!input) return false;
  return XSS_COMMAND_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitiza cadenas de entrada eliminando etiquetas y codificando caracteres criticos
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/\0/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>'"&`$]/g, (char) => {
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "&": return "&amp;";
        case "`": return "&#96;";
        case "$": return "&#36;";
        default: return char;
      }
    })
    .trim();
}

/**
 * Expresion regular para nombres validos (letras latinas, tildes, dieresis, espacios, puntos y guiones)
 */
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.-]+$/;

/**
 * Expresion regular para validar telefono numerico estricto (minimo 10, maximo 15 digitos)
 */
export const phoneDigitsRegex = /^\d{10,15}$/;

/**
 * Esquema unificado y validado para prospectos tecnicos
 */
export const leadInputSchema = z
  .object({
    entityType: z.enum(["PERSON", "COMPANY"]).default("PERSON"),
    fullName: z
      .string()
      .trim()
      .min(3, "El nombre completo debe tener al menos 3 caracteres")
      .max(80, "El nombre no puede exceder 80 caracteres")
      .regex(nameRegex, "El nombre solo puede contener letras, espacios, puntos o guiones")
      .refine((val) => !val.includes("'") && !val.includes('"'), {
        message: "No se permiten comillas en el nombre",
      })
      .refine((val) => !containsSqlInjection(val), {
        message: "Se detectaron patrones no permitidos (SQLi) en el nombre",
      })
      .refine((val) => !containsXssOrCommandInjection(val), {
        message: "Se detectaron vectores no permitidos en el nombre",
      }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Formato de correo electronico invalido")
      .max(100, "El correo electronico no puede exceder 100 caracteres")
      .refine((val) => !containsSqlInjection(val), {
        message: "Se detectaron patrones no permitidos (SQLi) en el correo",
      })
      .refine((val) => !containsXssOrCommandInjection(val), {
        message: "Se detectaron caracteres no permitidos en el correo",
      }),
    countryCode: z
      .string()
      .regex(/^\+\d{1,4}$/, "El codigo de pais debe tener formato internacional (ej. +52)")
      .default("+52"),
    phoneNumber: z
      .string()
      .regex(phoneDigitsRegex, "El telefono debe contener entre 10 y 15 digitos estrictamente numericos"),
    areaOfInterest: z.enum(
      [
        "Ciberseguridad",
        "Desarrollo de Software",
        "Infraestructura",
        "Consultoría Integral",
      ],
      {
        errorMap: () => ({ message: "Debe seleccionar un area de interes valida" }),
      }
    ),
    projectDetails: z
      .string()
      .trim()
      .min(20, "Los detalles del proyecto deben tener al menos 20 caracteres")
      .max(500, "Los detalles del proyecto no pueden exceder 500 caracteres")
      .refine((val) => !containsSqlInjection(val), {
        message: "Se detectaron patrones no permitidos (SQLi) en los detalles del proyecto",
      })
      .refine((val) => !containsXssOrCommandInjection(val), {
        message: "Se detectaron vectores de script o comandos no permitidos en los detalles",
      }),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "Debe aceptar los Terminos y el Aviso de Privacidad"),

    website_verification_code: z.string().max(50).optional(),

    companyName: z
      .string()
      .trim()
      .max(100, "El nombre de la empresa no puede exceder 100 caracteres")
      .refine((val) => !val || (!val.includes("'") && !val.includes('"')), {
        message: "No se permiten comillas en el nombre de empresa",
      })
      .refine((val) => !val || !containsSqlInjection(val), {
        message: "Se detectaron patrones no permitidos (SQLi) en el nombre de la empresa",
      })
      .refine((val) => !val || !containsXssOrCommandInjection(val), {
        message: "Se detectaron patrones no permitidos en el nombre de la empresa",
      })
      .optional(),
    jobTitle: z
      .string()
      .trim()
      .max(100, "El puesto no puede exceder 100 caracteres")
      .refine((val) => !val || (!val.includes("'") && !val.includes('"')), {
        message: "No se permiten comillas en el puesto",
      })
      .refine((val) => !val || !containsSqlInjection(val), {
        message: "Se detectaron patrones no permitidos (SQLi) en el puesto",
      })
      .refine((val) => !val || !containsXssOrCommandInjection(val), {
        message: "Se detectaron patrones no permitidos en el puesto",
      })
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
  })
  .superRefine((data, ctx) => {
    if (data.entityType === "COMPANY") {
      if (!data.companyName || data.companyName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "El nombre de la empresa es obligatorio en la modalidad Empresa (minimo 2 caracteres)",
        });
      }
    }
  });

export type LeadInput = z.infer<typeof leadInputSchema>;
