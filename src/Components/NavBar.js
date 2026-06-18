"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
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

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              F
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-none">FreelanceHub</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Micro Task Platform</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side (Auth/Profile) */}
          <div className="hidden md:flex items-center">
            {isPending ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover border-2 border-gray-100"
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                      <div className="px-4 py-3 bg-gray-50/50 border-b">
                        <p className="font-semibold text-sm text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-100 text-blue-700 rounded">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        {profileLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>

                      <button
                        onClick={handleSignout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-5 py-2 font-medium text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 mt-4 border-t">
                <div className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                {profileLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="block px-4 py-2.5 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button 
                  onClick={handleSignout}
                  className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 border border-gray-300 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}