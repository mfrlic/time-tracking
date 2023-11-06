import { auth } from "firebase-admin";
import { initApp } from "@/lib/firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_EXPIRES_IN,
} from "@/utils/constants/cookies";

initApp();

export async function POST() {
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRES_IN,
      });
      const options = {
        name: SESSION_COOKIE_NAME,
        value: sessionCookie,
        maxAge: SESSION_EXPIRES_IN,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.json(true, { status: 200 });
}
