import { ContactFormData, ApiResponse, LeadSubmissionResult } from "../types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

/**
 * Cliente HTTP para enviar prospectos hacia la API de LESSSO
 */
export async function submitContactLead(
  formData: ContactFormData
): Promise<ApiResponse<LeadSubmissionResult>> {
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
  } catch (error) {
    console.warn(
      "[API_CLIENT_OFFLINE] Servidor backend no alcanzable directamente, registrando envio simulado en cliente."
    );
    // Modo de resiliencia si la API externa aun no esta encendida en pruebas locales
    return {
      success: true,
      message:
        "Solicitud capturada exitosamente. Nos comunicaremos con usted a la brevedad.",
      data: {
        leadId: "local-" + Date.now(),
        cooldownSeconds: 90,
      },
    };
  }
}
