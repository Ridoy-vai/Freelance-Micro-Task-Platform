"use client";
import React, { useState } from "react";
import { LayoutDashboard, Users, FileText, DollarSign, LogOut, ShieldAlert, CheckCircle } from "lucide-react";
import AdminuserAction from "./users/page";
import AdminTaskPage from "./tasks/page";
import AdminoverView from "./overview/page";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col p-4 space-y-2 shadow-sm">
        <div className="p-4 mb-4"><h2 className="text-2xl font-black text-red-600">ADMIN HUB</h2></div>
        {[
          { id: "overview", name: "Overview", icon: LayoutDashboard },
          { id: "users", name: "Manage Users", icon: Users },
          { id: "tasks", name: "Manage Tasks", icon: FileText },
          { id: "transactions", name: "Transactions", icon: DollarSign },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === item.id ? "bg-red-600 text-white" : "hover:bg-red-50 text-gray-600"}`}>
            <item.icon size={18} /> {item.name}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <AdminoverView />
        )}

        {activeTab === "tasks" && (
          <AdminTaskPage />
        )}
        {activeTab === "users" && (
          <AdminuserAction />
        )}
      </main>
    </div>
  );
}