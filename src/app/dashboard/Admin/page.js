"use client";

import { Briefcase, CheckCircle, Clock, DollarSign, LayoutDashboard, List, LogOut, Plus, Search } from "lucide";
import React, { useState } from "react";


// ১. ডাটা অবজেক্ট
const DASHBOARD_DATA = {
  stats: [
    { id: 1, label: "Total Tasks", value: "1", subText: "All tasks created", icon: List, color: "bg-orange-50 text-orange-600" },
    { id: 2, label: "Open Tasks", value: "1", subText: "Awaiting proposals", icon: Clock, color: "bg-orange-50 text-orange-600" },
    { id: 3, label: "In Progress", value: "0", subText: "Currently being worked on", icon: CheckCircle, color: "bg-orange-50 text-orange-600" },
    { id: 4, label: "Total Spent", value: "$0", subText: "Total money paid", icon: DollarSign, color: "bg-orange-50 text-orange-600" },
  ],
  tasks: [
    { id: "1", title: "fg.kmbm", description: "dfhfn", status: "Open", category: "Development", budget: 200, date: "Jun 19, 2026", proposals: 0 }
  ],
  sidebarLinks: [
    { id: "overview", name: "Overview", icon: LayoutDashboard },
    { id: "my-tasks", name: "My Tasks", icon: Briefcase },
    { id: "post-task", name: "Post Task", icon: Plus },
    { id: "proposals", name: "Proposals", icon: List },
    { id: "payments", name: "Payments", icon: DollarSign },
  ],
  user: {
    name: "Another usage",
    role: "Client",
    image: "https://ui-avatars.com/api/?name=Another+Usage&background=0ea5e9&color=fff"
  }
};

// ২. ডান পাশের আলাদা আলাদা কন্টেন্ট কম্পোনেন্ট
const OverviewContent = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {DASHBOARD_DATA.stats.map((stat) => (
        <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
            <p className="text-xs text-gray-400 mt-1">{stat.subText}</p>
          </div>
          <div className={`${stat.color} p-3 rounded-xl`}><stat.icon size={22} /></div>
        </div>
      ))}
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Tasks</h2>
    <div className="space-y-4">
      {DASHBOARD_DATA.tasks.map((task) => (
        <div key={task.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
            <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">{task.status}</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">{task.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
             <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <span className="bg-gray-100 px-3 py-1.5 rounded-lg">{task.category}</span>
                <span className="text-gray-900 text-sm font-bold">${task.budget}</span>
                <span>{task.date}</span>
             </div>
             <div className="text-gray-400 text-sm">{task.proposals} proposals</div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const PostTaskContent = () => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
    <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
    <p className="text-gray-500 mb-6">Fill in the details to find the best freelancer for your project.</p>
    {/* এখানে আপনার ফর্ম দিতে পারেন */}
    <div className="space-y-4">
        <input type="text" placeholder="Task Title" className="w-full p-3 border rounded-xl" />
        <textarea placeholder="Task Description" className="w-full p-3 border rounded-xl h-32"></textarea>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold">Publish Task</button>
    </div>
  </div>
);

const PlaceholderContent = () => (
  <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
    <div className="bg-gray-50 p-4 rounded-full mb-4"><Search className="text-gray-400" size={40} /></div>
    <h2 className="text-xl font-bold text-gray-900">Page is coming soon!</h2>
    <p className="text-gray-500">We are working hard to bring this feature to you.</p>
  </div>
);

// ৩. মেইন ড্যাশবোর্ড কম্পোনেন্ট
export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // ট্যাব অনুযায়ী কন্টেন্ট রেন্ডার করার ফাংশন
  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewContent />;
      case "post-task": return <PostTaskContent />;
      case "my-tasks": return <PlaceholderContent />;
      case "proposals": return <PlaceholderContent/>;
      case "payments": return <PlaceholderContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg text-white"><Briefcase size={20} fill="currentColor" /></div>
          <span className="text-xl font-bold text-orange-500 tracking-tight">TaskHive</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {DASHBOARD_DATA.sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)} // এখানে ক্লিক করলে স্টেট চেঞ্জ হবে
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === link.id 
                  ? "bg-orange-50 text-orange-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon size={18} />
              {link.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t flex items-center justify-between group cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
             <img src={DASHBOARD_DATA.user.image} className="h-9 w-9 rounded-full shadow-sm" alt="" />
             <div>
                <p className="text-sm font-semibold text-gray-900">{DASHBOARD_DATA.user.name}</p>
                <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold">{DASHBOARD_DATA.user.role}</span>
             </div>
          </div>
          <LogOut size={18} className="text-gray-400 group-hover:text-red-500" />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8">
        {/* Dynamic Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
                {DASHBOARD_DATA.sidebarLinks.find(l => l.id === activeTab)?.name} Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your {activeTab.replace('-', ' ')} efficiently</p>
          </div>
          {activeTab !== "post-task" && (
            <button 
                onClick={() => setActiveTab("post-task")}
                className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm"
            >
                <Plus size={18} /> Post New Task
            </button>
          )}
        </div>

        {/* এখানে ডাইনামিক কন্টেন্ট লোড হবে */}
        <div className="animate-in fade-in duration-500">
            {renderContent()}
        </div>
      </main>
    </div>
  );
}