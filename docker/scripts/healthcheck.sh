#!/bin/sh
# Script generico de verificacion de salud para contenedores
set -e

TARGET_URL=${1:-"http://localhost:4000/api/v1/health"}

if wget -q --spider "$TARGET_URL"; then
  echo "[HEALTHCHECK] Servicio operativo en $TARGET_URL"
  exit 0
else
  echo "[HEALTHCHECK] Servicio no responde en $TARGET_URL"
  exit 1
fi
