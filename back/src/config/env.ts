import * as dotenv from "dotenv";
import { z } from "zod";

// Carga del archivo .env desde la raiz si existe
dotenv.config({ path: "../.env" });
dotenv.config();

/**
 * Esquema de validacion de variables de entorno del servidor
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().transform((val) => parseInt(val, 10)).default("4000"),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string().default(
    "postgresql://lessso_admin:lessso_secure_db_password_change_me@localhost:5432/lessso_production"
  ),
  REDIS_URL: z.string().optional().default("redis://localhost:6379"),
  TWENTY_API_URL: z.string().optional().default(""),
  TWENTY_API_KEY: z.string().optional().default(""),
  COOLDOWN_SECONDS: z.string().transform((val) => parseInt(val, 10)).default("90"),
  HONEYPOT_FIELD_NAME: z.string().default("website_verification_code"),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform((val) => parseInt(val, 10)).default("10"),
  RATE_LIMIT_WINDOW_MINUTES: z.string().transform((val) => parseInt(val, 10)).default("15"),
  OFFICIAL_CONTACT_EMAIL: z.string().email().default("contacto@lessso.com"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("[ENV_ERROR] Variables de entorno invalidas:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
