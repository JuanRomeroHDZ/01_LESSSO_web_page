import { Pool, PoolConfig } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../schema";

// Configuracion de conexion resiliente con reconexion automatica
const poolConfig: PoolConfig = {
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://lessso_admin:lessso_secure_db_password_change_me@localhost:5432/lessso_production",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

export const pool = new Pool(poolConfig);

// Monitoreo de eventos del pool para resiliencia operativa
pool.on("error", (err) => {
  // Registro de error a nivel de sistema sin interrumpir el proceso principal
  console.error("[DB_POOL_ERROR] Error inesperado en el cliente del pool:", err.message);
});

// Instancia de base de datos Drizzle ORM
export const db = drizzle(pool, { schema });

/**
 * Funcion para verificar la conectividad activa con PostgreSQL
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch (error) {
    console.warn("[DB_HEALTH] No se pudo conectar con la base de datos PostgreSQL.");
    return false;
  }
}
