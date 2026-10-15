import { FastifyRequest, FastifyReply } from "fastify";
import { leadInputSchema } from "../validators/lead.validator";
import { saveLead } from "../services/lead-storage.service";
import { registerCooldown } from "../middlewares/cooldown.middleware";
import { syncLeadWithTwentyCrm } from "../services/twenty-crm.service";
import { env } from "../config/env";

/**
 * Controlador de recepcion y procesamiento de leads
 */
export async function createLeadHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // 1. Validacion estricta en servidor con Zod
  const validationResult = leadInputSchema.safeParse(request.body);

  if (!validationResult.success) {
    reply.status(400).send({
      statusCode: 400,
      error: "VALIDATION_ERROR",
      message: "Los datos enviados contienen inconsistencias.",
      issues: validationResult.error.format(),
    });
    return;
  }

  const leadData = validationResult.data;
  const clientIp = request.ip || "unknown-ip";

  try {
    // 2. Persistencia local obligatoria e inmediata en PostgreSQL (estado PENDING)
    const savedLead = await saveLead(leadData, clientIp);

    // 3. Registro de Cooldown de 90 segundos para evitar envios duplicados
    await registerCooldown(clientIp, savedLead.email);

    // 4. Intento de sincronizacion con Twenty CRM en segundo plano sin bloquear respuesta
    syncLeadWithTwentyCrm(savedLead).catch((err) => {
      console.warn("[CRM_BACKGROUND_SYNC_WARN] Error en hilo secundario de Twenty CRM:", err.message);
    });

    // 5. Respuesta exitosa inmediata al usuario final
    reply.status(201).send({
      success: true,
      message: "Su solicitud ha sido recibida con exito. Un especialista de LESSSO se pondra en contacto a la brevedad.",
      data: {
        leadId: savedLead.id,
        cooldownSeconds: env.COOLDOWN_SECONDS,
      },
    });
  } catch (error) {
    console.error("[LEAD_CONTROLLER_ERROR] Error al procesar lead:", (error as Error).message);
    reply.status(500).send({
      statusCode: 500,
      error: "INTERNAL_SERVER_ERROR",
      message: "Ocurrio un problema temporal al procesar su solicitud. Intente nuevamente.",
    });
  }
}
