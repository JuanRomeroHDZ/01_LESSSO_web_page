# Multi-stage Dockerfile para el servidor API Backend de LESSSO
# Node.js 22 LTS sobre Alpine Linux

# ------------------------------------------------------------------------------
# Etapa 1: Dependencias y Compilacion
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar herramientas requeridas para modulos nativos si fueran necesarios
RUN apk add --no-cache libc6-compat

# Copiar archivos de definicion de paquetes
COPY db/package*.json ./db/
COPY back/package*.json ./back/

# Instalar dependencias en ambas capas
WORKDIR /app/db
RUN npm ci

WORKDIR /app/back
RUN npm ci

# Copiar codigo fuente
WORKDIR /app
COPY db ./db
COPY back ./back

# Compilar TypeScript en /back
WORKDIR /app/back
RUN npm run build

# Podar dependencias de desarrollo para reducir tamano de imagen
RUN npm prune --production

# ------------------------------------------------------------------------------
# Etapa 2: Entorno de Ejecucion Liviano de Produccion
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Usuario sin privilegios para mitigar vulnerabilidades de contenedor
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 lessso

# Instalar utilidades para healthcheck (wget)
RUN apk add --no-cache wget

# Copiar artefactos compilados y dependencias optimizadas
COPY --from=builder /app/back/package*.json ./
COPY --from=builder /app/back/node_modules ./node_modules
COPY --from=builder /app/back/dist ./dist
COPY --from=builder /app/db ./db

USER lessso

EXPOSE 4000

CMD ["node", "dist/index.js"]
