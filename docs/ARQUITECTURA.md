# ARQUITECTURA TECNICA DEL ECOSISTEMA WEB LESSSO

Este documento describe la arquitectura modular, desacoplada y atómica implementada para la plataforma corporativa y sistema de captacion de prospectos de LESSSO.

---

## 1. PRINCIPIOS DE DISENO ARQUITECTONICO

1. **Desacoplamiento Absoluto:** Las tres capas nucleares (`/front`, `/back`, `/db`) funcionan como proyectos independientes con sus propios contratos, dependencias y ciclo de vida.
2. **Resiliencia Operativa:** La disponibilidad de la captacion de clientes nunca depende de la disponibilidad de servicios de terceros (Twenty CRM). Todo prospecto es resguardado de forma inmutable en PostgreSQL antes de intentar cualquier sincronizacion externa.
3. **Seguridad en Profundidad (Defense in Depth):** La validacion y sanitizacion se aplican tanto en el cliente como en el servidor, complementadas con mecanismos anti-abuso transparentes para el usuario legitimo.
4. **Diseno Editorial y Minimalismo Geometrico:** Rigor estetico sin estridencias, respetando bordes de curvatura suave al 10% (2px - 4px) y paleta sobria (Negro #080A0A, Blanco #FFFFFF/#F8F8F6, acentos Dorado Oscuro #A98242).

---

## 2. SEPARACION ATOMICA DE CAPAS

```
+-------------------------------------------------------------------------+
|                              CAPA FRONTEND                              |
|                          (Next.js App Router)                           |
|  - Componentes Atomicos (Atoms, Molecules, Organisms, Templates)        |
|  - Validacion reactiva con React Hook Form + Zod                       |
|  - Selector reactivo Persona / Empresa                                  |
|  - Temporizador visual de Cooldown (90s con barra dorada)               |
|  - Boton dinamico de WhatsApp con carga contextual                      |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTPS / JSON (Endpoint /api/v1/leads)
                                    v
+-------------------------------------------------------------------------+
|                              CAPA BACKEND                               |
|                         (Fastify + TypeScript)                          |
|  - Cabeceras de seguridad Helmet y CORS restringido                     |
|  - Verificacion de campo Honeypot anti-bots                             |
|  - Rate Limiting por IP (Redis / Memoria)                               |
|  - Verificacion de Cooldown por IP y correo                             |
|  - Re-validacion estricta con Zod y sanitizacion de cadenas             |
+-------------------------------------------------------------------------+
                                    |
                                    +-------------------------------------+
                                    |                                     |
                                    v                                     v
+---------------------------------------+ +-------------------------------+
|         CAPA DE BASE DE DATOS         | |    INTEGRACION TWENTY CRM     |
|       (PostgreSQL 16 + Drizzle)       | |     (API GraphQL / REST)      |
|  - Tabla "leads" con sync_status      | |  - Verificacion de API Key    |
|  - Tabla "audit_logs" para rastreo    | |  - Creacion de People         |
|  - Estado inicial: 'PENDING'          | |  - Creacion de Companies      |
|  - Estado posterior: 'SYNCED'/'FAILED'| |  - Modo tolerante a fallos    |
+---------------------------------------+ +-------------------------------+
```

---

## 3. DIAGRAMA DE FLUJO DE UN PROSPECTO (LEAD)

El siguiente diagrama detalla el recorrido de una solicitud de contacto:

```
[ Usuario envia formulario ]
             |
             v
[ Frontend: Validacion reactiva Zod ] ---> [ Errores en pantalla si no cumple ]
             | (Si es valido)
             v
[ POST /api/v1/leads con Honeypot oculto ]
             |
             v
[ Backend: Check Honeypot ] -------------> [ Si contiene valor -> HTTP 200 silencioso (Descarte) ]
             | (Si esta vacio)
             v
[ Backend: Rate Limiting & Cooldown ] ---> [ Si excede limite -> HTTP 429 con segundos restantes ]
             | (Si esta en tiempo valido)
             v
[ Backend: Sanitizacion y Zod Server ] --> [ Si datos corruptos -> HTTP 400 Bad Request ]
             | (Datos validos)
             v
[ Persistencia en PostgreSQL ] ---------> [ Estado: 'PENDING', UUID generado ]
             |
             v
[ Verificacion de TWENTY_API_KEY ]
     |
     +-----> [ NO configurada o servicio caido ]
     |              |
     |              v
     |       [ Mantener en DB con 'PENDING' ]
     |       [ Responder al usuario: HTTP 201 Exitoso ]
     |
     +-----> [ Configurada y servicio disponible ]
                    |
                    v
             [ Enviar a Twenty CRM ]
                    |
                    +---> Exito: Actualizar en DB a 'SYNCED'
                    +---> Fallo: Mantener en DB con 'FAILED_RETRY'
                    |
                    v
             [ Responder al usuario: HTTP 201 Exitoso ]
                    |
                    v
[ Frontend activa Cooldown de 90 segundos con barra dorada ]
```

---

## 4. CAPAS DE SEGURIDAD IMPLEMENTADAS

### 4.1. Validacion Dual con Zod
* **Frontend:** Evaluacion inmediata en tiempo de digitacion para retroalimentar al usuario sin esperas.
* **Backend:** Re-validacion obligatoria antes de procesar cualquier dato. Si el cliente fue manipulado o la peticion vino de una herramienta externa, el servidor rechaza la peticion.

### 4.2. Sanitizacion de Entradas
* Todos los campos de texto libre (como el mensaje o necesidad de proyecto) son sanitizados para neutralizar etiquetas HTML, inyecciones de scripts (`<script>`, eventos `onload`, etc.) y caracteres de escape perjudiciales.

### 4.3. Trampa Honeypot
* El formulario incluye un campo llamado `website_verification_code` totalmente oculto para usuarios humanos mediante estilos CSS fuera de pantalla y atributos de accesibilidad `aria-hidden="true"`.
* Los bots que rellenan indiscriminadamente todos los campos completaran este valor.
* Si el backend detecta contenido en este campo, responde con un codigo `200 OK` simulado pero descarta inmediatamente el registro sin insertarlo en base de datos ni enviarlo al CRM.

### 4.4. Rate Limiting Basado en Redis
* Control estricto de frecuencia de solicitudes por direccion IP para mitigar ataques de denegacion de servicio y abuso de endpoints.
* En ausencia de Redis, el sistema conmuta automaticamente a un almacen en memoria volátil de respaldo.

### 4.5. Cooldown Temporal (90 Segundos)
* Tras un envio exitoso, el backend registra una marca de tiempo vinculada a la IP y correo electronico.
* Nuevos intentos dentro de los 90 segundos son rechazados con codigo HTTP 429, indicando con precision los segundos restantes.
* El frontend replica este comportamiento mostrando una cuenta regresiva interactiva con barra dorada (`#A98242`).

---

## 5. ESTRUCTURA DE LA BASE DE DATOS (DRIZZLE ORM)

### Tabla `leads`
* `id`: UUID v4 (Clave Primaria).
* `entity_type`: Enum ('PERSON' | 'COMPANY').
* `full_name`: Varchar(80) no nulo.
* `email`: Varchar(255) no nulo.
* `phone`: Varchar(20) no nulo (incluye codigo de pais).
* `area_of_interest`: Varchar(50) no nulo.
* `project_details`: Text no nulo (minimo 20, maximo 500 caracteres).
* `company_name`: Varchar(120) nulo (obligatorio si entity_type es 'COMPANY').
* `job_title`: Varchar(80) nulo.
* `company_size`: Varchar(40) nulo.
* `urgency_level`: Varchar(40) nulo.
* `estimated_budget`: Varchar(50) nulo.
* `terms_accepted`: Boolean no nulo (debe ser verdadero).
* `sync_status`: Enum ('PENDING' | 'SYNCED' | 'FAILED') por defecto 'PENDING'.
* `twenty_person_id`: Varchar(100) nulo (identificador retornado por Twenty CRM).
* `twenty_company_id`: Varchar(100) nulo (identificador retornado por Twenty CRM).
* `ip_address`: Varchar(45) nulo (anonimizado o con fines de seguridad).
* `created_at`: Timestamp with time zone no nulo (momento de recepcion).
* `updated_at`: Timestamp with time zone no nulo.

### Tabla `audit_logs`
* `id`: UUID v4 (Clave Primaria).
* `action`: Varchar(50) (ejemplo: 'LEAD_CREATED', 'CRM_SYNC_SUCCESS', 'CRM_SYNC_FAILED').
* `lead_id`: UUID con clave foranea referenciando a `leads.id`.
* `details`: JSONB con metadatos estructurados del evento.
* `created_at`: Timestamp with time zone.
