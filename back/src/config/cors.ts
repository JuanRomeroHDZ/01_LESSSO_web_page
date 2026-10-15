import { FastifyCorsOptions } from "@fastify/cors";
import { env } from "./env";

/**
 * Politica de intercambio de recursos de origen cruzado (CORS)
 * Solo permite solicitudes originadas desde el Frontend autorizado
 */
export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como curl o Postman en desarrollo local)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      env.FRONTEND_URL,
      "http://localhost:3000",
      "https://lessso.com",
      "https://www.lessso.com",
    ];

    if (allowedOrigins.includes(origin) || env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      callback(new Error("[CORS_BLOCKED] Origen no autorizado por politicas de seguridad."), false);
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};
