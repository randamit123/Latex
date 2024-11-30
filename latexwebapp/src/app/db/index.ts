import { drizzle,  } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

// config({ path: ".env.local" });

// const sql = neon(String(process.env.DATABASE_URL)!)

// const latexdb = drizzle(sql)
// export { latexdb };

// config();

// console.log("DATABASE_URL:", process.env.NEON_URL);
// if (! process.env.NEON_URL!) {
    // throw new Error("DATABASE_URL is not defined in the environment variables.");
// }

const postgresql = neon("postgresql://neondb_owner:OYAT5d7JCbVa@ep-still-rice-a60jkwko.us-west-2.aws.neon.tech/neondb?sslmode=require");
const latexdb = drizzle(postgresql);

export { latexdb }
