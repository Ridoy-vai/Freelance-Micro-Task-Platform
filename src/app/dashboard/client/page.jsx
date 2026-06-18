"use client";
import React, { useState } from "react";
import PostTaskForm from "./PostTaskForm/page";
import { 
  LayoutDashboard, Plus, Briefcase, List, LogOut, 
  Edit, Trash2, Menu, X 
} from "lucide-react";
import MyTasksPage from "./MyTasks/page";

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
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${
                activeTab === item.id ? "bg-orange-500 text-white shadow-md" : "hover:bg-gray-100"
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
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-6">Welcome Back, Client</h1>
              {/* Responsive Grid: Mobile 1, Tablet 2, Desktop 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 text-sm">Total Tasks</p> <h3 className="text-2xl font-bold">12</h3> </div>
                  <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 text-sm">Open Tasks</p> <h3 className="text-2xl font-bold">5</h3> </div>
                  <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 text-sm">In Progress</p> <h3 className="text-2xl font-bold">3</h3> </div>
                  <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 text-sm">Total Spent</p> <h3 className="text-2xl font-bold text-green-600">$1,250</h3> </div>
              </div>
            </div>
          )}
 
          {activeTab === "post" && (
            <div className="w-full max-w-4xl mx-auto">
              <PostTaskForm />
            </div>
          )}

          {activeTab === "tasks" && (
           <MyTasksPage/>
          )}
        </div>
      </main>
    </div>
  );
}