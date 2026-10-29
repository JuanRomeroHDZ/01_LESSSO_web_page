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

    // The configured site is the only browser origin authorized to call the API.
    if (origin === env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};
