import { initApp } from "@/lib/firebase-admin";
import { SESSION_COOKIE_NAME } from "@/utils/constants/cookies";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import type { Session } from "../../types";

initApp();

export async function getServerSession(): Promise<Session | null> {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || "";

  if (!session) {
    return null;
  }

  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return null;
  }

  return decodedClaims;
}