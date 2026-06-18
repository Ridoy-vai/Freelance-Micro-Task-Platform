"use client";
import React, { useState } from "react";
import PostTaskForm from "./PostTaskForm/page";
import {
  LayoutDashboard, Plus, Briefcase, List, LogOut,
  Edit, Trash2, Menu, X
} from "lucide-react";
import MyTasksPage from "./MyTasks/page";
import DashboardHome from "./DashboardHome/page";
import ManageProposals from "./ManageProposal/page";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইল মেনুর জন্য স্টেট

  const menuItems = [
    { id: "overview", name: "Dashboard", icon: LayoutDashboard },
    { id: "post", name: "Post a Task", icon: Plus },
    { id: "tasks", name: "My Tasks", icon: Briefcase },
    { id: "proposals", name: "Manage Proposals", icon: List },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false); // মোবাইলে অপশন ক্লিক করলে মেনু অটো বন্ধ হবে
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">

      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col p-4 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between px-4 mb-6">
          <h2 className="text-xl font-bold text-orange-600">Client Panel</h2>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${activeTab === item.id ? "bg-orange-500 text-white shadow-md" : "hover:bg-gray-100"
                }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-lg transition">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between lg:hidden">
          <h2 className="font-bold text-orange-600">Client Panel</h2>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === "overview" && (
            <DashboardHome />
          )}

          {activeTab === "post" && (
            <div className="w-full max-w-4xl mx-auto">
              <PostTaskForm />
            </div>
          )}

          {activeTab === "tasks" && (
            <MyTasksPage />
          )}
          {activeTab === "proposals" && (
            <ManageProposals/>
          )}
        </div>
      </main>
    </div>
  );
}