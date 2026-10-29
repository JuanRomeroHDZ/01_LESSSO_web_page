import { FastifyInstance } from "fastify";
import { createLeadHandler } from "../controllers/lead.controller";
import { honeypotCheck } from "../middlewares/honeypot.middleware";
import { rateLimitCheck } from "../middlewares/rate-limit.middleware";
import { LeadInput } from "../validators/lead.validator";

/**
 * Rutas de gestion y recepcion de leads
 */
export async function leadRoutes(app: FastifyInstance, options: { deliver?: (lead: LeadInput) => Promise<void> }): Promise<void> {
  app.post(
    "/leads",
    {
      preHandler: [rateLimitCheck, honeypotCheck],
    },
    (request, reply) => createLeadHandler(request, reply, options.deliver)
  );
}
