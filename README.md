# PLATAFORMA CORPORATIVA LESSSO

Plataforma web corporativa de alta precision tecnica y sistema de captacion de prospectos de clientes conectado a Twenty CRM con persistencia tolerante a fallos en PostgreSQL.

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
| **Netlify CLI** | 17.x | Ultima estable | Despliegues continuos opcionales de frontend |

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

El proyecto incluye una plantilla exhaustivamente documentada. Copie el archivo para inicializar su entorno:

```bash
cp .env.example .env
```

Abra el archivo `.env` en su editor de preferencia y ajuste los siguientes parametros clave:

* `DATABASE_URL`: Cadena de conexion a la base de datos PostgreSQL.
* `TWENTY_API_URL` y `TWENTY_API_KEY`: Si ya cuenta con Twenty CRM activo, ingrese estos valores. Si aun no los tiene, dejelos en blanco; el sistema resguardara los prospectos con estado `PENDING` de forma resiliente.
* `OFFICIAL_CONTACT_EMAIL`: Correo corporativo al cual se dirigen las consultas (`contacto@lessso.com`).
* `WHATSAPP_PHONE_NUMBER`: Linea oficial de WhatsApp con codigo de pais (ej. `5215500000000`).

---

## 4. COMANDOS PARA LEVANTAR EL ENTORNO

### 4.1. Modo Produccion con Contenedores (Docker Compose V2)

Para compilar las imagenes y levantar toda la pila (Proxy, Frontend, Backend, PostgreSQL y Redis):

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

### 4.2. Despliegue Opcional de Twenty CRM Autoalojado

Para inicializar la instancia de Twenty CRM vinculada al ecosistema:

```bash
docker compose -f compose.crm.yaml up -d
```
Acceso a Twenty CRM: `http://localhost:3001`

### 4.3. Modo Desarrollo Local (Sin Docker para Front y Back)

Si desea programar con recarga rapida (Hot Module Replacement):

```bash
# 1. Levantar unicamente la base de datos y redis con docker
docker compose up -d lessso-db lessso-redis

# 2. Instalar dependencias en las capas
cd db && npm install && cd ..
cd back && npm install && npm run dev &
cd front && npm install && npm run dev
```

---

## 5. GUIA DE DESPLIEGUE EN NETLIFY (FRONTEND)

El repositorio cuenta con `netlify.toml` preconfigurado con el plugin de Next.js y politicas estrictas de cabeceras de seguridad.

### Pasos para Conectar y Desplegar:

1. **Crear Repositorio en GitHub / GitLab:**
   ```bash
   git add .
   git commit -m "feat: initial commit of lessso ecosystem"
   git push origin main
   ```
2. **Vincular en el Panel de Netlify:**
   * Inicie sesion en [app.netlify.com](https://app.netlify.com).
   * Seleccione **Add new site** -> **Import an existing project**.
   * Conecte su cuenta de Git y seleccione el repositorio de LESSSO.
3. **Variables de Entorno en Netlify:**
   * Ingrese a **Site configuration** -> **Environment variables**.
   * Declare la variable `NEXT_PUBLIC_BACKEND_URL` con la URL publica de su backend (ejemplo: `https://api.lessso.com`).
4. **Verificacion de Build:**
   * Base directory: `front`
   * Build command: `npm run build`
   * Publish directory: `front/.next`
   * Los valores anteriores seran detectados automaticamente por el archivo `netlify.toml`.

---

## 6. GUIA RAPIDA: QUE ARCHIVOS EDITAR PARA PERSONALIZAR LA MARCA

Para modificar cualquier elemento corporativo sin alterar la arquitectura interna, consulte la siguiente tabla de ubicaciones:

| Elemento a Modificar | Archivo a Editar | Descripcion |
| :--- | :--- | :--- |
| **Textos del Sitio (ES / EN)** | `front/src/config/site-content.ts` | Titulos, subtitulos, redaccion de pilares de confianza y placeholders. |
| **Correos y Telefonos** | `front/src/config/site-content.ts` | Correo de contacto oficial, telefono corporativo y direccion de oficinas. |
| **Colores y Paleta Visual** | `front/src/config/theme-palette.ts` | Codigos hexadecimales del negro, blanco hueso, dorado y colores divisionales. |
| **Logotipos de la Marca** | `front/public/assets/logos/` | Archivos SVG (`lessso-white.svg`, `lessso-black.svg`, `lessso-gold.svg`). |
| **Esquema de Validacion de Leads** | `back/src/validators/lead.validator.ts` | Reglas de longitud, campos adicionales para Persona o Empresa. |
| **Esquema de Base de Datos** | `db/src/schema/leads.schema.ts` | Columnas de la tabla de prospectos y registros de auditoria. |
| **Conector Twenty CRM** | `back/src/services/twenty-crm.service.ts` | Mapeo de campos hacia las entidades Companies y People de Twenty. |
