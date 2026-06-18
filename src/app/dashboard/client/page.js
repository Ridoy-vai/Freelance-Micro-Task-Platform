"use client";
import React, { useState } from "react";
import { LayoutDashboard, Plus, Briefcase, List, LogOut, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-4 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-orange-600 px-4 mb-6">Client Panel</h2>
        {[
          { id: "overview", name: "Dashboard", icon: LayoutDashboard },
          { id: "post", name: "Post a Task", icon: Plus },
          { id: "tasks", name: "My Tasks", icon: Briefcase },
          { id: "proposals", name: "Manage Proposals", icon: List },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === item.id ? "bg-orange-500 text-white" : "hover:bg-gray-100"}`}>
            <item.icon size={18} /> {item.name}
          </button>
        ))}
        <div className="mt-auto p-4 border-t flex items-center gap-2 text-red-500 cursor-pointer"><LogOut size={18} /> Logout</div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Welcome Back, Client</h1>
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500">Total Tasks</p> <h3 className="text-2xl font-bold">12</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500">Open Tasks</p> <h3 className="text-2xl font-bold">5</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500">In Progress</p> <h3 className="text-2xl font-bold">3</h3> </div>
                <div className="bg-white p-6 rounded-xl border shadow-sm"> <p className="text-gray-500">Total Spent</p> <h3 className="text-2xl font-bold text-green-600">$1,250</h3> </div>
            </div>
          </div>
        )}

        {activeTab === "post" && (
          <div className="max-w-2xl bg-white p-8 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Post a Job Block</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Task Title" className="w-full border p-3 rounded-lg focus:ring-2 ring-orange-200 outline-none" />
              <select className="w-full border p-3 rounded-lg outline-none"><option>Web Development</option><option>Graphic Design</option></select>
              <textarea placeholder="Job Description" className="w-full border p-3 rounded-lg h-32 outline-none"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Budget (USD)" className="border p-3 rounded-lg outline-none" />
                <input type="date" className="border p-3 rounded-lg outline-none" />
              </div>
              <button className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition">Publish Task</button>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr><th className="p-4">Title</th><th className="p-4">Status</th><th className="p-4">Action</th></tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Portfolio Website</td>
                  <td className="p-4"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Open</span></td>
                  <td className="p-4 flex gap-2">
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"><Edit size={16}/></button>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}