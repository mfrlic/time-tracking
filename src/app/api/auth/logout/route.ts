import { SESSION_COOKIE_NAME } from "@/utils/constants/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete(SESSION_COOKIE_NAME);
  return NextResponse.json(true, { status: 200 });
}
