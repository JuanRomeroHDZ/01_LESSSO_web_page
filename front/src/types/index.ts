/**
 * Definiciones de tipos TypeScript para el Frontend de LESSSO
 */

export type EntityType = "PERSON" | "COMPANY";

export type AreaOfInterest =
  | "Ciberseguridad"
  | "Desarrollo de Software"
  | "Infraestructura"
  | "Consultoría Integral";

export type CompanySize =
  | "1-10 empleados"
  | "11-50 empleados"
  | "51-200 empleados"
  | "Más de 200 empleados";

export type UrgencyLevel =
  | "Inmediato / Crítico"
  | "1 a 3 meses"
  | "Explorando opciones";

export type EstimatedBudget =
  | "Menos de $2,500 USD"
  | "$2,500 - $10,000 USD"
  | "Más de $10,000 USD"
  | "A definir / Necesito cotización";

export interface ContactFormData {
  entityType: EntityType;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  areaOfInterest: AreaOfInterest;
  projectDetails: string;
  termsAccepted: boolean;
  website_verification_code?: string; // Honeypot

  // Campos condicionales para Empresa
  companyName?: string;
  jobTitle?: string;
  companySize?: CompanySize;
  urgencyLevel?: UrgencyLevel;
  estimatedBudget?: EstimatedBudget;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  remainingSeconds?: number;
  issues?: Record<string, unknown>;
}

export interface LeadSubmissionResult {
  leadId: string;
  cooldownSeconds: number;
}
