import Fastify from "fastify";
import cors from "@fastify/cors";
import { corsOptions } from "./config/cors";
import { env } from "./config/env";
import { registerSecurityMiddlewares } from "./middlewares/security.middleware";
import { leadRoutes } from "./routes/lead.routes";
import { healthRoutes } from "./routes/health.routes";
import {
  leadInputSchema,
  containsSqlInjection,
  containsXssOrCommandInjection,
} from "./validators/lead.validator";

async function runSecurityTestSuite() {
  console.log("=================================================");
  console.log("INICIANDO BATERIA DE PRUEBAS DE SEGURIDAD LESSSO");
  console.log("=================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`[PASS] ${testName}`);
    } else {
      console.error(`[FAIL] ${testName}`);
      process.exitCode = 1;
    }
  }

  // ---------------------------------------------------------------------------
  // 1. PRUEBAS DETERMINISTAS ANTI-SQL INJECTION (SQLi)
  // ---------------------------------------------------------------------------
  console.log("--- 1. Pruebas Anti-SQL Injection (SQLi) ---");

  assert(containsSqlInjection("' OR 1=1 --"), "Deteccion de ' OR 1=1 --");
  assert(containsSqlInjection("UNION SELECT * FROM users"), "Deteccion de UNION SELECT * FROM users");
  assert(containsSqlInjection("DROP TABLE users; --"), "Deteccion de DROP TABLE users; --");
  assert(containsSqlInjection("admin' AND 1=1 /*"), "Deteccion de tautologia AND 1=1 con comentario");
  assert(containsSqlInjection("SELECT id, name FROM accounts;"), "Deteccion de consulta directa SELECT FROM");
  assert(containsSqlInjection("WAITFOR DELAY '0:0:5'"), "Deteccion de inyeccion de tiempo WAITFOR DELAY");

  // Validacion de esquema Zod ante SQLi
  const sqliLead1 = {
    entityType: "PERSON",
    fullName: "Juan Perez ' OR 1=1 --",
    email: "juan@example.com",
    countryCode: "+52",
    phoneNumber: "5512345678",
    areaOfInterest: "Ciberseguridad",
    projectDetails: "Necesitamos asesoría técnica de ciberseguridad para nuestra empresa.",
    termsAccepted: true,
  };
  const sqliResult1 = leadInputSchema.safeParse(sqliLead1);
  assert(!sqliResult1.success, "Rechazo de Lead con SQLi en fullName (' OR 1=1 --)");

  const sqliLead2 = {
    entityType: "PERSON",
    fullName: "Juan Perez",
    email: "juan@example.com",
    countryCode: "+52",
    phoneNumber: "5512345678",
    areaOfInterest: "Ciberseguridad",
    projectDetails: "Auditoria UNION SELECT * FROM users para evaluar integridad perimetral.",
    termsAccepted: true,
  };
  const sqliResult2 = leadInputSchema.safeParse(sqliLead2);
  assert(!sqliResult2.success, "Rechazo de Lead con SQLi en projectDetails (UNION SELECT)");

  // ---------------------------------------------------------------------------
  // 2. PRUEBAS DETERMINISTAS ANTI-XSS Y COMMAND INJECTION
  // ---------------------------------------------------------------------------
  console.log("\n--- 2. Pruebas Anti-XSS y Command Injection ---");

  assert(containsXssOrCommandInjection("<script>alert(1)</script>"), "Deteccion de etiqueta <script>");
  assert(containsXssOrCommandInjection("<iframe src=\"javascript:alert(1)\">"), "Deteccion de iframe javascript");
  assert(containsXssOrCommandInjection("<img src=x onerror=alert(1)>"), "Deteccion de payload img onerror");
  assert(containsXssOrCommandInjection("test && rm -rf /"), "Deteccion de operador de comando shell &&");
  assert(containsXssOrCommandInjection("test `id`"), "Deteccion de backticks de shell");

  const xssLead = {
    entityType: "PERSON",
    fullName: "Carlos <script>alert(1)</script>",
    email: "carlos@example.com",
    countryCode: "+52",
    phoneNumber: "5512345678",
    areaOfInterest: "Desarrollo de Software",
    projectDetails: "Detalles validos de desarrollo pero con XSS <script>alert(1)</script>",
    termsAccepted: true,
  };
  const xssResult = leadInputSchema.safeParse(xssLead);
  assert(!xssResult.success, "Rechazo de Lead con vector XSS (<script>alert(1)</script>)");

  // ---------------------------------------------------------------------------
  // 3. PRUEBAS DE LONGITUD Y FORMATO DE TELEFONO (10 A 15 DIGITOS NUMERICOS)
  // ---------------------------------------------------------------------------
  console.log("\n--- 3. Pruebas de Validacion de Telefono ---");

  const phone9Digits = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "123456789", // 9 digitos (invalido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(!leadInputSchema.safeParse(phone9Digits).success, "Rechazo de telefono con menos de 10 digitos (9)");

  const phone16Digits = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "1234567890123456", // 16 digitos (invalido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(!leadInputSchema.safeParse(phone16Digits).success, "Rechazo de telefono con mas de 15 digitos (16)");

  const phoneWithLetters = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "551234567a", // Letras (invalido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(!leadInputSchema.safeParse(phoneWithLetters).success, "Rechazo de telefono con caracteres alfabeticos");

  const phoneValid10 = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "5512345678", // 10 digitos (valido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(leadInputSchema.safeParse(phoneValid10).success, "Aceptacion de telefono valido de 10 digitos");

  const phoneValid12 = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "525512345678", // 12 digitos con lada Mexico (valido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(leadInputSchema.safeParse(phoneValid12).success, "Aceptacion de telefono valido de 12 digitos (con lada MX)");

  const phoneValid15 = {
    entityType: "PERSON",
    fullName: "Maria Lopez",
    email: "maria@example.com",
    countryCode: "+52",
    phoneNumber: "521551234567890", // 15 digitos maximo (valido)
    areaOfInterest: "Infraestructura",
    projectDetails: "Requerimos consultoria tecnica de arquitectura de servidores y kubernetes.",
    termsAccepted: true,
  };
  assert(leadInputSchema.safeParse(phoneValid15).success, "Aceptacion de telefono valido de 15 digitos (limite maximo)");

  // ---------------------------------------------------------------------------
  // 4. PRUEBAS DE INTEGRACION DE SERVIDOR: COOLDOWN, HONEYPOT Y DOS PAYLOAD
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. Pruebas de Servidor HTTP: Cooldown, Honeypot y Limite de Payload ---");

  const server = Fastify({
    logger: false,
    bodyLimit: 10240, // 10kb
  });

  await registerSecurityMiddlewares(server);
  await server.register(cors, corsOptions);
  let delivered = 0;
  await server.register(leadRoutes, { prefix: "/api/v1", deliver: async () => { delivered++; } });
  await server.register(leadRoutes, { prefix: "/api/fail", deliver: async () => { throw new Error("SMTP unavailable"); } });
  await server.register(leadRoutes, { prefix: "/api/disabled" });
  await server.register(healthRoutes, { prefix: "/api/v1" });

  const validLeadPayload = {
    entityType: "PERSON",
    fullName: "Alejandro Morales",
    email: "alejandro.morales@empresa.com",
    countryCode: "+52",
    phoneNumber: "5598765432",
    areaOfInterest: "Ciberseguridad",
    projectDetails: "Deseamos contratar un servicio integral de pruebas de penetracion para nuestras APIs.",
    termsAccepted: true,
  };

  const allowedOrigin = await server.inject({ method: "OPTIONS", url: "/api/v1/leads", headers: { origin: env.FRONTEND_URL, "access-control-request-method": "POST" } });
  assert(allowedOrigin.headers["access-control-allow-origin"] === env.FRONTEND_URL, "CORS permite el origen configurado");
  const otherOrigin = await server.inject({ method: "OPTIONS", url: "/api/v1/leads", headers: { origin: "https://sitio-no-autorizado.example", "access-control-request-method": "POST" } });
  assert(!otherOrigin.headers["access-control-allow-origin"], "CORS no autoriza otros orígenes");

  assert(leadInputSchema.safeParse({ ...validLeadPayload, fullName: "María O'Connor" }).success, "Los nombres válidos con apóstrofo se aceptan");
  assert(!leadInputSchema.safeParse({ ...validLeadPayload, fullName: "   " }).success, "Un nombre vacío tras quitar espacios se rechaza");

  const malformedEmail = await server.inject({
    method: "POST",
    url: "/api/v1/leads",
    remoteAddress: "198.51.100.41",
    payload: { ...validLeadPayload, email: { value: "invalid" } },
  });
  assert(malformedEmail.statusCode === 400, "Un correo con tipo inválido se rechaza sin error interno");

  const disabled = await server.inject({ method: "POST", url: "/api/disabled/leads", remoteAddress: "198.51.100.40", payload: validLeadPayload });
  assert(disabled.statusCode === 503, "El formulario desactivado no finge enviar correo");
  const failed = await server.inject({ method: "POST", url: "/api/fail/leads", remoteAddress: "198.51.100.39", payload: validLeadPayload });
  assert(failed.statusCode === 500, "Un fallo SMTP no se comunica como envío exitoso");

  // Test 4.1: Envio inicial valido -> Debe responder 200 OK
  const res1 = await server.inject({
    method: "POST",
    url: "/api/v1/leads",
    remoteAddress: "198.51.100.42",
    payload: validLeadPayload,
  });
  const body1 = JSON.parse(res1.body);
  assert(res1.statusCode === 200 && body1.success === true && delivered === 1, "Envio valido confirma solamente después de entregar el correo");

  // Test 4.2: Segundo envio inmediato desde misma IP -> Debe bloquearse por COOLDOWN (HTTP 429)
  const res2 = await server.inject({
    method: "POST",
    url: "/api/v1/leads",
    remoteAddress: "198.51.100.42",
    payload: validLeadPayload,
  });
  const body2 = JSON.parse(res2.body);
  assert(
    res2.statusCode === 429 && body2.error === "COOLDOWN_ACTIVE",
    `Segundo envio inmediato bloqueado por Cooldown: HTTP 429 (${body2.message})`
  );

  // Las solicitudes simultáneas no deben saltarse el tiempo de espera.
  const concurrentPayload = { ...validLeadPayload, email: "concurrente@empresa.com" };
  const simultaneous = await Promise.all([0, 1].map(() => server.inject({
    method: "POST", url: "/api/v1/leads", remoteAddress: "198.51.100.50", payload: concurrentPayload,
  })));
  assert(simultaneous.filter((response) => response.statusCode === 200).length === 1 &&
    simultaneous.filter((response) => response.statusCode === 429).length === 1,
    "Las solicitudes simultáneas respetan el tiempo de espera");

  // Test 4.3: Trampa Honeypot con robot spammer
  const botPayload = {
    ...validLeadPayload,
    email: "bot@spamnetwork.com",
    website_verification_code: "automatic_bot_injection_token",
  };
  const resHoneypot = await server.inject({
    method: "POST",
    url: "/api/v1/leads",
    remoteAddress: "203.0.113.88",
    payload: botPayload,
  });
  const honeypotBody = JSON.parse(resHoneypot.body);
  assert(
    resHoneypot.statusCode === 200 && honeypotBody.success === true,
    "Trampa Honeypot: Rechazo silencioso con HTTP 200 sin procesar solicitud de bot"
  );

  // Test 4.4: Mitigacion DoS por exceso de payload (> 10kb)
  const hugePayload = {
    ...validLeadPayload,
    projectDetails: "A".repeat(15000), // 15kb
  };
  const resHuge = await server.inject({
    method: "POST",
    url: "/api/v1/leads",
    remoteAddress: "198.51.100.99",
    payload: hugePayload,
  });
  assert(
    resHuge.statusCode === 413,
    "Mitigacion DoS: Payload mayor a 10kb bloqueado por Fastify con HTTP 413 (Payload Too Large)"
  );

  // ---------------------------------------------------------------------------
  // RESUMEN FINAL
  // ---------------------------------------------------------------------------
  console.log("\n=================================================");
  console.log(`RESUMEN: ${passedTests} de ${totalTests} pruebas superadas exitosamente.`);
  console.log("=================================================");

  await server.close();
  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runSecurityTestSuite().catch((err) => {
  console.error("Error al ejecutar bateria de pruebas:", err);
  process.exit(1);
});
