import { latexdb } from "../db/index"
import { users, latex, images } from "../db/schema"

export type newUser = typeof users.$inferInsert
export type newLatex = typeof latex.$inferInsert
export type newImage = typeof images.$inferInsert

export async function createUser (arg: newUser) {
    await latexdb.insert(users).values(arg)
}

export async function createLatex (arg: newLatex) {
    await latexdb.insert(latex).values(arg)
}

export async function createImage (arg: newImage) {
    await latexdb.insert(images).values(arg)
}