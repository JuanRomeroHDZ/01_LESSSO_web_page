# Pendientes para publicar LESSSO

Estado: el sitio presenta un enlace de correo directo y el formulario automático está desactivado. Las páginas legales siguen siendo borradores y no se muestran. Las tareas de esta lista deben completarse y verificarse antes de activar las funciones indicadas.

## Contacto actual

- [ ] Confirmar que `contacto@lessso.com` existe, recibe mensajes en Zoho y es el correo que desea publicar LESSSO. Mientras tanto, es el correo que muestra el sitio; se cambia en `front/src/config/site-content.ts` y, para el formulario futuro, en `OFFICIAL_CONTACT_EMAIL` del backend.
- [ ] Enviar un mensaje real desde otro correo, incluyendo uno desde un teléfono, para comprobar recepción y respuesta.
- El enlace `mailto:` abre la aplicación de correo del visitante. El visitante redacta y envía su mensaje; el sitio no puede imponer límites ni confirmar su entrega. Si no tiene una aplicación configurada, puede copiar la dirección.

## Documentos legales

- [ ] Redactar y revisar con asesoría legal el aviso de privacidad, los términos y la política de cookies y almacenamiento local para la operación real de LESSSO y la legislación aplicable.
- [ ] Sustituir los borradores y sus notas internas en `front/src/app/privacidad/page.tsx`, `terminos/page.tsx` y `cookies/page.tsx`. Revisar también el consentimiento del formulario, la finalidad del tratamiento y el uso de proveedores como Zoho.
- [ ] Una vez completados y aprobados, establecer `NEXT_PUBLIC_LEGAL_PAGES_ENABLED=true` y volver a compilar el frontend. Hasta entonces las rutas devuelven 404 y los enlaces no aparecen.

## Formulario y correo automático: preparación opcional

La opción más sencilla y sin servicio adicional por ahora es el enlace `mailto:`. El código del formulario y el envío SMTP están preparados, pero **no basta con activar una variable**: antes se necesita un backend público, documentos legales terminados y una cuenta SMTP que permita enviar mensajes. Una respuesta exitosa del servidor indica que el proveedor SMTP aceptó el mensaje; no garantiza su entrega final a la bandeja de entrada.

