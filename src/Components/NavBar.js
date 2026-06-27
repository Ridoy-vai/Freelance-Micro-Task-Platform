"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Menu, X, ChevronDown, LogOut, User, Settings, LayoutDashboard, Bell, Search } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (pathname.includes("dashboard")) {
    return null;
  }
  if (pathname.includes("unauthorized")) {
    return null;
  }

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    return `/dashboard/${user.role || "client"}`;
  };

  const dashboardPath = getDashboardPath();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Tasks", path: "/tasks" },
    { name: "Freelancers", path: "/freelancers" },
  ];

  const profileLinks = [
    { name: "Dashboard", path: dashboardPath, icon: LayoutDashboard },
    { name: "My Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Reusable Profile Dropdown (used in both mobile-right-slot and desktop)
  const ProfileDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 p-1 pr-2 rounded-full border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-sm active:scale-95"
      >
        <img
          src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=f8fafc&color=334155`}
          alt="User"
          className="h-8 w-8 rounded-full object-cover border border-slate-100"
        />
        <ChevronDown className={`hidden sm:block w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
      </button>

      {isProfileOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
          <div className="absolute right-0 mt-3 w-64 z-[110] overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[11px] font-medium text-slate-500 truncate mb-2">{user.email}</p>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest border border-amber-200">
                {user.role}
              </span>
            </div>
            {/* Nav links (Home excluded) - only shown on small devices, since mid/big already show these in the navbar middle */}
            <div className="p-1.5 md:hidden border-b border-slate-100">
              {navLinks
                .filter((link) => link.path !== "/")
                .map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsProfileOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                      isActive(link.path)
                        ? "text-slate-900 bg-slate-100"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
            </div>

            <div className="p-1.5">
              {profileLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                >
                  <link.icon size={16} className="text-slate-400" />
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-1 mx-2" />
              <button
                onClick={handleSignout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-slate-200 py-2 shadow-sm"
          : "bg-white/50 backdrop-blur-sm py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo Section - always left */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm transition-transform group-hover:scale-105">
              <img
                src="https://img.magnific.com/premium-vector/eqh-logo-design-initial-letter-eqh-monogram-logo-using-hexagon-shape_1101554-16445.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Logo"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">TaskNest</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">Marketplace</p>
            </div>
          </Link>

          {/* Middle Navigation - hidden on small, visible from md (mid) and up */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-5 py-2 text-sm font-bold transition-all duration-200 rounded-full ${
                    active
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-amber-600" />
            ) : user ? (
              <>
                {/* Logged in: Search visible from md, Profile dropdown always visible */}
                <button className="hidden md:flex p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                  <Search size={20} />
                </button>
                <ProfileDropdown />
              </>
            ) : (
              <>
                {/* Logged out: Login/Register visible from md (mid + big) */}
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 text-sm font-black bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-200 active:scale-95 transition-all"
                  >
                    Join Now
                  </Link>
                </div>

                {/* Logged out: Menu icon visible only below md (small) */}
                <button
                  className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Content - only relevant for logged-out small screens */}
        {!user && (
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-xl mt-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive(link.path) ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-100 px-1">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center text-slate-900 font-bold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 bg-slate-900 text-white rounded-2xl text-center font-black"
                >
                  Join Marketplace
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}