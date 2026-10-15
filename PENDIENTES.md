# LISTA DE CONTROL TECNICA Y TAREAS PENDIENTES - LESSSO

Este documento enumera las tareas planificadas, configuraciones posteriores y lineas de evolucion arquitectonica para el ecosistema LESSSO. Todas las entradas estan ordenadas por prioridad de despliegue.

---

## 1. INTEGRACION Y CONECTIVIDAD TWENTY CRM

- [ ] Desplegar la instancia de Twenty CRM utilizando `compose.crm.yaml` o asociar la URL de la organizacion en nube.
- [ ] Generar la API Key o Bearer Token desde el panel de ajustes de Twenty CRM (`Settings -> Developers -> API Keys`).
- [ ] Colocar el valor de la clave en la variable de entorno `TWENTY_API_KEY` dentro del archivo `.env` del servidor en produccion.
- [ ] Ejecutar prueba de sincronizacion en caliente enviando un prospecto tipo Persona y verificar la creacion en la seccion People de Twenty CRM.
- [ ] Ejecutar prueba enviando un prospecto tipo Empresa y verificar la asociacion bidireccional entre Companies y People en Twenty CRM.
- [ ] Implementar un cronjob en el backend que revise periodicamente los registros con `sync_status = 'PENDING'` o `'FAILED'` y reintente el envio automatico cuando el CRM haya estado fuera de linea.

---

## 2. INFRAESTRUCTURA, DOMINIOS Y CERTIFICADOS SSL

- [ ] Apuntar los registros DNS de tipo A para `lessso.com`, `www.lessso.com` y `api.lessso.com` hacia la direccion IP publica del servidor VPS.
- [ ] Ingresar al panel de Nginx Proxy Manager (`http://[IP-DEL-VPS]:81`) con las credenciales maestras iniciales (`admin@example.com` / `changeme`).
- [ ] Configurar el Proxy Host para `lessso.com` apuntando internamente hacia `http://lessso-front:3000`.
- [ ] Configurar el Proxy Host para `api.lessso.com` apuntando internamente hacia `http://lessso-back:4000`.
- [ ] Solicitar certificados SSL automaticos Let's Encrypt con renovacion habilitada y forzar redireccion HTTP a HTTPS en todos los hosts.
- [ ] Activar soporte para HTTP/2 y proteccion de Websockets en Nginx Proxy Manager.

---

## 3. PAGINAS DEDICADAS DE DIVISIONES (FASE 1.5)

Actualmente los enlaces de las divisiones en el Header conducen a la pantalla 404 personalizada con un destello cromático en el cursor. En la siguiente iteracion se crearan las paginas completas:

- [ ] Crear la ruta `/cybersecurity` con el tema Rojo Profundo (`#240B0B`), presentando los servicios de auditoria de vulnerabilidades, pruebas de penetracion (Pentesting), aseguramiento de infraestructura y cumplimiento normativo.
- [ ] Crear la ruta `/software` con el tema Jade Oscuro (`#081416`), detallando el desarrollo de plataformas web a medida, APIs de alta concurrencia, modernizacion de codigo legado y arquitectura cloud-native.
- [ ] Crear la ruta `/infrastructure` con el tema Azul Oscuro (`#0C1024`), abordando la virtualizacion, orquestacion con Kubernetes, pipelines de CI/CD, observabilidad con Prometheus/Grafana y resiliencia de centros de datos.
- [ ] Actualizar el componente `src/components/organisms/SmartHeader.tsx` para cambiar los enlaces de `#` y `/404` hacia sus rutas definitivas una vez creadas.

---

## 4. LOCALIZACION E INTERNACIONALIZACION (ES / EN)

- [ ] Completar la traduccion al ingles de todas las descripciones detalladas de los pilares en `src/config/site-content.ts`.
- [ ] Anadir las etiquetas en ingles para las opciones desplegables del formulario de contacto (areas de interes, niveles de urgencia y rangos presupuestarios).
- [ ] Conectar el estado del atomo `LangSwitcher.tsx` con el contexto global o persistencia en cookie para recordar la seleccion del visitante durante su navegacion.

---

## 5. DOCUMENTOS LEGALES Y DATOS DEFINITIVOS DE CONTACTO

- [ ] Redactar el texto oficial del Aviso de Privacidad de conformidad con la legislacion aplicable (ej. LFPDPPP en Mexico o RGPD si opera en la UE).
- [ ] Crear la pagina estatica `/privacidad` y enlazarla en el pie de pagina y en la casilla de aceptacion del formulario.
- [ ] Redactar los Terminos y Condiciones de Servicio y vincularlos a la ruta estatica `/terminos`.
- [ ] Reemplazar la direccion fisica simulada en `src/config/site-content.ts` por la direccion fiscal definitiva de LESSSO.
- [ ] Sustituir el numero telefonico simulado en `src/config/site-content.ts` y en la variable `WHATSAPP_PHONE_NUMBER` por la linea corporativa oficial con WhatsApp Business activo.

---

## 6. EVOLUCION ARQUITECTONICA - FASE 2 (PORTAL DE CLIENTES)

- [ ] Incorporar el boton de acceso a clientes (`Login / Portal`) en la barra de navegacion superior sin alterar el equilibrio minimalista.
- [ ] Implementar autenticacion basada en tokens JWT con refresco seguro en cookies `HttpOnly` y roles (`admin`, `analyst`, `client`).
- [ ] Disenar el panel de control para clientes donde puedan consultar el estado de sus sistemas, alertas de ciberseguridad en tiempo real y metricas de rendimiento de sus plataformas.
- [ ] Conectar el portal con un motor de analisis automatizado de infraestructura para emitir recomendaciones preventivas de optimizacion y mitigacion de riesgos.
