import { FastifyRequest, FastifyReply } from "fastify";
import { isStorageHealthy } from "../services/lead-storage.service";
import { env } from "../config/env";

const serverStartTime = Date.now();

/**
 * Controlador de comprobacion de salud y diagnostico del ecosistema API
 */
export async function healthCheckHandler(
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const dbStatus = await isStorageHealthy();
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  const memoryUsage = process.memoryUsage();

  const isHealthy = dbStatus;

  reply.status(isHealthy ? 200 : 503).send({
    status: isHealthy ? "HEALTHY" : "DEGRADED",
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: env.NODE_ENV,
    checks: {
      database: dbStatus ? "CONNECTED" : "UNREACHABLE",
      twentyCrmIntegration: env.TWENTY_API_KEY ? "CONFIGURED" : "PENDING_CREDENTIALS",
    },
    system: {
      rssMemoryMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
      heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
    },
  });
}
