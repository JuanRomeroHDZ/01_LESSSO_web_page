import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../config/env";

/**
 * Middleware para atrapar robots spammer mediante campo Honeypot invisible.
 * Si el campo configurado (ej. website_verification_code) contiene texto,
 * se finge una respuesta exitosa 200 pero se descarta la peticion de inmediato.
 */
export async function honeypotCheck(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const body = request.body as Record<string, unknown> | undefined;

  if (body && typeof body === "object") {
    const honeypotVal = body[env.HONEYPOT_FIELD_NAME];

    if (honeypotVal && typeof honeypotVal === "string" && honeypotVal.trim().length > 0) {
      // Registro interno del intento de spam
      console.warn(
        `[HONEYPOT_TRAP] Peticion de bot neutralizada desde IP: ${request.ip}. Campo trampa: ${env.HONEYPOT_FIELD_NAME}`
      );

      // Respuesta exitosa simulada para desalentar reintentos del robot
      reply.status(200).send({
        success: true,
        message: "Solicitud procesada correctamente.",
      });
      return;
    }
  }
}
