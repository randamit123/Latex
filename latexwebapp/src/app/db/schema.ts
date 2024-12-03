import { pgTable, uuid, serial, integer, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    image: text("image"),
    // password: varchar("password").notNull(),
    // created_at: timestamp("created_at").defaultNow(),
})

export const referrals = pgTable("referrals", {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    referralEmail: text("referral_email").unique().notNull(),
    referralCode: text("referral_code"),
})

export const accounts = pgTable("accounts", {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider"),
    accessToken: text("access_token"),
    expiresAt: integer("expired_at"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    tokenType: text("token_type"),
    scope: text("scope"), 
    sessionState: text("session_state"),
})

export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    // userEmail: varchar("user_email").notNull().references(() => users.email),
    latexId: integer("latex_id").notNull().references(() => latex.id),
    imageName: text("image_name").notNull(),
    fileType: text("file_type"),
    fileSize: integer("file_size"),
})

export const latex = pgTable("latex", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    // imageId: integer("image_id").notNull().references(() => images.id),
    latexCode: text("latex_code").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
    images: many(images),
    latex: many(latex),
}))

export const referralsRelations = relations(referrals, ({ one }) => ({
    user: one(users, {
        fields: [referrals.userId],
        references: [users.id],
    }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}))

export const latexRelations = relations(latex, ({ one, many }) => ({
    user: one(users, {
        fields: [latex.userId],
        references: [users.id],
    }),
    images: many(images),
}))

export const imagesRelations = relations(images, ({ one }) => ({
    user: one(users, {
        fields: [images.userId],
        references: [users.id],
    }),
    latex: one(latex, {
        fields: [images.latexId],
        references: [latex.id],
    }),
}))

export type selectUser = typeof users.$inferSelect
export type selctReferral = typeof referrals.$inferSelect
export type selectAccount = typeof accounts.$inferSelect
export type selectLatex = typeof latex.$inferSelect
export type selectImage = typeof images.$inferSelect