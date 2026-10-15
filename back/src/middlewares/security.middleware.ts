import { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";

/**
 * Registra cabeceras y configuraciones de proteccion del servidor HTTP
 */
export async function registerSecurityMiddlewares(app: FastifyInstance): Promise<void> {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  });
}
