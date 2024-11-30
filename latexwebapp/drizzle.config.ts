import { defineConfig } from "drizzle-kit"
import "dotenv/config"

export default defineConfig({
    dialect: "postgresql",
    schema: "src/app/db/schema.ts",
    out: "./latexMigrations",
    dbCredentials: {
        url: "postgresql://neondb_owner:OYAT5d7JCbVa@ep-still-rice-a60jkwko.us-west-2.aws.neon.tech/neondb?sslmode=require",
    }
});