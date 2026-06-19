// components/FreelancerDashboardClient.jsx (CLIENT COMPONENT - shudhu UI interactivity)
"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Send,
  Clock,
  DollarSign,
  User,
  LogOut,
  CheckCircle,
} from "lucide-react";
// import MyProposals from "./MyProposals";
import MyProposals from "@/DashboardActions/MyProposals";
import MyActiveProjects from "./FreelancerActiveProject";
import EarningsPage from "@/DashboardActions/FreelancerEarning";
import EditProfilePage from "@/DashboardActions/EaditProphile";

export default function FreelancerDashboardClient({ data }) {
  const [activeTab, setActiveTab] = useState("overview");

  const { stats, tasks, proposals, activeProjects } = data;

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
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === item.id
              ? "bg-blue-600 text-white shadow-md"
              : "hover:bg-gray-100"
              }`}
          >
            <item.icon size={18} /> {item.name}
          </button>
        ))}
        <div className="mt-auto p-4 border-t flex items-center gap-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-xl transition">
          <LogOut size={18} /> Logout
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-gray-500 font-medium">Total Proposals</p>
              <h3 className="text-3xl font-bold">{stats.totalProposals}</h3>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-gray-500 font-medium">Accepted</p>
              <h3 className="text-3xl font-bold text-green-600">
                {stats.acceptedProposals}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-gray-500 font-medium">Submited</p>
              <h3 className="text-3xl font-bold text-green-600">
                {stats.submitedProposals}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-gray-500 font-medium">Earnings</p>
              <h3 className="text-3xl font-bold text-blue-600">
                ${stats.earnings.toLocaleString()}
              </h3>
            </div>
          </div>
        )}

        {activeTab === "browse" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.length === 0 && (
              <p className="text-gray-400">কোনো open task পাওয়া যায়নি।</p>
            )}
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                    {task.category}
                  </span>
                  <span className="font-bold text-lg text-green-600">
                    ${task.budget}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Client: {task.clientName} | Deadline: {task.deadline}
                </p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "proposals" && <MyProposals proposals={proposals} />}

        {activeTab === "projects" && (
          <MyActiveProjects proposals={proposals} />
        )}
        {activeTab === "earnings" && (
          <EarningsPage proposals={proposals} />
        )}
        {activeTab === "profile" && (
          <EditProfilePage />
        )}
      </main>
    </div>
  );
}