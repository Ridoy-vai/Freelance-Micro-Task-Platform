"use client";

import { useSession } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const user = session?.user;

    // Login না থাকলে
    if (!user) {
      router.replace("/login");
      return;
    }

    const role = user?.role?.toLowerCase() || "";
    const currentPath = pathname.toLowerCase();

    const isClientRoute = currentPath.startsWith("/dashboard/client");
    const isFreelancerRoute = currentPath.startsWith("/dashboard/freelancer");
    const isAdminRoute = currentPath.startsWith("/dashboard/admin");

    let allowed = false;

    switch (role) {
      case "client":
        allowed = isClientRoute;
        break;

      case "freelancer":
        allowed = isFreelancerRoute;
        break;

      case "admin":
        allowed = isAdminRoute;
        break;

      default:
        allowed = false;
    }

    if (allowed) {
      setIsAuthorized(true);
      return;
    }

    // Wrong dashboard access
    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "freelancer") {
      router.replace("/dashboard/freelancer");
    } else if (role === "client") {
      router.replace("/dashboard/client");
    } else {
      router.replace("/");
    }
  }, [status, session, pathname, router]);

  if (status === "loading" || !isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">
            Verifying Access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}