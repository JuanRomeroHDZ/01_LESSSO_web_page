import { FastifyRequest, FastifyReply } from "fastify";
import { leadInputSchema } from "../validators/lead.validator";
import { registerCooldown } from "../middlewares/cooldown.middleware";
import { env } from "../config/env";

/**
 * Controlador de validacion atomica y filtro perimetral de seguridad para prospectos
 * Verifica esquemas Zod, mitigacion anti-SQLi/XSS, y registra el Cooldown obligatorio
 */
export async function createLeadHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // 1. Validacion estricta en servidor con Zod (incluye filtros anti-SQLi y anti-XSS)
  const validationResult = leadInputSchema.safeParse(request.body);

  if (!validationResult.success) {
    reply.status(400).send({
      statusCode: 400,
      error: "VALIDATION_ERROR",
      message: "Los datos enviados contienen inconsistencias o patrones no permitidos.",
      issues: validationResult.error.format(),
    });
    return;
  }

  const leadData = validationResult.data;
  const clientIp = request.ip || "unknown-ip";

  try {
    // 2. Registro obligatorio de Cooldown de 90 segundos por IP y correo
    await registerCooldown(clientIp, leadData.email);

    // 3. Respuesta de confirmacion exitosa para activacion de Cooldown y apertura de WhatsApp
    reply.status(200).send({
      success: true,
      message: "Validación de seguridad completada con éxito. Redirigiendo a WhatsApp.",
      data: {
        validated: true,
        cooldownSeconds: env.COOLDOWN_SECONDS,
      },
    });
  } catch (error) {
    console.error("[LEAD_CONTROLLER_ERROR] Error al registrar cooldown:", (error as Error).message);
    reply.status(500).send({
      statusCode: 500,
      error: "INTERNAL_SERVER_ERROR",
      message: "Ocurrió un problema temporal al procesar su solicitud. Intente nuevamente.",
    });
  }
}
