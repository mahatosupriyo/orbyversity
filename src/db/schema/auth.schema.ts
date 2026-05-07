import {
  pgTable,
  text,
  boolean,
  timestamp,
  varchar,
  integer,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "superadmin",
  "principal",
  "registrar",
  "teacher",
  "staff",
  "student",
  "parent",
]);

// ─── User (Student Centric for now) ──────────────────────────────────────────
export const user = pgTable(
  "user",
  {
    // ── Better Auth Required Fields ──
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),

    // ── Pre-seeded Access Control & Role ──
    isActive: boolean("is_active").notNull().default(true),
    role: userRoleEnum("role").notNull().default("student"), // <-- Assign the Enum

    // ── Student Required Fields ──
    enrollmentNumber: text("enrollment_number").notNull().unique(),
    accountId: text("account_id").notNull(),

    // ── Student Optional Fields ──
    fathersName: text("fathers_name"),
    mothersName: text("mothers_name"),
    parentEmail: text("parent_email"),
    parentPhone: varchar("parent_phone", { length: 20 }),
    address: text("address"),
    aadharNumber: varchar("aadhar_number", { length: 20 }).unique(),
    dateOfBirth: timestamp("date_of_birth"),
  },
  (t) => ({
    emailIdx: uniqueIndex("user_email_idx").on(t.email),
    enrollmentIdx: uniqueIndex("user_enrollment_idx").on(t.enrollmentNumber),
    accountIdx: index("user_account_idx").on(t.accountId),
    roleIdx: index("user_role_idx").on(t.role), // <-- Index for fast querying by role
  })
);
// ─── Better Auth Supporting Tables (Required for Adapter) ────────────────────
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  // --- Replace expiresAt with these two lines ---
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  // ----------------------------------------------
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
