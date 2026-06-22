"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FileText, DollarSign, Plus, 
  ClipboardList, Send, Briefcase, Clock, User, Menu, X, ChevronRight
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const menuConfig = {
  admin: [
    { id: "overview", name: "Overview", icon: LayoutDashboard, href: "/dashboard/admin/overview" },
    { id: "users", name: "Users", icon: Users, href: "/dashboard/admin/users" },
    { id: "tasks", name: "Tasks", icon: FileText, href: "/dashboard/admin/tasks" },
    { id: "transactions", name: "Finance", icon: DollarSign, href: "/dashboard/admin/transactions" },
  ],
  client: [
    { id: "overview", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/client/DashboardHome" },
    { id: "post", name: "Post Task", icon: Plus, href: "/dashboard/client/PostTaskForm" },
    { id: "tasks", name: "My Tasks", icon: ClipboardList, href: "/dashboard/client/MyTasks" },
    { id: "proposals", name: "Proposals", icon: FileText, href: "/dashboard/client/manazeproposals" },
  ],
  freelancer: [
    { id: "overview", name: "Overview", icon: LayoutDashboard, href: "/dashboard/freelancer/overview" },
    { id: "browse", name: "Browse", icon: Briefcase, href: "/dashboard/freelancer/browse" },
    { id: "active", name: "active", icon: Briefcase, href: "/dashboard/freelancer/activeprojects" },
    { id: "proposals", name: "My Proposals", icon: Send, href: "/dashboard/freelancer/myproposals" },
    { id: "earnings", name: "Earnings", icon: DollarSign, href: "/dashboard/freelancer/myearnings" },
  ],
};

const themeConfig = {
  admin: { bg: "bg-red-600", text: "text-red-600", light: "bg-red-50", border: "border-red-600" },
  client: { bg: "bg-blue-600", text: "text-blue-600", light: "bg-blue-50", border: "border-blue-600" },
  freelancer: { bg: "bg-emerald-600", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-600" },
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setRole(data?.user?.role || "client"); // Fallback for testing
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
    </div>
  );

  const menu = menuConfig[role] || [];
  const theme = themeConfig[role] || themeConfig.client;

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#F9FAFB] overflow-hidden">
      
      {/* --- SMALL DEVICE: TOP NAV --- */}
      <div className="md:hidden bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <span className={`font-black tracking-tighter ${theme.text}`}>HUB.</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-slate-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Mobile Horizontal Menu */}
        <div className="flex overflow-x-auto no-scrollbar px-4 pb-2 gap-2">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold transition-all ${isActive ? `${theme.bg} text-white shadow-md` : "bg-white text-slate-500 border"}`}>
                <item.icon size={14} /> {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* --- MID DEVICE: OVERLAY SIDEBAR (TABLET) --- */}
      {sidebarOpen && (
        <div className="md:fixed lg:hidden inset-0 bg-slate-900/40 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* --- BIG DEVICE & MID DEVICE SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center text-white font-bold`}>H</div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">DASHBOARD</h2>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.id} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl group transition-all ${
                    isActive ? `${theme.light} ${theme.text} font-bold` : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[15px]">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden text-[10px] flex items-center justify-center">User</div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 truncate">Account</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{role}</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Tablet Menu Trigger */}
        <div className="hidden md:flex lg:hidden absolute top-6 left-6 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-3 bg-white shadow-xl rounded-2xl border border-slate-100 text-slate-600">
            <Menu size={20} />
          </button>
        </div>

        {/* Content Container with Max-Width 7xl */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}