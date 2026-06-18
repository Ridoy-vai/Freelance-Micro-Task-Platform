"use client";
import React, { useState } from "react";
import { LayoutDashboard, Users, FileText, DollarSign, LogOut, ShieldAlert, CheckCircle } from "lucide-react";

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
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-400 font-bold uppercase text-xs tracking-wider">Total Revenue</p> <h3 className="text-3xl font-black text-gray-800">$45,000</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-400 font-bold uppercase text-xs tracking-wider">Active Tasks</p> <h3 className="text-3xl font-black text-red-500">120</h3> </div>
            </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white border rounded-xl shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b font-bold uppercase text-xs text-gray-400 tracking-widest">
                <tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Action</th></tr>
              </thead>
              <tbody>
                <tr className="border-b">
                    <td className="p-4">karim@example.com</td>
                    <td className="p-4 capitalize">freelancer</td>
                    <td className="p-4"><button className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition">BLOCK USER</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}