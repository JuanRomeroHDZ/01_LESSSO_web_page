import * as dotenv from "dotenv";
import { isIP } from "node:net";
import { z } from "zod";

// Carga del archivo .env desde la raiz si existe
dotenv.config({ path: "../.env" });
dotenv.config();

/**
 * Esquema de validacion de variables de entorno del servidor
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  REDIS_URL: z.string().optional().default("redis://localhost:6379"),
  COOLDOWN_SECONDS: z.coerce.number().int().min(1).max(86400).default(90),
  HONEYPOT_FIELD_NAME: z.string().default("website_verification_code"),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().min(1).max(10000).default(10),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().min(1).max(1440).default(15),
  // Only explicitly listed reverse-proxy IPs may supply forwarded client addresses.
  TRUSTED_PROXY_IPS: z.string().default("").transform((value) => value.split(",").map((ip) => ip.trim()).filter(Boolean)).refine((ips) => ips.every((ip) => isIP(ip) !== 0), "TRUSTED_PROXY_IPS debe contener direcciones IP válidas"),
  CONTACT_FORM_ENABLED: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().refine((port) => port === 465 || port === 587).default(465),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.preprocess((value) => value === "" ? undefined : value, z.string().email().optional()),
  OFFICIAL_CONTACT_EMAIL: z.string().email().default("contacto@lessso.com"),
  WHATSAPP_PHONE_NUMBER: z.string().default("000000000000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("[ENV_ERROR] Variables de entorno invalidas:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
