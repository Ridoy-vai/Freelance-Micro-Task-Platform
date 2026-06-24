"use client"
import React from "react";
import { Briefcase, CheckCircle, Clock, DollarSign, FileCheck, Inbox, PlusCircle } from "lucide-react";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
    AreaChart, Area
} from "recharts";
import Link from "next/link";

const STATUS_COLORS = {
    open: "#22c55e",
    booked: "#eab308",
    submited: "#6366f1",
    unknown: "#94a3b8",
};

const DashboardHome = ({ tasks = [], clientId, userName }) => {

    // Budget Calculation
    const totalBookedBudget = tasks
        .filter((task) => task.status === "booked" || task.status === "submited")
        .reduce((sum, task) => sum + Number(task.budget || 0), 0);

    // Status Count
    const statusCounts = tasks.reduce((acc, task) => {
        const status = task.status || "unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(statusCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        value,
    }));

    // Data for Detailed Chart (Based on Budget)
    const detailedChartData = tasks.map(t => ({
        name: t.title.length > 15 ? t.title.substring(0, 12) + "..." : t.title,
        budget: Number(t.budget) || 0,
        status: t.status
    }));

    const cardStats = [
        { title: "Total Tasks", value: tasks.length, icon: Briefcase, color: "blue", note: "All Time" },
        { title: "Open Tasks", value: statusCounts.open || 0, icon: CheckCircle, color: "green", note: "Active" },
        { title: "In Progress", value: statusCounts.booked || 0, icon: Clock, color: "yellow", note: "Working" },
        { title: "Submitted", value: statusCounts.submited || 0, icon: FileCheck, color: "indigo", note: "Review" },
        { title: "Total Spent", value: `$${totalBookedBudget}`, icon: DollarSign, color: "purple", note: "Spent", valueColor: "text-green-600" },
    ];

    const colorMap = {
        blue: "from-blue-50", green: "from-green-50", yellow: "from-yellow-50",
        indigo: "from-indigo-50", purple: "from-purple-50",
    };
    const iconColorMap = {
        blue: "text-blue-600", green: "text-green-600", yellow: "text-yellow-600",
        indigo: "text-indigo-600", purple: "text-purple-600",
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Welcome Back, {userName || "Client"} 👋
                </h1>
                <p className="text-gray-500 text-sm mt-1">Monitor your project performance and budget metrics.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
                {cardStats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className={`bg-gradient-to-br ${colorMap[item.color]} to-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}>
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg bg-white shadow-sm ${iconColorMap[item.color]}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{item.note}</span>
                            </div>
                            <h3 className={`text-2xl font-bold mt-4 ${item.valueColor || "text-gray-900"}`}>{item.value}</h3>
                            <p className="text-gray-500 text-xs font-semibold uppercase mt-1 tracking-tight">{item.title}</p>
                        </div>
                    );
                })}
            </div>

            {tasks.length === 0 ? (
                /* Enhanced Empty State */
                <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-[2.5rem] p-16 text-center shadow-sm">
                    <div className="bg-gray-50 p-6 rounded-full mb-6">
                        <Inbox size={48} className="text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No tasks found yet</h2>
                    <p className="text-gray-500 max-w-sm mb-8">
                        It looks like you haven't posted any tasks. Start your journey by creating a new project today.
                    </p>
                    <Link href={"/dashboard/client/PostTaskForm"}>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-200">
                            <PlusCircle size={20} />
                            Post Your First Task
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Top Row Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Task Status Distribution</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        innerRadius={60}
                                        paddingAngle={8}
                                        label
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name.toLowerCase()] || STATUS_COLORS.unknown} />
                                        ))}
                                    </Pie>
                                    <Tooltip cornerRadius={10} />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Volume by Status</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} allowDecimals={false} />
                                    <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={45}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`bar-${index}`} fill={STATUS_COLORS[entry.name.toLowerCase()] || STATUS_COLORS.unknown} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Big Detailed Budget Chart */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold text-gray-800">Detailed Budget Overview</h3>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Per Project</span>
                        </div>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={detailedChartData}>
                                <defs>
                                    <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} interval={0} angle={-15} textAnchor="end" />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="budget" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;