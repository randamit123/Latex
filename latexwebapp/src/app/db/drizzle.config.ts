import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "src/app/db/schema.ts",
    out: "src/app/db/latexMigrations",
    dbCredentials: {
        url: process.env.NEON_URL!,
    }
})