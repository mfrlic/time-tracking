import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/utils/constants";
import { auth } from "firebase-admin";
import { initApp } from "@/lib/firebase-admin";

initApp();

export async function GET() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value || "";

  if (!sessionCookie) {
    return NextResponse.json(null);
  }

  try {
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);

    if (!decodedClaims) {
      return NextResponse.json(null);
    }

    return NextResponse.json(decodedClaims);
  } catch {
    return NextResponse.json(null);
  }
}
