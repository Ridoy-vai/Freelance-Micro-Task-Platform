"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ১. সেশন ডাটা গেট করা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // ২. সাইন আউট হ্যান্ডলার
  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // লগআউট হলে হোমপেজে পাঠাবে
          router.refresh();
        },
      },
    });
  };

  // ৩. ড্যাশবোর্ড পাথ ক্যালকুলেশন (ইউজারের রোলের উপর ভিত্তি করে)
  const getDashboardPath = () => {
    if (!user) return "/login";
    // Better-auth এ রোল সাধারণত user.role এ থাকে
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "freelancer":
        return "/dashboard/freelancer";
      case "client":
        return "/dashboard/client";
      default:
        return "/dashboard";
    }
  };

  const dashboardPath = getDashboardPath();

  // ৪. নেভিগেশন লিঙ্কসমূহ
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Freelancers", path: "/freelancers" },
    // শুধুমাত্র লগইন থাকলে ড্যাশবোর্ড দেখাবে (ঐচ্ছিক)
    ...(user ? [{ name: "Dashboard", path: dashboardPath }] : []),
  ];

  const profileLinks = [
    { name: "Dashboard", path: dashboardPath },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  // পাথ একদম match করলে, বা সাব-রুট হলে (root "/" বাদে) active ধরা হচ্ছে
  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-paper/10 bg-ink/95 backdrop-blur-md z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal text-lg font-bold text-ink">
              T
            </div>
            <div>
              <h1 className="font-display text-lg leading-none text-paper">TaskNest</h1>
              <p className="text-[10px] uppercase tracking-wider text-paper/40">
                Micro Task Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-3 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${active
                    ? "bg-black text-ink shadow-[0_8px_20px_-6px_rgba(var(--signal-rgb),0.4)] translate-y-[-1px]"
                    : "text-paper/60 hover:bg-paper/5 hover:text-paper"
                    }`}
                >
                  {link.name}
                  {/* Active হলে নিচে একটি ছোট ডট যোগ করতে পারেন (Optional) */}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal md:hidden" />
                  )}
                </Link>
              );
            })}
          </div>
          {/* Right Side (Auth/Profile) */}
          <div className="hidden items-center md:flex">
            {isPending ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-signal border-t-transparent" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full transition-colors hover:bg-paper/[0.06] focus:outline-none"
                >
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="h-9 w-9 rounded-full border-2 border-paper/10 object-cover"
                  />
                  <ChevronDown
                    className={`mr-1 h-4 w-4 text-paper/40 transition-transform ${isProfileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-50"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 z-200 mt-2 w-56 overflow-hidden rounded-xl border border-paper/10 bg-ink shadow-2xl shadow-black/10">
                      <div className="border-b border-paper/10 bg-paper/[0.03] px-4 py-3">
                        <p className="truncate text-sm font-semibold text-paper">{user.name}</p>
                        <p className="truncate text-xs text-paper/50">{user.email}</p>
                        <span className="mt-1.5 inline-block rounded bg-signal/15 px-2 py-0.5 text-[10px] font-bold uppercase text-signal">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {profileLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className={`block px-4 py-2 text-sm transition-colors ${isActive(link.path)
                              ? "bg-signal/10 text-signal"
                              : "text-paper/70 hover:bg-paper/[0.06] hover:text-paper"
                              }`}
                            onClick={() => setIsProfileOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>

                      <button
                        onClick={handleSignout}
                        className="flex w-full items-center gap-2 border-t border-paper/10 px-4 py-3 text-left text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 font-medium text-paper/70 transition-colors hover:text-paper"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-signal px-5 py-2 font-medium text-ink shadow-lg shadow-signal/20 transition-all hover:-translate-y-0.5 hover:shadow-signal/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="p-2 text-paper/70 transition-colors hover:text-paper md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-200 ease-out ${isMobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
        >
          <div className="space-y-1 border-t border-paper/10 py-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block rounded-lg px-4 py-2.5 text-base font-medium transition-colors ${active
                    ? "bg-signal/10 text-signal"
                    : "text-paper/70 hover:bg-paper/[0.06] hover:text-paper"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <div className="mt-4 border-t border-paper/10 pt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    className="h-10 w-10 rounded-full border-2 border-paper/10 object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-paper">{user.name}</p>
                    <p className="text-sm text-paper/50">{user.email}</p>
                  </div>
                </div>
                {profileLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`block px-4 py-2.5 transition-colors ${isActive(link.path)
                      ? "bg-signal/10 text-signal"
                      : "text-paper/70 hover:bg-paper/[0.06]"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleSignout}
                  className="mt-2 flex w-full items-center gap-2 px-4 py-3 text-left font-medium text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2 px-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg border border-paper/15 py-2.5 text-center font-medium text-paper/80 hover:border-paper/25"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg bg-signal py-2.5 text-center font-medium text-ink"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}