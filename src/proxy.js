import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const ROLE_ROUTES = {
  "/dashboard/admin": ["admin"],
  "/dashboard/client": ["client"],
  "/dashboard/freelancer": ["freelancer"],
};

const PROTECTED_PREFIX = "/dashboard";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }


  const userRole = getRoleFromSessionCookie(sessionCookie);

  if (userRole) {
    for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
      const isThisRouteRoleRestricted = pathname.startsWith(routePrefix);
      const roleNotAllowed = !allowedRoles.includes(userRole);

      if (isThisRouteRoleRestricted && roleNotAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  return NextResponse.next();
}

function getRoleFromSessionCookie(cookieValue) {
  try {
    const payloadPart = cookieValue.split(".")[1];
    if (!payloadPart) return null;

    const decoded = JSON.parse(
      Buffer.from(payloadPart, "base64").toString("utf-8")
    );

    return decoded.role ?? null;
  } catch (error) {
    console.error("Failed to decode session cookie:", error);
    return null;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};