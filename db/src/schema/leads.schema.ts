import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enumeraciones de base de datos
export const entityTypeEnum = pgEnum("entity_type", ["PERSON", "COMPANY"]);
export const syncStatusEnum = pgEnum("sync_status", [
  "PENDING",
  "SYNCED",
  "FAILED",
]);

/**
 * Tabla de prospectos (leads)
 * Almacena cada intento de contacto antes de sincronizar con Twenty CRM
 */
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  entityType: entityTypeEnum("entity_type").notNull().default("PERSON"),
  fullName: varchar("full_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  areaOfInterest: varchar("area_of_interest", { length: 50 }).notNull(),
  projectDetails: text("project_details").notNull(),

  // Campos adicionales desplegados para entidad 'COMPANY'
  companyName: varchar("company_name", { length: 120 }),
  jobTitle: varchar("job_title", { length: 80 }),
  companySize: varchar("company_size", { length: 40 }),
  urgencyLevel: varchar("urgency_level", { length: 40 }),
  estimatedBudget: varchar("estimated_budget", { length: 50 }),

  // Consentimiento y trazabilidad
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  syncStatus: syncStatusEnum("sync_status").notNull().default("PENDING"),
  twentyPersonId: varchar("twenty_person_id", { length: 100 }),
  twentyCompanyId: varchar("twenty_company_id", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
