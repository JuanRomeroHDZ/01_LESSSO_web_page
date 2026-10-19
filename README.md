# PLATAFORMA CORPORATIVA LESSSO

Plataforma web corporativa de alta precision tecnica con arquitectura atomica desacoplada (`/front` y `/back`), sistema de validacion perimetral anti-abuso (Anti-SQLi, Anti-XSS, Anti-DoS/DDoS), canal de comunicacion seguro y redireccion estructurada hacia WhatsApp.

---

## 1. REQUISITOS PREVIOS Y VERSIONES RECOMENDADAS

Para desplegar o desarrollar en el ecosistema LESSSO se requieren las siguientes herramientas instaladas en el sistema anfitrion:

| Componente | Version Minima | Version Recomendada | Funcion Principal |
| :--- | :--- | :--- | :--- |
| **Node.js** | 20.x LTS | 22.x LTS | Entorno de ejecucion para desarrollo local |
| **npm** | 10.x | 12.x o superior | Gestor de paquetes oficial |
| **Docker Engine** | 24.0.0 | 26.x o superior | Motor de ejecucion de contenedores aislados |
| **Docker Compose** | 2.20.0 | 2.26.x o superior | Orquestacion local multicontenedor (Compose V2) |
| **Git** | 2.34.0 | Ultima estable | Control de versiones del codigo |
| **Vercel CLI** | 33.x | Ultima estable | Despliegues continuos y pruebas en nube de Vercel |

---

## 2. INSTALACION DE DOCKER Y VERIFICACION DE DOCKER COMPOSE V2

### En Sistemas Linux (Ubuntu / Debian / Pop!_OS)

Ejecute los siguientes comandos en su terminal para instalar Docker Engine y Docker Compose V2 de forma oficial:

```bash
# 1. Actualizar indices de paquetes e instalar certificados
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# 2. Agregar la clave GPG oficial de Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 3. Configurar el repositorio de Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Instalar Docker Engine, CLI y plugin de Compose V2
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Anadir su usuario al grupo docker para omitir sudo
sudo usermod -aG docker $USER
```

*Nota: Cierre la sesion y vuelva a ingresar para aplicar la pertenencia al grupo docker.*

### Verificacion de Versiones Instaladas

Compruebe que la sintaxis moderna V2 este activa:

```bash
docker --version
docker compose version
```

Debera observar una salida similar a: `Docker Compose version v2.26.x`.

---

## 3. CONFIGURACION DE VARIABLES DE ENTORNO (.ENV)

El proyecto incluye una plantilla centralizada documentada. Copie el archivo para inicializar su entorno:

```bash
cp .env.example .env
```

Abra el archivo `.env` en su editor de preferencia y ajuste los parametros clave:

* `WHATSAPP_PHONE_NUMBER` y `NEXT_PUBLIC_WHATSAPP_NUMBER`: Numero oficial de WhatsApp. Formato exclusivamente numerico sin signos (+), guiones ni parentesis. En Mexico son 10 digitos base, 12 digitos incluyendo lada internacional (52) y un maximo absoluto de 15 digitos. El placeholder por defecto es `000000000000`.
* `NEXT_PUBLIC_BACKEND_URL`: URL publica de la API backend (ejemplo: `http://localhost:4000` o `https://api.lessso.com`).
* `REDIS_URL`: Cadena de conexion para Redis (utilizado para Rate Limiting y Cooldown de 90 segundos). Si no esta disponible, el backend conmuta automaticamente a memoria volatil.
* `COOLDOWN_SECONDS`: Tiempo de espera obligatorio entre envios (por defecto 90 segundos).
* `RATE_LIMIT_MAX_REQUESTS`: Limite de solicitudes por ventana (por defecto 10 solicitudes cada 15 minutos).
* `HONEYPOT_FIELD_NAME`: Nombre del campo trampa invisible (`website_verification_code`).

---

## 4. COMANDOS PARA LEVANTAR EL ENTORNO

### 4.1. Modo Produccion con Contenedores (Docker Compose V2)

Para compilar las imagenes y levantar toda la pila (Proxy, Frontend, Backend y Redis):

```bash
# Crear la red externa si no existe
docker network create lessso-network || true

# Compilar e iniciar todos los servicios en segundo plano
docker compose up -d --build

# Verificar el estado de salud de todos los contenedores
docker compose ps

# Inspeccionar logs en vivo de toda la infraestructura
docker compose logs -f

# Detener los servicios preservando los volumenes de datos
docker compose down
```

Una vez levantados:
* **Frontend:** accesible en `http://localhost:3000`
* **API Backend:** accesible en `http://localhost:4000/api/v1/health`
* **Panel Nginx Proxy Manager:** accesible en `http://localhost:81`

### 4.2. Modo Desarrollo Local (Sin Docker para Front y Back)

Si desea programar con recarga rapida (Hot Module Replacement):

```bash
# 1. Levantar unicamente Redis con docker
docker compose up -d lessso-redis

# 2. Instalar dependencias en backend y levantar servidor
cd back
npm install
npm run dev

# 3. En otra terminal, instalar dependencias en frontend y levantar Next.js
cd front
npm install
npm run dev
```

---

## 5. GUIA DE DESPLIEGUE EN VERCEL (FRONTEND)

El frontend de Next.js esta completamente preparado y optimizado para despliegue en Vercel con cabeceras HTTP de seguridad preconfiguradas en `front/vercel.json` y `vercel.json`.

### 5.1. Despliegue mediante Dashboard de GitHub

