import { FastifyRequest, FastifyReply } from "fastify";
import Redis from "ioredis";
import { env } from "../config/env";

// Almacen en memoria volatil de respaldo si Redis no esta disponible
const memoryCooldownMap = new Map<string, number>();

let redisClient: Redis | null = null;

if (env.REDIS_URL) {
  try {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      lazyConnect: true,
      retryStrategy: () => null, // No reintentar indefinidamente si esta apagado
    });

    redisClient.on("error", () => {
      // Manejar silenciosamente el fallo de conexion a Redis y conmutar a memoria
      redisClient = null;
    });

    redisClient.connect().catch(() => {
      console.warn("[REDIS_WARN] No se pudo conectar a Redis. Usando memoria volatil para Cooldown.");
      redisClient = null;
    });
  } catch {
    redisClient = null;
  }
}

/**
 * Middleware de Cooldown (Tiempo de espera obligatorio entre envios)
 * Aplica el lapso configurado (por defecto 90 segundos) por IP y correo
 */
export async function verifyCooldown(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const ip = request.ip || "unknown-ip";
  const body = request.body as { email?: string } | undefined;
  const email = body?.email ? body.email.toLowerCase().trim() : "";

  const cooldownKeys = [`cooldown:ip:${ip}`];
  if (email) {
    cooldownKeys.push(`cooldown:email:${email}`);
  }

  const now = Date.now();

  // 1. Verificacion mediante Redis si esta conectado
  if (redisClient && redisClient.status === "ready") {
    try {
      for (const key of cooldownKeys) {
        const ttl = await redisClient.ttl(key);
        if (ttl > 0) {
          reply.status(429).send({
            statusCode: 429,
            error: "COOLDOWN_ACTIVE",
            message: `Por favor espere ${ttl} segundos antes de enviar una nueva consulta.`,
            remainingSeconds: ttl,
          });
          return;
        }
      }
      return;
    } catch {
      // Continuar con memoria si falla la operacion de Redis
    }
  }

  // 2. Verificacion mediante almacen en memoria de respaldo
  for (const key of cooldownKeys) {
    const expiresAt = memoryCooldownMap.get(key);
    if (expiresAt && expiresAt > now) {
      const remainingSeconds = Math.ceil((expiresAt - now) / 1000);
      reply.status(429).send({
        statusCode: 429,
        error: "COOLDOWN_ACTIVE",
        message: `Por favor espere ${remainingSeconds} segundos antes de enviar una nueva consulta.`,
        remainingSeconds,
      });
      return;
    }
  }
}

/**
 * Registra el cooldown activo tras un envio exitoso
 */
export async function registerCooldown(ip: string, email?: string): Promise<void> {
  const cooldownSecs = env.COOLDOWN_SECONDS;
  const cooldownKeys = [`cooldown:ip:${ip}`];
  if (email) {
    cooldownKeys.push(`cooldown:email:${email.toLowerCase().trim()}`);
  }

  const now = Date.now();
  const expiresAt = now + cooldownSecs * 1000;

  // Registrar en Redis si esta listo
  if (redisClient && redisClient.status === "ready") {
    try {
      const pipeline = redisClient.pipeline();
      for (const key of cooldownKeys) {
        pipeline.set(key, "1", "EX", cooldownSecs);
      }
      await pipeline.exec();
      return;
    } catch {
      // Caer en almacenamiento en memoria
    }
  }

  // Registrar en memoria volatil
  for (const key of cooldownKeys) {
    memoryCooldownMap.set(key, expiresAt);
  }

  // Limpieza periodica de memoria
  setTimeout(() => {
    for (const key of cooldownKeys) {
      const currentExpiry = memoryCooldownMap.get(key);
      if (currentExpiry && currentExpiry <= Date.now()) {
        memoryCooldownMap.delete(key);
      }
    }
  }, (cooldownSecs + 5) * 1000);
}
