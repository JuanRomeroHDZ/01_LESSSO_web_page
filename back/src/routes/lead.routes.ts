import { FastifyInstance } from "fastify";
import { createLeadHandler } from "../controllers/lead.controller";
import { honeypotCheck } from "../middlewares/honeypot.middleware";
import { verifyCooldown } from "../middlewares/cooldown.middleware";
import { rateLimitCheck } from "../middlewares/rate-limit.middleware";

/**
 * Rutas de gestion y recepcion de leads
 */
export async function leadRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    "/leads",
    {
      preHandler: [honeypotCheck, rateLimitCheck, verifyCooldown],
    },
    createLeadHandler
  );
}