1. Realice push de sus cambios al repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: configure atomic architecture and vercel deployment"
   git push origin main
   ```
2. Ingrese a [vercel.com](https://vercel.com) e inicie sesion con su cuenta.
3. Haga clic en **Add New...** -> **Project**.
4. Importe el repositorio de GitHub de LESSSO.
5. Configure los parametros del proyecto:
   * **Framework Preset:** `Next.js`
   * **Root Directory:** `front` (haga clic en Edit y seleccione la carpeta `front`).
   * **Build Command:** `next build` (o dejar por defecto).
   * **Output Directory:** `.next` (o dejar por defecto).
6. Agregue las variables de entorno en la seccion **Environment Variables**:
   * `NEXT_PUBLIC_BACKEND_URL`: URL publica de su backend (ejemplo: `https://api.lessso.com` o URL de produccion).
   * `NEXT_PUBLIC_WHATSAPP_NUMBER`: Numero de WhatsApp corporativo con lada (ejemplo: `5215500000000`).
7. Haga clic en **Deploy**. Vercel compilara e implementara el sitio en la red de borde global.

### 5.2. Despliegue mediante Vercel CLI

1. Instale la CLI oficial de Vercel de manera global o ejecutela via npx:
   ```bash
   npm i -g vercel
   ```
2. Inicie sesion en su cuenta:
   ```bash
   vercel login
   ```
3. Despliegue desde la carpeta `/front`:
   ```bash
   cd front
   vercel
   ```
4. Para desplegar directamente a produccion:
   ```bash
   vercel --prod
   ```

### 5.3. Cabeceras HTTP de Seguridad en Vercel

Tanto `front/vercel.json` como la raiz incorporan las siguientes cabeceras estrictas:
* `X-Frame-Options: DENY` (prevencion de clickjacking).
* `X-Content-Type-Options: nosniff` (mitigacion de MIME confusion).
* `Referrer-Policy: strict-origin-when-cross-origin` (privacidad de cabeceras de origen).
* `Permissions-Policy: camera=(), microphone=(), geolocation=()` (restriccion de APIs sensibles).
* `X-XSS-Protection: 1; mode=block` (filtro defensivo para navegadores legados).

---

## 6. BLINDAJE DE SEGURIDAD Y REGLAS DE VALIDACION PERIMETRAL

La plataforma implementa defensas exhaustivas en frontend y backend:

### 6.1. Proteccion contra SQL Injection (SQLi)
* Bloqueo sistematico de secuencias de escape: `--`, `;`, `/*`, `*/`.
* Prohibicion de comillas simples y dobles en campos de control (`fullName`, `companyName`, `jobTitle`).
* Bloqueo de palabras reservadas e inyecciones booleanas/tautologicas: `UNION SELECT`, `DROP TABLE`, `INSERT INTO`, `DELETE FROM`, `UPDATE ... SET`, `OR 1=1`, `AND 1=1`, `EXEC(`, `SLEEP(`, `BENCHMARK(`, `WAITFOR DELAY`, `INFORMATION_SCHEMA`.

### 6.2. Proteccion contra Cross-Site Scripting (XSS) y Command Injection
* Bloqueo y sanitizacion de vectores de scripts: `<script>`, `<iframe>`, `javascript:`, `onerror=`, `onload=`, `onclick=`, `eval()`, etiquetas HTML arbitrarias.
* Neutralizacion de caracteres nulos (`\0`) y operadores de shell (`&&`, `||`, `` ` ``, `$()`).

### 6.3. Mitigacion de DoS y DDoS
* **Límite de Payload en Backend:** `bodyLimit` de 10kb en Fastify para impedir ataques de saturacion de memoria por envio de cargas excesivas.
* **Limites Fisicos y de Esquema:**
  * Nombre Completo: Minimo 3, Maximo 80 caracteres.
  * Telefono: Minimo 10, Maximo 15 digitos estrictamente numericos. Placeholder visual `0000000000`.
  * Correo Electronico: Maximo 100 caracteres con formato RFC valido.
  * Empresa / Rol: Maximo 100 caracteres.
  * Detalles del Proyecto: Minimo 20, Maximo 500 caracteres.
* **Control Anti-Abuso:**
  * Rate Limiting por IP (10 peticiones / 15 min).
  * Cooldown obligatorio de 90 segundos entre envios por IP y correo (`429 Too Many Requests`).
  * Trampa Honeypot (`website_verification_code`) con rechazo silencioso (HTTP 200) ante robots.

---

## 7. GUIA RAPIDA: QUE ARCHIVOS EDITAR PARA PERSONALIZAR LA MARCA

Para modificar cualquier elemento corporativo sin alterar la arquitectura interna, consulte la siguiente tabla de ubicaciones:

| Elemento a Modificar | Archivo a Editar | Descripcion |
| :--- | :--- | :--- |
| **Textos del Sitio (ES / EN)** | `front/src/config/site-content.ts` | Titulos, subtitulos, redaccion de pilares de confianza y placeholders. |
| **Correos y Telefonos** | `front/src/config/site-content.ts` | Correo de contacto oficial, telefono corporativo y direccion de oficinas. |
| **Colores y Paleta Visual** | `front/src/config/theme-palette.ts` | Codigos hexadecimales del negro, blanco hueso, dorado y colores divisionales. |
| **Logotipos de la Marca** | `front/public/assets/logos/` | Archivos SVG (`lessso-white.svg`, `lessso-black.svg`, `lessso-gold.svg`). |
| **Esquema de Validacion de Leads** | `back/src/validators/lead.validator.ts` | Reglas de longitud, filtros de seguridad para Persona o Empresa. |
| **Generador de Mensaje WhatsApp** | `front/src/hooks/useDynamicWhatsApp.ts` | Plantillas de mensaje estructurado y dinamico de WhatsApp. |
