import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import { latexdb } from "../db"

export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(latexdb),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  }
})