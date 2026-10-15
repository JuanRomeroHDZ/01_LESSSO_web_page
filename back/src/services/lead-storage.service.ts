import { Pool } from "pg";
import { env } from "../config/env";
import { LeadInput } from "../validators/lead.validator";

// Pool de PostgreSQL dedicado para el servicio de almacenamiento
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  console.error("[STORAGE_POOL_ERROR] Error en el pool de PostgreSQL:", err.message);
});

export interface StoredLead {
  id: string;
  entityType: "PERSON" | "COMPANY";
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  projectDetails: string;
  companyName?: string | null;
  jobTitle?: string | null;
  companySize?: string | null;
  urgencyLevel?: string | null;
  estimatedBudget?: string | null;
  termsAccepted: boolean;
  syncStatus: "PENDING" | "SYNCED" | "FAILED";
  twentyPersonId?: string | null;
  twentyCompanyId?: string | null;
  ipAddress?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Almacen volatil temporal si la base de datos esta en proceso de inicio
const inMemoryFallbackQueue: StoredLead[] = [];

/**
 * Guarda un nuevo lead con estado inicial PENDING en PostgreSQL
 */
export async function saveLead(
  input: LeadInput,
  ipAddress?: string
): Promise<StoredLead> {
  const fullPhone = `${input.countryCode} ${input.phoneNumber}`.trim();

  try {
    const query = `
      INSERT INTO leads (
        entity_type,
        full_name,
        email,
        phone,
        area_of_interest,
        project_details,
        company_name,
        job_title,
        company_size,
        urgency_level,
        estimated_budget,
        terms_accepted,
        sync_status,
        ip_address
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'PENDING', $13)
      RETURNING *;
    `;

    const values = [
      input.entityType,
      input.fullName,
      input.email,
      fullPhone,
      input.areaOfInterest,
      input.projectDetails,
      input.companyName || null,
      input.jobTitle || null,
      input.companySize || null,
      input.urgencyLevel || null,
      input.estimatedBudget || null,
      input.termsAccepted,
      ipAddress || null,
    ];

    const result = await pool.query(query, values);
    const row = result.rows[0];

    const savedLead: StoredLead = {
      id: row.id,
      entityType: row.entity_type,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      areaOfInterest: row.area_of_interest,
      projectDetails: row.project_details,
      companyName: row.company_name,
      jobTitle: row.job_title,
      companySize: row.company_size,
      urgencyLevel: row.urgency_level,
      estimatedBudget: row.estimated_budget,
      termsAccepted: row.terms_accepted,
      syncStatus: row.sync_status,
      twentyPersonId: row.twenty_person_id,
      twentyCompanyId: row.twenty_company_id,
      ipAddress: row.ip_address,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };

    // Registrar evento de auditoria
    await recordAuditLog(savedLead.id, "LEAD_RECEIVED", {
      entityType: savedLead.entityType,
      email: savedLead.email,
    });

    return savedLead;
  } catch (error) {
    console.error("[STORAGE_WARN] Base de datos no disponible, activando cola en memoria:", (error as Error).message);

    // Fallback en memoria resiliente para no perder ningun lead
    const fallbackLead: StoredLead = {
      id: "mem_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      entityType: input.entityType,
      fullName: input.fullName,
      email: input.email,
      phone: fullPhone,
      areaOfInterest: input.areaOfInterest,
      projectDetails: input.projectDetails,
      companyName: input.companyName || null,
      jobTitle: input.jobTitle || null,
      companySize: input.companySize || null,
      urgencyLevel: input.urgencyLevel || null,
      estimatedBudget: input.estimatedBudget || null,
      termsAccepted: input.termsAccepted,
      syncStatus: "PENDING",
      ipAddress: ipAddress || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    inMemoryFallbackQueue.push(fallbackLead);
    return fallbackLead;
  }
}

/**
 * Actualiza el estado de sincronizacion tras interactuar con Twenty CRM
 */
export async function updateLeadSyncStatus(
  leadId: string,
  status: "SYNCED" | "FAILED",
  twentyPersonId?: string,
  twentyCompanyId?: string
): Promise<void> {
  if (leadId.startsWith("mem_")) {
    const memLead = inMemoryFallbackQueue.find((l) => l.id === leadId);
    if (memLead) {
      memLead.syncStatus = status;
      memLead.twentyPersonId = twentyPersonId || null;
      memLead.twentyCompanyId = twentyCompanyId || null;
    }
    return;
  }

  try {
    const query = `
      UPDATE leads
      SET sync_status = $1,
          twenty_person_id = COALESCE($2, twenty_person_id),
          twenty_company_id = COALESCE($3, twenty_company_id),
          updated_at = NOW()
      WHERE id = $4;
    `;

    await pool.query(query, [status, twentyPersonId || null, twentyCompanyId || null, leadId]);

    await recordAuditLog(leadId, status === "SYNCED" ? "CRM_SYNC_SUCCESS" : "CRM_SYNC_FAILED", {
      twentyPersonId,
      twentyCompanyId,
    });
  } catch (error) {
    console.error("[UPDATE_SYNC_ERROR] Error al actualizar estado de sincronizacion:", (error as Error).message);
  }
}

/**
 * Registra un evento en la tabla de auditoria
 */
export async function recordAuditLog(
  leadId: string | null,
  action: string,
  details: Record<string, unknown>
): Promise<void> {
  if (!leadId || leadId.startsWith("mem_")) return;

  try {
    const query = `
      INSERT INTO audit_logs (action, lead_id, details)
      VALUES ($1, $2, $3);
    `;
    await pool.query(query, [action, leadId, JSON.stringify(details)]);
  } catch (err) {
    console.warn("[AUDIT_LOG_WARN] No se pudo guardar registro de auditoria:", (err as Error).message);
  }
}

/**
 * Verifica la salud de la conexion a PostgreSQL
 */
export async function isStorageHealthy(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1;");
    client.release();
    return true;
  } catch {
    return false;
  }
}
