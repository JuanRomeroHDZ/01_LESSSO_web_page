import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../config/env";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryRateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Middleware para limitar la tasa de peticiones por direccion IP
 */
export async function rateLimitCheck(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const ip = request.ip || "unknown-ip";
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000;
  const maxRequests = env.RATE_LIMIT_MAX_REQUESTS;

  const record = memoryRateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    memoryRateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return;
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    reply.header("Retry-After", retryAfterSeconds.toString());
    reply.status(429).send({
      statusCode: 429,
      error: "TOO_MANY_REQUESTS",
      message: `Limite de solicitudes excedido. Intente nuevamente en ${retryAfterSeconds} segundos.`,
    });
    return;
  }

  record.count += 1;
}
