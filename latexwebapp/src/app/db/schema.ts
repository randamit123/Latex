import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username").unique().notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password").notNull()
})

export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    image_url: varchar("image_url").notNull(),
    file_type: varchar("file_type"),
    file_size: integer("file_size")
})

export const latex = pgTable("latex", {
    id: serial("id").primaryKey(),
    image_id: integer("image_id").notNull().references(() => images.id),
    latex_code: text("latex_code").notNull(),
})