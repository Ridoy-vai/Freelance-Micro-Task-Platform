"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Plus,
  ClipboardList,
  Send,
  Briefcase,
  Clock,
  User,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const menuConfig = {
  admin: [
    { id: "overview", name: "Overview", icon: LayoutDashboard, href: "/dashboard/admin/overview" },
    { id: "users", name: "Manage Users", icon: Users, href: "/dashboard/admin/users" },
    { id: "tasks", name: "Manage Tasks", icon: FileText, href: "/dashboard/admin/tasks" },
    { id: "transactions", name: "Transactions", icon: DollarSign, href: "/dashboard/admin/transactions" },
  ],
  client: [
    { id: "overview", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/client/DashboardHome" },
    { id: "post", name: "Post a Task", icon: Plus, href: "/dashboard/client/PostTaskForm" },
    { id: "tasks", name: "My Tasks", icon: ClipboardList, href: "/dashboard/client/MyTasks" },
    { id: "proposals", name: "Manage Proposals", icon: FileText, href: "/dashboard/client/manazeproposals" },
  ],
  freelancer: [
    { id: "overview", name: "Overview", icon: LayoutDashboard, href: "/dashboard/freelancer/overview" },
    { id: "browse", name: "Browse Tasks", icon: Briefcase, href: "/dashboard/freelancer/browse" },
    { id: "proposals", name: "My Proposals", icon: Send, href: "/dashboard/freelancer/myproposals" },
    { id: "projects", name: "Active Projects", icon: Clock, href: "/dashboard/freelancer/activeprojects" },
    { id: "earnings", name: "My Earnings", icon: DollarSign, href: "/dashboard/freelancer/myearnings" },
    { id: "profile", name: "Edit Profile", icon: User, href: "/dashboard/freelancer/eaditprofile" },
  ],
};

const themeConfig = {
  admin: {
    title: "ADMIN HUB",
    bg: "bg-red-600",
    text: "text-red-600",
    hoverBg: "hover:bg-red-50",
    activeText: "text-red-700",
    activeBorder: "border-red-600",
    iconBg: "bg-red-100",
  },
  client: {
    title: "CLIENT HUB",
    bg: "bg-blue-600",
    text: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
    activeText: "text-blue-700",
    activeBorder: "border-blue-600",
    iconBg: "bg-blue-100",
  },
  freelancer: {
    title: "FREELANCER HUB",
    bg: "bg-green-600",
    text: "text-green-600",
    hoverBg: "hover:bg-green-50",
    activeText: "text-green-700",
    activeBorder: "border-green-600",
    iconBg: "bg-green-100",
  },
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // tablet/desktop toggle

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setRole(data?.user?.role || null);
      setLoading(false);
    };
    fetchSession();
  }, []);

  // route change hole tablet/mobile e sidebar auto close
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!role || !menuConfig[role]) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Unauthorized</p>
      </div>
    );
  }

  const menu = menuConfig[role];
  const theme = themeConfig[role];

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Tablet/Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r shadow-sm transition-all duration-200 overflow-hidden
          ${sidebarOpen ? "md:w-64 p-4" : "md:w-0 md:p-0 lg:w-64 lg:p-4"}
        `}
      >
        <div className="px-3 py-4 mb-4 border-b flex items-center justify-between">
          <h2 className={`text-xl font-black tracking-tight whitespace-nowrap ${theme.text}`}>
            {theme.title}
          </h2>
          {/* Tablet e e toggle close button, desktop e hidden */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border-l-4 whitespace-nowrap ${
                  isActive
                    ? `${theme.activeBorder} ${theme.activeText} bg-gray-50 font-semibold`
                    : `border-transparent text-gray-500 ${theme.hoverBg} hover:text-gray-800`
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors shrink-0 ${
                    isActive ? theme.iconBg : "bg-gray-100 group-hover:bg-gray-200"
                  }`}
                >
                  <item.icon size={16} className={isActive ? theme.activeText : "text-gray-500"} />
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Tablet e sidebar close korar jonno backdrop (jokhon open thake) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="hidden md:block lg:hidden fixed inset-0 bg-black/30 z-30"
        />
      )}

      {/* Tablet e absolute positioned sidebar (jokhon toggle kore khola hoy) */}
      {sidebarOpen && (
        <aside className="hidden md:flex lg:hidden flex-col w-64 bg-white border-r shadow-lg p-4 fixed left-0 top-0 h-full z-40">
          <div className="px-3 py-4 mb-4 border-b flex items-center justify-between">
            <h2 className={`text-xl font-black tracking-tight ${theme.text}`}>
              {theme.title}
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border-l-4 ${
                    isActive
                      ? `${theme.activeBorder} ${theme.activeText} bg-gray-50 font-semibold`
                      : `border-transparent text-gray-500 ${theme.hoverBg} hover:text-gray-800`
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors shrink-0 ${
                      isActive ? theme.iconBg : "bg-gray-100 group-hover:bg-gray-200"
                    }`}
                  >
                    <item.icon size={16} className={isActive ? theme.activeText : "text-gray-500"} />
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Mobile Top Bar (hamburger shoho) - tablet/desktop e toggle button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center justify-between px-4 z-30">
        <h2 className={`text-lg font-black tracking-tight ${theme.text}`}>{theme.title}</h2>
      </div>

      {/* Tablet e top bar e hamburger toggle button */}
      <div className="hidden md:flex lg:hidden fixed top-4 left-4 z-30">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white border rounded-lg shadow-sm text-gray-600 hover:bg-gray-50"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-14 pb-16 md:pt-0 md:pb-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-around z-30">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full text-[10px] font-medium transition-colors ${
                isActive ? theme.activeText : "text-gray-400"
              }`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                  isActive ? theme.iconBg : ""
                }`}
              >
                <item.icon size={18} />
              </span>
              <span className="truncate w-full text-center px-0.5">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}