// import { drizzle,  } from "drizzle-orm/neon-http"
// import { neon } from "@neondatabase/serverless"
// import { config } from "dotenv"
// import * as schema from "./schema";

// config({path: ".env.local"});

// const sql = neon(String(process.env.DATABASE_URL)!)

// const latexdb = drizzle(sql)
// export { latexdb };

// config();

// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not defined in the environment variables.");
// }

// const postgresql = neon(process.env.DATABASE_URL);
// const latexdb = drizzle(postgresql, { schema, logger: true });

// export { latexdb };
