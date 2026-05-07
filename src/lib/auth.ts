import { betterAuth, APIError } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq, or } from "drizzle-orm"; // 🚨 Import 'or' for multiple condition checks

import { db } from "../db/client";
import * as schema from "../db/schema/auth.schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // 🚨 CRITICAL: Tell Better Auth about your custom columns so session.user.role works!
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
      },
      isActive: {
        type: "boolean",
        required: true,
        defaultValue: true,
      },
      accountId: {
        type: "string",
        required: true,
        defaultValue: "UNKNOWN",
      },
      enrollmentNumber: {
        type: "string",
        required: true,
        defaultValue: "UNKNOWN",
      }
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Normalize the incoming email for production-safe database matching
          const incomingEmail = user.email.toLowerCase();

          /**
           * PRODUCTION-FRIENDLY CHECK:
           * We only ask the DB for the 'id' and 'accountId' to keep the payload tiny.
           * We check if the email exists as either a primary or secondary parent email.
           */
          const linkedStudent = await db
            .select({
              id: schema.user.id,
              accountId: schema.user.accountId,
            })
            .from(schema.user)
            .where(
              or(
                eq(schema.user.primaryParentEmail, incomingEmail),
                eq(schema.user.secondaryParentEmail, incomingEmail)
              )
            )
            .limit(1); // Fast bailout

          // 1. If no student has this parent's email attached, block the login.
          if (linkedStudent.length === 0) {
            console.log("🚨 BLOCKED OAUTH EMAIL:", incomingEmail);
            throw new APIError("UNAUTHORIZED", {
              message: "Your email is not registered. Please contact the administrator.",
            });
          }

          // 2. If we reach here, the parent IS authorized! 
          // We mutate the user object before Better Auth saves it to the database.
          
          // Force the role to parent so they get routed to the parent dashboard
          user.role = "parent";
          
          // Inherit the school's account ID from their child
          user.accountId = linkedStudent[0].accountId; 
          
          // Generate a unique pseudo-enrollment number for the parent to satisfy DB constraints
          const uniqueString = Date.now().toString().slice(-6);
          const randomNum = Math.floor(Math.random() * 1000);
          user.enrollmentNumber = `PRNT-${uniqueString}-${randomNum}`;

          // Return the modified data to proceed with account creation!
          return { data: user };
        },
      },
    },

    session: {
      create: {
        before: async (session) => {
          // Production optimization: Only select the isActive flag
          const existingUser = await db
            .select({ isActive: schema.user.isActive })
            .from(schema.user)
            .where(eq(schema.user.id, session.userId))
            .limit(1);

          if (existingUser.length > 0 && existingUser[0].isActive === false) {
            throw new APIError("UNAUTHORIZED", {
              message: "Your account has been deactivated. Please contact administration.",
            });
          }

          return { data: session };
        },
      },
    },
  },
});