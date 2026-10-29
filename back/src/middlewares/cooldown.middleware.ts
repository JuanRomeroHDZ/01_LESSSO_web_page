import { randomUUID } from "node:crypto";
import Redis from "ioredis";
import { env } from "../config/env";

const memoryCooldownMap = new Map<string, { expiresAt: number; token: string }>();
let redisClient: Redis | null = null;

if (env.REDIS_URL) {
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 1,
    connectTimeout: 2000,
    lazyConnect: true,
    retryStrategy: () => null,
  });
  redisClient = client;
  client.on("error", () => { if (redisClient === client) redisClient = null; });
  client.connect().catch(() => {
    console.warn("[REDIS_WARN] Redis no disponible; el cooldown usa memoria local.");
    if (redisClient === client) redisClient = null;
  });
}

type Reservation = { remainingSeconds: number; release?: () => Promise<void> };

/** Atomically reserve both the IP and email before attempting delivery. */
export async function reserveCooldown(ip: string, email: string): Promise<Reservation> {
  const keys = [`cooldown:ip:${ip}`, `cooldown:email:${email.toLowerCase().trim()}`];
  const token = randomUUID();
  const client = redisClient;
  if (client && client.status === "ready") {
    try {
      const remaining = Number(await client.eval(`
        local remaining = 0
        for _, key in ipairs(KEYS) do
          local ttl = math.ceil(redis.call('PTTL', key) / 1000)
          if ttl > remaining then remaining = ttl end
        end
        if remaining > 0 then return remaining end
        for _, key in ipairs(KEYS) do redis.call('SET', key, ARGV[1], 'EX', ARGV[2]) end
        return 0
      `, keys.length, ...keys, token, String(env.COOLDOWN_SECONDS)));
      if (remaining > 0) return { remainingSeconds: remaining };
      return {
        remainingSeconds: 0,
        release: async () => {
          await client.eval(`
            for _, key in ipairs(KEYS) do
              if redis.call('GET', key) == ARGV[1] then redis.call('DEL', key) end
            end
            return 1
          `, keys.length, ...keys, token).catch(() => {});
        },
      };
    } catch {
      // A single-process fallback cannot coordinate across separate instances.
    }
  }

  const now = Date.now();
  const remaining = Math.max(0, ...keys.map((key) => Math.ceil(((memoryCooldownMap.get(key)?.expiresAt || 0) - now) / 1000)));
  if (remaining > 0) return { remainingSeconds: remaining };
  const expiresAt = now + env.COOLDOWN_SECONDS * 1000;
  for (const key of keys) memoryCooldownMap.set(key, { expiresAt, token });
  const timer = setTimeout(() => {
    for (const key of keys) {
      if (memoryCooldownMap.get(key)?.token === token) memoryCooldownMap.delete(key);
    }
  }, (env.COOLDOWN_SECONDS + 1) * 1000);
  timer.unref();
  return { remainingSeconds: 0, release: async () => {
    for (const key of keys) {
      if (memoryCooldownMap.get(key)?.token === token) memoryCooldownMap.delete(key);
    }
  } };
}
