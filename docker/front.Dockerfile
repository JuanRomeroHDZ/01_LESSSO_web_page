# Multi-stage Dockerfile para el Frontend de LESSSO (Next.js App Router)
# Node.js 22 LTS sobre Alpine Linux

# ------------------------------------------------------------------------------
# Etapa 1: Dependencias
# ------------------------------------------------------------------------------
FROM node:22-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY front/package*.json ./
RUN npm ci

# ------------------------------------------------------------------------------
# Etapa 2: Compilacion de Next.js
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY front ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV OUTPUT_STANDALONE=1

# Argumento opcional de build para la URL de la API
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN npm run build

# ------------------------------------------------------------------------------
# Etapa 3: Entorno de Ejecucion de Produccion
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

RUN apk add --no-cache wget

# Copiar archivos publicos y la salida compilada de Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
