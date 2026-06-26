import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // adjust path to your better-auth instance

const ROLE_ROUTES = {
  "/dashboard/admin": ["admin"],
  "/dashboard/client": ["client"],
  "/dashboard/freelancer": ["freelancer"],
};

const PROTECTED_PREFIX = "/dashboard";
const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Logged-in users shouldn't access /login or /register
  if (AUTH_ROUTES.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user?.role ?? null;

  if (userRole) {
    for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      const isThisRouteRoleRestricted = pathname.startsWith(routePrefix);
      const roleNotAllowed = !allowedRoles.includes(userRole);

      if (isThisRouteRoleRestricted && roleNotAllowed) {
        const ownDashboard = `/dashboard/${userRole}`;
        return NextResponse.redirect(new URL(ownDashboard, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/login", "/register"],
};