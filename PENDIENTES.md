# LISTA DE CONTROL TECNICA Y TAREAS PENDIENTES - LESSSO

Este documento enumera las tareas planificadas, configuraciones posteriores y lineas de evolucion arquitectonica para el ecosistema LESSSO. Todas las entradas estan ordenadas por prioridad de despliegue. Cero emojis.

---

## 1. DESPLIEGUE EN VERCEL Y CONFIGURACION DE ENTORNO

- [ ] Vincular el repositorio de GitHub en el panel de Vercel ([vercel.com](https://vercel.com)).
- [ ] Configurar el Root Directory en `front` dentro de los ajustes del proyecto en Vercel.
- [ ] Configurar las variables de entorno en Vercel:
  - `NEXT_PUBLIC_BACKEND_URL`: URL publica de la API backend (ejemplo: `https://api.lessso.com`).
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Numero corporativo oficial con lada internacional, reemplazando el placeholder inicial `000000000000`.
- [ ] Probar el despliegue tanto via Dashboard de GitHub como a traves de Vercel CLI (`vercel --prod`).
- [ ] Verificar la aplicacion de cabeceras de seguridad HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`) inspeccionando las respuestas de Vercel.

---

## 2. INFRAESTRUCTURA DE BACKEND, DOMINIOS Y CERTIFICADOS SSL

- [ ] Apuntar los registros DNS de tipo A para `lessso.com`, `www.lessso.com` (Vercel CNAME) y `api.lessso.com` (direccion IP publica del VPS o servidor de aplicacion).
- [ ] Levantar el servidor API Backend (`/back`) y el contenedor de Redis en el servidor de produccion utilizando `compose.yaml`.
- [ ] Configurar el Proxy Host en Nginx Proxy Manager para `api.lessso.com` apuntando hacia `http://lessso-back:4000`.
- [ ] Solicitar certificados SSL automaticos Let's Encrypt con renovacion habilitada y forzar redireccion HTTP a HTTPS en todos los hosts.
- [ ] Activar soporte para HTTP/2 y verificacion del healthcheck en `https://api.lessso.com/api/v1/health`.

---

## 3. SUSTITUCION DE DATOS DEFINITIVOS DE CONTACTO

- [ ] Sustituir el placeholder del numero de WhatsApp (`000000000000`) en `.env` y en la variable de produccion `NEXT_PUBLIC_WHATSAPP_NUMBER` por la linea corporativa oficial con WhatsApp Business activo (10 digitos local, 12 con lada Mexico 52, maximo 15 digitos).
- [ ] Reemplazar la direccion fisica simulada en `front/src/config/site-content.ts` por la direccion fiscal definitiva de LESSSO.
- [ ] Confirmar la direccion de correo electronico oficial (`contacto@lessso.com`) en la variable `OFFICIAL_CONTACT_EMAIL`.

---

## 4. PAGINAS DEDICADAS DE DIVISIONES (FASE 1.5)

- [ ] Consolidar la ruta `/cybersecurity` y `/cybersecurity/penetration-testing` con el diseno Rojo Profundo (`#240B0B`), presentando los servicios de auditoria de vulnerabilidades, pruebas de penetracion (Pentesting), aseguramiento de infraestructura y cumplimiento normativo.
- [ ] Desarrollar la pagina completa `/software` con el tema Jade Oscuro (`#081416`), detallando el desarrollo de plataformas web a medida, APIs de alta concurrencia, modernizacion de sistemas y arquitectura cloud-native.
- [ ] Desarrollar la pagina completa `/infrastructure` con el tema Azul Oscuro (`#0C1024`), abordando virtualizacion, orquestacion con Kubernetes, pipelines de CI/CD, observabilidad y resiliencia de centros de datos.
- [ ] Actualizar los enlaces de navegacion en `front/src/components/organisms/SmartHeader.tsx` para vincular directamente a las rutas definitivas.

---

## 5. LOCALIZACION E INTERNACIONALIZACION (ES / EN)

- [ ] Completar la traduccion al ingles de todas las descripciones detalladas de los pilares en `front/src/config/site-content.ts`.
- [ ] Traducir las opciones desplegables del formulario de contacto (areas de interes, niveles de urgencia y rangos presupuestarios).
- [ ] Conectar el estado del conmutador de idioma con persistencia en cookie o localStorage para recordar la seleccion del visitante durante su navegacion.

---

## 6. DOCUMENTOS LEGALES Y CUMPLIMIENTO REGULATORIO

- [ ] Redactar el texto oficial del Aviso de Privacidad de conformidad con la legislacion aplicable (LFPDPPP en Mexico o RGPD si opera en la UE) en la ruta `/privacidad`.
- [ ] Redactar los Terminos y Condiciones de Servicio y vincularlos a la ruta `/terminos`.
- [ ] Revisar la politica de cookies en `/cookies` alineandola con la legislacion vigente de privacidad digital.

---

## 7. EVOLUCION ARQUITECTONICA - FASE 2 (PORTAL DE CLIENTES Y ESCALABILIDAD)

- [ ] Disenar el acceso a clientes (`Login / Portal`) en la barra de navegacion superior sin alterar el equilibrio minimalista.
- [ ] Implementar autenticacion basada en tokens JWT con refresco seguro en cookies `HttpOnly` y roles (`admin`, `analyst`, `client`).
- [ ] Desarrollar el panel de control para clientes donde puedan consultar el estado de sus sistemas, alertas de ciberseguridad en tiempo real y metricas de rendimiento de sus plataformas.
- [ ] Aprovechar la atomicidad `/front` y `/back` para conectar microservicios adicionales de analisis de vulnerabilidades y telemetria automatizada.
