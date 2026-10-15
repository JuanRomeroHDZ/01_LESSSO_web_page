#!/bin/sh
# Script de inicializacion para PostgreSQL 16
set -e

echo "[INIT] Verificando extensiones necesarias para LESSSO..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOSQL

echo "[INIT] Extensiones uuid-ossp y pgcrypto configuradas exitosamente."
