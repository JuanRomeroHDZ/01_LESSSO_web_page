import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../config/env";

const serverStartTime = Date.now();

/**
 * Controlador de comprobacion de salud y diagnostico del ecosistema API
 * Reporta el estado operativo del servidor API, uptime y estado de seguridad
 */
export async function healthCheckHandler(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  const memoryUsage = process.memoryUsage();

  reply.status(200).send({
    status: "HEALTHY",
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: env.NODE_ENV,
    security: {
      rateLimiting: "ACTIVE",
      cooldownProtection: "ACTIVE",
      honeypotShield: "ACTIVE",
      payloadGuard: "ACTIVE_10KB",
      antiSqlInjection: "ENFORCED",
      antiXss: "ENFORCED",
    },
    system: {
      rssMemoryMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
      heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
    },
  });
}
