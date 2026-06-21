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

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setRole(data?.user?.role || null);
      setLoading(false);
    };
    fetchSession();
  }, []);

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
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col p-4 shadow-sm">
        <div className="px-3 py-4 mb-4 border-b">
          <h2 className={`text-xl font-black tracking-tight ${theme.text}`}>
            {theme.title}
          </h2>
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
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
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

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}