import { SESSION_COOKIE_NAME } from "@/utils/constants/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const options = {
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json(true, { status: 200 });
}
