/* import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

config ({ path: ".env.local" })

const postgresql = neon(process.env.NEON_URL!)
const latexdb = drizzle(postgresql, { logger: true })

const result = await latexdb.execute('select 1')

export { latexdb } */