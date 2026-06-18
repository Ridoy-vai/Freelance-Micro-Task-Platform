"use client";
import React, { useState } from "react";
import { LayoutDashboard, Briefcase, Send, Clock, DollarSign, User, LogOut, CheckCircle } from "lucide-react";

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col p-4 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-blue-600 px-4 mb-6">Freelancer Pro</h2>
        {[
          { id: "overview", name: "Overview", icon: LayoutDashboard },
          { id: "browse", name: "Browse Tasks", icon: Briefcase },
          { id: "proposals", name: "My Proposals", icon: Send },
          { id: "projects", name: "Active Projects", icon: Clock },
          { id: "earnings", name: "My Earnings", icon: DollarSign },
          { id: "profile", name: "Edit Profile", icon: User },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === item.id ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100"}`}>
            <item.icon size={18} /> {item.name}
          </button>
        ))}
        <div className="mt-auto p-4 border-t flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-xl transition"><LogOut size={18} /> Logout</div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && (
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 font-medium">Total Proposals</p> <h3 className="text-3xl font-bold">25</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 font-medium">Accepted</p> <h3 className="text-3xl font-bold text-green-600">4</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500 font-medium">Earnings</p> <h3 className="text-3xl font-bold text-blue-600">$3,400</h3> </div>
            </div>
        )}

        {activeTab === "browse" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">Web App</span>
                    <span className="font-bold text-lg text-green-600">$500</span>
                </div>
                <h3 className="text-lg font-bold">Build a SaaS Landing Page</h3>
                <p className="text-sm text-gray-500 mt-1">Client: Rahim Ahmed | Deadline: 20 June</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Apply Now</button>
             </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="font-bold text-lg mb-4">Active Project Tracking</h2>
            <div className="flex items-center justify-between border-b pb-4">
                <div><p className="font-bold">E-commerce API Integration</p><p className="text-xs text-gray-400">Status: In Progress</p></div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><CheckCircle size={14}/> Submit Deliverable</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}