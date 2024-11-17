import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "src/app/db/schema.ts",
    out: "./latexMigrations",
    dbCredentials: {
        url: process.env.NEON_URL!,
    }
})