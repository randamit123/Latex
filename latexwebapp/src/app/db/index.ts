import { drizzle,  } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
// import fetch from 'node-fetch';

// if (!globalThis.fetch) {
//     globalThis.fetch = fetch as unknown as typeof globalThis.fetch;
// }

config();
const sql = neon<boolean, boolean>(process.env.NEXT_PUBLIC_DATABASE_URL!); 
export const latexdb = drizzle(sql)