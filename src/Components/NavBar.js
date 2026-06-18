"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ১. ইউজার ডাটা (এখনকার জন্য হার্ডকোডেড, পরে API বা Auth থেকে আসবে)
  // যদি চেক করতে চান ইউজার না থাকলে কি হবে, তাহলে নিচের লাইনটি ব্যবহার করুন:
  const user = null; 
  
  // const user = {
  //   name: "Ridoy",
  //   email: "ridoy@example.com",
  //   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80",
  //   role: "client", // client | freelancer | admin
  // };

  // ২. Dashboard Path নির্ধারণ (ইউজার থাকলে তবেই পাথ সেট হবে)
  // const dashboardPath = user 
  //   ? user.role === "client"
  //     ? "/dashboard/client"
  //     : user.role === "freelancer"
  //     ? "/dashboard/freelancer"
  //     : "/dashboard/admin"
  //   : "#";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Freelancers", path: "/freelancers" },
    { name: "Dashboard", path: "/dashboard/client" },
    // ...(user ? [{ name: "Dashboard", path: dashboardPath }] : []),
  ];

  const profileLinks = [
    { name: "Dashboard", path: "/dashboard/client" },
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
              <h1 className="font-bold text-lg text-gray-900">FreelanceHub</h1>
              <p className="text-xs text-gray-500">Micro Task Platform</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="font-medium text-gray-700 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <h4 className="font-semibold text-sm">{user?.name}</h4>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    {profileLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}

                    <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="block px-4 py-3 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t my-2" />
                {profileLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="block px-4 py-3 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-3 px-4">
                <Link href="/login" className="text-center py-2 border rounded-lg">Login</Link>
                <Link href="/register" className="text-center py-2 bg-blue-600 text-white rounded-lg">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}