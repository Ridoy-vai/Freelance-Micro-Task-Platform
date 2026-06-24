import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireRole(allowedRoles) {
  let session;

  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("Session fetch failed:", error);
    redirect("/login");
  }

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = session.user.role;

  if (!allowedRoles.includes(userRole)) {
    redirect("/unauthorized");
  }

  return session;
}