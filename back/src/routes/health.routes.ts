import { FastifyInstance } from "fastify";
import { healthCheckHandler } from "../controllers/health.controller";

/**
 * Rutas de comprobacion de estado y salud
 */
export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get("/health", healthCheckHandler);
}
