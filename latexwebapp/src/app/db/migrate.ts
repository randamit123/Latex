import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { migrate } from "drizzle-orm/neon-http/migrator"
import { config } from "dotenv"

config({ path: ".env.local" })

const postgresql = neon(process.env.NEON_URL!)
const latexdb = drizzle(postgresql, { logger: true })

const main = async () => {
    try {
        await migrate(latexdb, { migrationsFolder: "src/app/db/latexMigrations" })
        console.log("Migration completed")
    } catch (error) {
        console.error("Error during migration:", error)
        process.exit(1)
    }
}

main()