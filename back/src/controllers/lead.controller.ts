import { FastifyRequest, FastifyReply } from "fastify";
import { leadInputSchema } from "../validators/lead.validator";
import { reserveCooldown } from "../middlewares/cooldown.middleware";
import { env } from "../config/env";
import { LeadInput } from "../validators/lead.validator";
import { EmailUnavailableError, sendLeadEmail } from "../services/email.service";

/**
 * Controlador de validacion atomica y filtro perimetral de seguridad para prospectos
 * Verifica esquemas Zod, mitigacion anti-SQLi/XSS, y registra el Cooldown obligatorio
 */
export async function createLeadHandler(
  request: FastifyRequest,
  reply: FastifyReply,
  deliver: (lead: LeadInput) => Promise<void> = sendLeadEmail
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

  const reservation = await reserveCooldown(clientIp, leadData.email);
  if (reservation.remainingSeconds > 0) {
    reply.status(429).send({
      statusCode: 429,
      error: "COOLDOWN_ACTIVE",
      message: `Por favor espere ${reservation.remainingSeconds} segundos antes de enviar una nueva consulta.`,
      remainingSeconds: reservation.remainingSeconds,
    });
    return;
  }
  try {
    // Nunca confirmar una consulta que el servidor de correo no aceptó.
    await deliver(leadData);

    // 3. Respuesta de confirmacion exitosa para activacion de Cooldown y apertura de WhatsApp
    reply.status(200).send({
      success: true,
      message: "Su consulta fue enviada por correo.",
      data: {
        validated: true,
        cooldownSeconds: env.COOLDOWN_SECONDS,
      },
    });
  } catch (error) {
    await reservation.release?.();
    request.log.error("No fue posible enviar la consulta de contacto");
    const statusCode = error instanceof EmailUnavailableError ? 503 : 500;
    reply.status(statusCode).send({
      statusCode,
      error: statusCode === 503 ? "CONTACT_UNAVAILABLE" : "INTERNAL_SERVER_ERROR",
      message: "Ocurrió un problema temporal al procesar su solicitud. Intente nuevamente.",
    });
  }
}
