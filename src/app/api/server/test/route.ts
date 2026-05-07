import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { user } from "@/db/schema/auth.schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth"; // Adjust path to your server auth config
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1. Verify the session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const sessionUser = session.user as typeof session.user & { role: string };

    // 2. Parse the JSON body from the client
    const body = await req.json();
    const { studentId, primaryEmail, secondaryEmail } = body;

    // 3. Validation
    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is missing." },
        { status: 400 }
      );
    }
    if (!primaryEmail) {
      return NextResponse.json(
        { error: "Primary parent email is required." },
        { status: 400 }
      );
    }

    // 4. Security Check
    if (
      sessionUser.id !== studentId &&
      sessionUser.role !== "superadmin" &&
      sessionUser.role !== "registrar"
    ) {
      return NextResponse.json(
        { error: "Permission denied." },
        { status: 403 }
      );
    }

    // 5. Update Database
    const updatedRow = await db
      .update(user)
      .set({
        primaryParentEmail: primaryEmail,
        secondaryParentEmail: secondaryEmail || null,
        updatedAt: new Date(),
      })
      .where(eq(user.id, studentId))
      .returning({ updatedId: user.id });

    if (updatedRow.length === 0) {
      return NextResponse.json(
        { error: "Student record not found in database." },
        { status: 404 }
      );
    }

    // 6. Success Response
    return NextResponse.json(
      { success: true, message: "Parent emails updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error updating parents:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
