import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import type { AdapterAccountType } from "next-auth/adapters"
import crypto from "crypto"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const referrals = pgTable("referrals", {
    descriptor: integer("descriptor").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    referralEmail: text("referral_email").unique(),
    referralCode: text("referral_code").$defaultFn(() => crypto.randomUUID()),
    referralStatus: boolean("referral_status"),
})

export const images = pgTable("images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => self.crypto.randomUUID()), 
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  latexId: text("latex_id")
    .notNull()
    .references(() => latex.id),
  imageName: text("image_name").notNull(),
  fileType: text("file_type"),
  fileSize: integer("file_size"),
})

export const latex = pgTable("latex", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => self.crypto.randomUUID()), 
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  latexCode: text("latex_code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
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

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
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
}));

export type selectUser = typeof users.$inferSelect
export type selectAccount = typeof accounts.$inferSelect
export type selectSession = typeof sessions.$inferSelect
export type selectReferral = typeof referrals.$inferSelect
export type selectLatex = typeof latex.$inferSelect
export type selectImage = typeof images.$inferSelect