import { ContactFormData, ApiResponse, LeadSubmissionResult } from "../types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");

/**
 * Cliente HTTP para enviar prospectos hacia la API de LESSSO
 */
export async function submitContactLead(
  formData: ContactFormData
): Promise<ApiResponse<LeadSubmissionResult>> {
  if (!BACKEND_URL) {
    return { success: false, message: "El formulario no está disponible en este momento. Contáctenos directamente por correo." };
  }
  const targetUrl = `${BACKEND_URL}/api/v1/leads`;

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = (await response.json()) as ApiResponse<LeadSubmissionResult>;

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "No se pudo procesar la solicitud en el servidor.",
        error: data.error,
        remainingSeconds: data.remainingSeconds,
        issues: data.issues,
      };
    }

    return data;
  } catch {
    return {
      success: false,
      message: "No fue posible conectar con el servidor. Inténtelo de nuevo o contáctenos directamente por correo.",
    };
  }
}
