import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { leads } from "./leads.schema";

/**
 * Tabla de bitacora de auditoria (audit_logs)
 * Registra eventos de recepcion, errores y sincronizacion con Twenty CRM
 */
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  action: varchar("action", { length: 50 }).notNull(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  details: jsonb("details").default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
