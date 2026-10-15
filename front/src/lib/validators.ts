import { z } from "zod";

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/;
const phoneDigitsRegex = /^\d{10}$/;

export const contactFormSchema = z
  .object({
    entityType: z.enum(["PERSON", "COMPANY"]),
    fullName: z
      .string()
      .min(3, "El nombre completo debe tener al menos 3 caracteres")
      .max(80, "El nombre no puede exceder 80 caracteres")
      .regex(nameRegex, "El nombre solo puede contener letras y espacios"),
    email: z
      .string()
      .email("Ingrese un correo electronico valido")
      .max(255, "El correo no puede exceder 255 caracteres"),
    countryCode: z.string().default("+52"),
    phoneNumber: z
      .string()
      .regex(phoneDigitsRegex, "El telefono debe tener exactamente 10 digitos numericos"),
    areaOfInterest: z.enum(
      [
        "Ciberseguridad",
        "Desarrollo de Software",
        "Infraestructura",
        "Consultoría Integral",
      ],
      {
        errorMap: () => ({ message: "Seleccione un area de interes" }),
      }
    ),
    projectDetails: z
      .string()
      .min(20, "Por favor proporcione al menos 20 caracteres sobre su proyecto")
      .max(500, "Los detalles no pueden exceder 500 caracteres"),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "Debe aceptar los Terminos y el Aviso de Privacidad"),

    // Campo Honeypot invisible
    website_verification_code: z.string().optional(),

    // Campos condicionales para Empresa
    companyName: z.string().optional(),
    jobTitle: z.string().max(80, "Maximo 80 caracteres").optional(),
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
          message: "El nombre de la empresa es obligatorio (minimo 2 caracteres)",
        });
      }
    }
  });

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
