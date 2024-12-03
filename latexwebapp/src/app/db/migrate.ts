import { latexdb } from "./index"
import { migrate } from "drizzle-orm/neon-http/migrator"
import "dotenv/config"

const main = async () => {
    try {
        await migrate(latexdb, { migrationsFolder: "./latexMigrations" })
        console.log("Migration completed")
    } catch (error) {
        console.error("Error during migration:", error)
        process.exit(1)
    }
}

main()