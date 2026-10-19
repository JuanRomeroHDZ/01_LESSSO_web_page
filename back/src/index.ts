import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./config/env";
import { corsOptions } from "./config/cors";
import { registerSecurityMiddlewares } from "./middlewares/security.middleware";
import { leadRoutes } from "./routes/lead.routes";
import { healthRoutes } from "./routes/health.routes";

async function bootstrap() {
  const server = Fastify({
    logger: {
      level: env.NODE_ENV === "development" ? "info" : "warn",
    },
    trustProxy: true,
    // Limite maximo estricto de 10kb para mitigar DoS y agotamiento de memoria por payloads masivos
    bodyLimit: 10240,
  });

  // 1. Registro de cabeceras de seguridad y CORS
  await registerSecurityMiddlewares(server);
  await server.register(cors, corsOptions);

  // 2. Registro de rutas versionadas (/api/v1)
  await server.register(leadRoutes, { prefix: "/api/v1" });
  await server.register(healthRoutes, { prefix: "/api/v1" });

  // 3. Manejador de errores global seguro
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || "SERVER_ERROR",
      message: error.message || "Ocurrio un error interno en el servidor.",
    });
  });

  // 4. Inicializacion del servidor
  try {
    const address = await server.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });
    console.info(`[LESSSO_API] Servidor activo escuchando en ${address}`);
    console.info(`[LESSSO_API] Endpoint de diagnostico: ${address}/api/v1/health`);
    console.info(`[LESSSO_API] Endpoint de captacion y validacion: ${address}/api/v1/leads`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  // 5. Cierre ordenado de procesos (Graceful Shutdown)
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.info(`[LESSSO_API] Recibida senal ${signal}. Iniciando apagado ordenado...`);
      await server.close();
      console.info("[LESSSO_API] Servidor cerrado correctamente.");
      process.exit(0);
    });
  }
}

bootstrap();
