-- Migracion inicial para la base de datos de LESSSO
-- Ejecuta la creacion de tipos enumerados y tablas leads y audit_logs

DO $$ BEGIN
    CREATE TYPE "entity_type" AS ENUM('PERSON', 'COMPANY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "sync_status" AS ENUM('PENDING', 'SYNCED', 'FAILED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "leads" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "entity_type" "entity_type" DEFAULT 'PERSON' NOT NULL,
    "full_name" varchar(80) NOT NULL,
    "email" varchar(255) NOT NULL,
    "phone" varchar(20) NOT NULL,
    "area_of_interest" varchar(50) NOT NULL,
    "project_details" text NOT NULL,
    "company_name" varchar(120),
    "job_title" varchar(80),
    "company_size" varchar(40),
    "urgency_level" varchar(40),
    "estimated_budget" varchar(50),
    "terms_accepted" boolean DEFAULT false NOT NULL,
    "sync_status" "sync_status" DEFAULT 'PENDING' NOT NULL,
    "twenty_person_id" varchar(100),
    "twenty_company_id" varchar(100),
    "ip_address" varchar(45),
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "audit_logs" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "action" varchar(50) NOT NULL,
    "lead_id" uuid REFERENCES "leads"("id") ON DELETE SET NULL,
    "details" jsonb DEFAULT '{}'::jsonb NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Indices para busquedas frecuentes y control de duplicados
CREATE INDEX IF NOT EXISTS "idx_leads_email" ON "leads" ("email");
CREATE INDEX IF NOT EXISTS "idx_leads_sync_status" ON "leads" ("sync_status");
CREATE INDEX IF NOT EXISTS "idx_leads_created_at" ON "leads" ("created_at");
