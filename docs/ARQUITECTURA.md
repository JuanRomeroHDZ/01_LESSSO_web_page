# ARQUITECTURA TECNICA DEL ECOSISTEMA WEB LESSSO

Este documento describe la arquitectura modular, desacoplada y atomica implementada para la plataforma corporativa y sistema de contacto seguro de LESSSO.

---

## 1. PRINCIPIOS DE DISENO ARQUITECTONICO

1. **Desacoplamiento Absoluto y Atomicidad:** Las capas del sistema (`/front` y `/back`) funcionan como proyectos independientes con sus propios contratos, dependencias y ciclo de vida. Esta separacion estricta garantiza maxima escalabilidad futura, permitiendo migrar o ampliar cualquier servicio sin refactorizar la aplicacion completa.
2. **Seguridad Perimetral y en Profundidad (Defense in Depth):** Toda entrada del usuario es validada, sanitizada y verificada contra vectores de ataque (SQLi, XSS, DoS, Command Injection) tanto en el cliente como en el servidor.
3. **Resiliencia Operativa:** El flujo de contacto no depende de bases de datos pesadas ni plataformas externas acopladas; el backend valida de forma atomica y el usuario es canalizado mediante mensajes estructurados hacia WhatsApp con temporizador de proteccion (Cooldown).
4. **Diseno Editorial y Minimalismo Geometrico:** Rigor estetico sin estridencias, respetando bordes de curvatura suave al 10% (2px - 4px) y paleta sobria (Negro #080A0A, Blanco #FFFFFF/#F8F8F6, acentos Dorado Oscuro #A98242).

---

## 2. SEPARACION ATOMICA DE CAPAS

```
+-------------------------------------------------------------------------+
|                              CAPA FRONTEND                              |
|                    (Next.js App Router + Vercel)                        |
|  - Componentes Atomicos (Atoms, Molecules, Organisms, Templates)        |
|  - Validacion reactiva con React Hook Form + Zod                       |
|  - Filtros perimetrales anti-SQLi y anti-XSS en el cliente             |
|  - Selector reactivo Persona / Empresa (EntitySwitch.tsx)               |
|  - Temporizador visual de Cooldown (90s con barra dorada)               |
|  - Boton dinamico de WhatsApp con carga contextual                      |
|  - Redireccion automatica y estructurada tras envio valido              |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTPS / JSON (Endpoint /api/v1/leads)
                                    v
+-------------------------------------------------------------------------+
|                              CAPA BACKEND                               |
|                         (Fastify + TypeScript)                          |
|  - Parser JSON con limite de payload estricto (10kb contra DoS)         |
|  - Cabeceras de seguridad Helmet y CORS restringido                     |
|  - Verificacion de campo Honeypot anti-bots (rechazo silencioso)        |
|  - Rate Limiting por IP (Redis / Memoria volatil)                       |
|  - Verificacion de Cooldown obligatorio de 90 segundos                  |
|  - Filtro determinista anti-SQLi y anti-XSS en servidor                 |
|  - Re-validacion estricta con esquemas Zod (Persona / Empresa)          |
|  - Respuesta de confirmacion y activacion de cooldown                   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                    CANAL DIRECTO DE COMUNICACION                        |
|                         (WhatsApp Business)                             |
|  - Enlace estructurado generado con parametros sanitizados              |
|  - Detalle completo de la solicitud adaptado a Persona o Empresa        |
|  - Comunicacion directa e inmediata de alta confianza                   |
+-------------------------------------------------------------------------+
```

---

## 3. DIAGRAMA DE FLUJO DE UN CONTACTO TECNICO

El siguiente diagrama detalla el recorrido de una solicitud de contacto:

```
[ Usuario interactua con formulario ]
             |
             +---> [ Digita en tiempo real ] ---> [ Boton secundario WhatsApp se actualiza dinamicamente ]
             |
             v
[ Presiona "Enviar Solicitud Tecnica" ]
             |
             v
[ Frontend: Validacion Zod + Anti-SQLi/XSS ] ---> [ Errores en pantalla si no cumple ]
             | (Si es valido)
             v
[ POST /api/v1/leads con Honeypot ]
             |
             v
[ Backend: Check Honeypot ] --------------------> [ Si contiene valor -> HTTP 200 silencioso (Descarte) ]
             | (Si esta vacio)
             v
[ Backend: Rate Limiting ] ---------------------> [ Si excede 10 req/15 min -> HTTP 429 ]
             | (Si esta dentro del limite)
             v
[ Backend: Verificacion de Cooldown ] ----------> [ Si IP/correo en cooldown -> HTTP 429 ]
             | (Si transcurrieron mas de 90s)
             v
[ Backend: Filtro Anti-SQLi y Anti-XSS ] -------> [ Si detecta patrones -> HTTP 400 Bad Request ]
             | (Sin secuencias maliciosas)
             v
[ Backend: Validacion de Esquema Zod ] ---------> [ Si no cumple tipos/longitudes -> HTTP 400 Bad Request ]
             | (Datos validos)
             v
[ Backend: Registrar Cooldown (90s) ]
             |
             v
[ Backend: Responder HTTP 200 OK con { validated: true, cooldownSeconds: 90 } ]
             |
             v
[ Frontend: Recibe confirmacion ]
             |
             +---> [ Activa CooldownTimer visual de 90 segundos con barra dorada ]
             +---> [ Muestra notificacion de recepcion exitosa ]
             +---> [ Abre automaticamente WhatsApp con mensaje estructurado y sanitizado ]
             +---> [ Limpia los campos del formulario preservando la modalidad seleccionada ]
```

---

## 4. BLINDAJE DE SEGURIDAD (PERIMETRAL Y PROFUNDIDAD)

### 4.1. Proteccion contra SQL Injection (SQLi)
A pesar de no utilizar base de datos relacional directa en esta etapa, el backend y el frontend mantienen un blindaje determinista contra SQLi por arquitectura defensiva y escalabilidad hacia futuros microservicios:
* **Secuencias de Escape y Comentarios:** Bloqueo de `--`, `;`, `/*`, `*/`.
* **Inyecciones Booleanas y Tautologicas:** Bloqueo de expresiones `OR 1=1`, `AND 1=1`, `OR '1'='1'`.
* **Sentencias DDL y DML:** Bloqueo de `UNION SELECT`, `UNION ALL SELECT`, `DROP TABLE`, `INSERT INTO`, `DELETE FROM`, `UPDATE ... SET`, `ALTER TABLE`, `CREATE TABLE`.
* **Funciones de Ejecucion y Retardo:** Bloqueo de `EXEC(`, `SLEEP(`, `BENCHMARK(`, `WAITFOR DELAY`, `INFORMATION_SCHEMA`.
* **Campos de Control:** Prohibicion expresa de comillas simples (`'`) y dobles (`"`) en nombres, empresas y puestos.

### 4.2. Proteccion contra Cross-Site Scripting (XSS) y Command Injection
* Bloqueo y remocion de etiquetas HTML ejecutables: `<script>`, `<iframe>`, `<svg>`, `<img>`.
* Bloqueo de pseudo-protocolos y controladores de eventos: `javascript:`, `onerror=`, `onload=`, `onclick=`, `eval()`.
* Bloqueo de caracteres nulos (`\0`) y operadores de shell (`&&`, `||`, backticks, `$()`).
* Sanitizacion activa de caracteres sensibles convirtiendolos en entidades seguras antes de su procesamiento.

### 4.3. Mitigacion de DoS y DDoS
* **Límite de Payload en Body Parser:** Fastify configurado con `bodyLimit: 10240` (10kb). Cualquier peticion con cuerpo mayor es rechazada de inmediato por el kernel del servidor con HTTP 413, evitando ataques de agotamiento de memoria.
* **Restricciones Fisicas en DOM y Esquemas Zod:**
  * Nombre Completo: Minimo 3, Maximo 80 caracteres. `maxLength={80}` en DOM.
  * Telefono: Minimo 10, Maximo 15 digitos estrictamente numericos (`/^\d{10,15}$/`). `maxLength={15}` en DOM.
  * Correo Electronico: Maximo 100 caracteres. `maxLength={100}` en DOM.
  * Nombre de Empresa: Maximo 100 caracteres. `maxLength={100}` en DOM.
  * Puesto / Rol: Maximo 100 caracteres. `maxLength={100}` en DOM.
  * Detalles del Proyecto: Minimo 20, Maximo 500 caracteres. `maxLength={500}` en DOM.

### 4.4. Trampa Honeypot Anti-Bots
* Campo invisible `website_verification_code` ubicado fuera de la pantalla mediante tecnicas CSS y marcado con `aria-hidden="true"`.
* Los bots que completan todos los campos de forma automatica rellenan este valor.
* El middleware `honeypotCheck` intercepta la peticion y responde con un `HTTP 200 OK` simulado pero descarta la operacion silenciosamente, sin registrar cooldown ni procesar el mensaje.

### 4.5. Rate Limiting y Cooldown
* **Rate Limiting:** Control de frecuencia por direccion IP (10 solicitudes por ventana de 15 minutos).
* **Cooldown Obligatorio:** Lapso de 90 segundos entre solicitudes por IP y correo electronico.
* Respaldado en memoria de Redis si esta disponible, con conmutacion automatica y transparente a memoria volatil en el servidor API.

---

## 5. ESTRATEGIA DE DESPLIEGUE EN VERCEL

El frontend esta disenado para operar en Vercel como aplicacion Server-Side Rendered (SSR) y Static Site Generated (SSG) de Next.js App Router:
* **Cabeceras de Seguridad HTTP:** Configuradas en `front/vercel.json` y `vercel.json` con `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y `X-XSS-Protection`.
* **Variables de Entorno en Vercel:**
  * `NEXT_PUBLIC_BACKEND_URL`: Direccion publica de la API backend.
  * `NEXT_PUBLIC_WHATSAPP_NUMBER`: Numero corporativo para recepcion de mensajes.