- [ ] Confirmar con Zoho el plan, centro de datos, disponibilidad de SMTP, límites de envío y precio aplicables a la cuenta concreta. Zoho documenta parámetros SMTP para varios tipos de cuenta, pero también describe acceso exclusivamente web para su plan gratuito de organización; verificar la cuenta antes de depender de SMTP. IMAP/POP y SMTP son funciones distintas.
- [ ] Confirmar el correo receptor, la cuenta remitente autorizada y, si corresponde, crear una contraseña de aplicación con la autenticación de dos factores. No usar la contraseña personal ni incluir credenciales en Git, en código frontend o en variables `NEXT_PUBLIC_*`.
- [ ] Configurar en el **backend**, mediante variables privadas del servidor o `.env` no versionado: `CONTACT_FORM_ENABLED=true`, `OFFICIAL_CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT` (465 con TLS implícito o 587 con STARTTLS), `SMTP_USER`, `SMTP_PASSWORD` y `SMTP_FROM`. El remitente debe estar autorizado por el proveedor. Los valores de ejemplo comentados están en `.env.example`; copiar únicamente los necesarios y sustituirlos por datos reales.
- [ ] Zoho indica que el servidor depende de la cuenta y del centro de datos; consultar su configuración real. Su documentación menciona `smtp.zoho.com` para ciertas cuentas personales/gratuitas y `smtppro.zoho.com` para organizaciones de pago, con puertos 465 o 587. No asumir que todos los planes disponen del mismo acceso.
- [ ] Publicar la API en HTTPS y establecer `FRONTEND_URL` con el origen exacto del sitio. En el **frontend**, establecer `NEXT_PUBLIC_BACKEND_URL` con la URL pública HTTPS de la API y, solo después de completar lo legal y probar SMTP, `NEXT_PUBLIC_LEGAL_PAGES_ENABLED=true` y `NEXT_PUBLIC_CONTACT_FORM_ENABLED=true`. Las variables públicas de Next.js se incorporan al compilar: reconstruir el frontend después de cambiarlas. En Docker Compose se pasan como argumentos de compilación; ejecutar una nueva compilación de la imagen tras cambiarlas. En desarrollo local se pueden colocar en `front/.env.local`; en producción usar el panel o entorno de despliegue.
- [ ] Probar persona y empresa, campos obligatorios y límites, mensajes de error, proveedor SMTP caído, correo recibido, respuesta al remitente, reintentos y el comportamiento en móvil. No activar el formulario hasta completar estas pruebas.
- Fuentes: [configuración SMTP de Zoho](https://www.zoho.com/mail/help/zoho-smtp.html), [planes y acceso de Zoho Mail](https://www.zoho.com/mail/help/adminconsole/subscription.html) y [límites de uso](https://www.zoho.com/mail/help/adminconsole/rates-and-limits.html).

## Límites y seguridad del servidor

- El backend limita el cuerpo HTTP a 10 KB, valida tipos y longitudes, aplica límites de solicitudes por IP, espera entre consultas y un campo antispam. Estos controles se aplican también cuando se utiliza un VPS o servidor propio; no hay una excepción para ese entorno.
- [ ] Definir y verificar `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_WINDOW_MINUTES` y `COOLDOWN_SECONDS` según el tráfico real. El formulario limita los detalles a 500 caracteres, el nombre a 80 y el correo a 100; revisar los mensajes de error en español e inglés antes de activarlo.
- [ ] Si existe un proxy inverso, configurar `TRUSTED_PROXY_IPS` con **solo las IP exactas de proxies propios** que llegan a la API, separadas por comas. Restringir el acceso directo a la API mediante firewall y comprobar que una cabecera `X-Forwarded-For` enviada directamente por un cliente no pueda falsificar su IP. Sin un proxy configurado, la API usa la IP de la conexión; detrás de un proxy no configurado, diferentes visitantes podrían compartir el mismo límite.
- [ ] Si se usa `compose.yaml`, definir una contraseña propia para Redis y su `REDIS_URL` correspondiente. El panel del proxy y los puertos de Redis, frontend y API se publican solo en localhost; acceder al panel mediante un túnel seguro si el servidor es remoto. El proxy en la red de Docker puede conectar directamente con los servicios.
- [ ] Mantener Redis disponible para compartir el tiempo de espera entre instancias. El límite de tasa actual se almacena en memoria por proceso y el respaldo del tiempo de espera también es local si Redis falla; para varios procesos o servidores se necesita un limitador compartido antes de confiar en un límite global. Probar concurrencia, reinicios, fallos de Redis y carga real.
- [ ] Mantener las dependencias actualizadas, ejecutar sus auditorías y probar cabeceras, TLS y la configuración del servidor de producción. La revisión de desarrollo usa ESLint 9 por compatibilidad con los complementos de Next.js; actualizarlo cuando estos admitan una versión mantenida. Los filtros de texto no sustituyen la codificación segura al mostrar datos ni las consultas parametrizadas si se añade una base de datos.

## SEO, dominio y lanzamiento

- [ ] Confirmar el dominio público definitivo y configurar `NEXT_PUBLIC_SITE_URL` como su origen HTTPS, por ejemplo `https://www.example.com`, antes de compilar. Con él se generan las URL canónicas y el sitemap; sin él no se inventa un dominio de producción y el sitemap queda vacío.
- [ ] Verificar `robots.txt`, `sitemap.xml`, títulos y descripciones de las páginas publicadas. Al terminar las páginas legales o de servicios, decidir cuáles deben aparecer en el sitemap.
- [ ] Añadir y verificar el dominio en Google Search Console, enviar el sitemap y revisar indexación y resultados después de publicar. Referencias: [guía de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) y [recomendaciones para móviles](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).
- [ ] Revisar el sitio en teléfonos reales, ambos temas, distintos tamaños de pantalla y con teclado/lector de pantalla. Comprobar contraste, rendimiento, movimiento reducido y el enlace de correo. Considerar una imagen propia para compartir en redes cuando exista un recurso aprobado.

## Contenido, redes y servicios pendientes

- [ ] Sustituir los enlaces genéricos de LinkedIn, Instagram, Facebook, TikTok, X y GitHub por los perfiles reales en `front/src/config/site-content.ts`; actualmente los iconos abren la página principal de cada plataforma.
- [ ] Preparar las páginas de software, infraestructura y penetration testing antes de reactivar sus rutas y enlaces. El mapa actual representa Tijuana, no una oficina física.
- [ ] Revisar la traducción inglesa: el selector cambia el contenido disponible, pero aún hay secciones y opciones pendientes de traducir por completo. No anunciar una versión inglesa integral hasta terminarla.

## Pruebas locales

- En `front`, ejecutar `npm run lint` y `npm test`. Para probar también el formulario oculto con respuestas simuladas, ejecutar `TEST_FORM_ENABLED=1 npm test`; no envía correos reales. Playwright requiere tener Chromium instalado (`npx playwright install chromium`).
- En `back`, ejecutar `npm run build` y `node dist/test-security.js`. Las pruebas SMTP del controlador emplean respuestas simuladas; falta una prueba real con la cuenta y el servidor finales.
