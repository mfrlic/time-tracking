import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes, SESSION_COOKIE_NAME } from "./utils/constants";
import { getSession } from "./app/api/client";

// middleware used for protecting routes

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  const pathname = request.nextUrl.pathname;

  // if user is logged in and tries to access login or register page, redirect to trackers
  if (pathname === routes.login || pathname === routes.register) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(routes.trackers, request.url));
    }

    return NextResponse.next();
  }

  // if user is not logged in and tries to access protected pages, redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  const session = await getSession(request.nextUrl.origin, {
    headers: {
      Cookie: `${SESSION_COOKIE_NAME}=${sessionCookie}`,
    },
  });

  // if user has an invalid session cookie, redirect to login
  if (!session) {
    const res = NextResponse.redirect(new URL(routes.login, request.url));

    res.cookies.delete(SESSION_COOKIE_NAME);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/history", "/login", "/register"],
};
