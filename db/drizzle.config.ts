import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default {
  schema: "./src/schema/*",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://lessso_admin:lessso_secure_db_password_change_me@localhost:5432/lessso_production",
  },
} satisfies Config;
