import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./utils/constants";
import { SESSION_COOKIE_NAME } from "./utils/constants/cookies";
import { getSession } from "./app/api/client";

// middleware used for protecting routes

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  const pathname = request.nextUrl.pathname;

  if (pathname === routes.login || pathname === routes.register) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(routes.trackers, request.url));
    }

    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  const session = await getSession(request.nextUrl.origin, {
    headers: {
      Cookie: `${SESSION_COOKIE_NAME}=${sessionCookie}`,
    },
  });

  if (!session) {
    request.cookies.delete(SESSION_COOKIE_NAME);
    return NextResponse.redirect(new URL(routes.login, request.url), request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/history", "/login", "/register"],
};
