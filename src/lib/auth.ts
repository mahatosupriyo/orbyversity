import { betterAuth, APIError } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";

import { db } from "../db/client";
import * as schema from "../db/schema/auth.schema";

/**
 * Main Better Auth configuration
 *
 * This handles:
 * - Database connection
 * - Email/password authentication
 * - Google OAuth login
 * - Custom authorization rules
 */
export const auth = betterAuth({
  /**
   * Connect Better Auth with Drizzle ORM
   * using PostgreSQL as the database provider.
   */
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  /**
   * Enable traditional email/password authentication.
   */
  emailAndPassword: {
    enabled: true,
  },

  /**
   * Configure social login providers.
   *
   * Here we are enabling Google OAuth.
   */
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  /**
   * Database hooks allow interception of auth events
   * before data is written into the database.
   */
  databaseHooks: {
    /**
     * USER HOOKS
     * ---------------------------------------------------
     * Runs during user creation/signup.
     */
    user: {
      create: {
        /**
         * Runs BEFORE a new user is created.
         *
         * Current behavior:
         * - Completely blocks all new registrations.
         * - Useful for invite-only systems or admin-created users.
         *
         * Throwing APIError stops the signup flow instantly.
         */
        before: async (user) => {
          // Abort signup process

          
          // Log the exact email Better Auth is receiving
          console.log("🚨 BLOCKED OAUTH EMAIL:", user.email);

          throw new APIError("UNAUTHORIZED", {
            message:
              "Your email is not registered. Please contact the administrator.",
          });
        },
      },
    },

    /**
     * SESSION HOOKS
     * ---------------------------------------------------
     * Runs during login/session creation.
     */
    session: {
      create: {
        /**
         * Runs BEFORE a session is created.
         *
         * Purpose:
         * - Prevent deactivated users from logging in.
         */
        before: async (session) => {
          /**
           * Find the user associated with the session.
           *
           * session.userId -> ID of the user attempting login
           */
          const existingUser = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.id, session.userId))
            .limit(1);

          /**
           * If user exists AND is marked inactive,
           * block session creation.
           */
          if (existingUser.length > 0 && existingUser[0].isActive === false) {
            throw new APIError("UNAUTHORIZED", {
              message:
                "Your account has been deactivated. Please contact administration.",
            });
          }

          /**
           * Returning data continues the login flow normally.
           */
          return { data: session };
        },
      },
    },
  },
});
