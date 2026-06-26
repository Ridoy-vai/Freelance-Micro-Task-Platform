"use client"
import React from "react";
import { DollarSign, Send, CheckCircle, Clock, TrendingUp, Inbox, PlusCircle } from "lucide-react";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
    AreaChart, Area
} from "recharts";

const COLORS = {
    accepted: "#22c55e",
    pending: "#eab308",
    rejected: "#ef4444",
    completed: "#6366f1",
};

const FreelancerDashboardHome = ({ userName, transactionData, activeData, proposalsData }) => {
    // 1. Calculation: Total Earnings
    const totalEarned = transactionData.reduce((sum, item) => sum + Number(item.price || 0), 0);

    // 2. Proposal status distribution
    const proposalStats = proposalsData.reduce((acc, p) => {
        const status = p.status || "pending";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartProposalData = Object.entries(proposalStats).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));

    // 3. Earnings trend chart data (based on transactions)
    const earningsTrend = transactionData.map((t, i) => ({
        name: `Trx ${i + 1}`,
        amount: Number(t.price)
    })).reverse();

    const cardStats = [
        { title: "Total Earnings", value: `$${totalEarned}`, icon: DollarSign, color: "green", note: "Net Profit" },
        { title: "Active Projects", value: activeData.length, icon: TrendingUp, color: "blue", note: "Ongoing" },
        { title: "Proposals Sent", value: proposalsData.length, icon: Send, color: "indigo", note: "All Time" },
        { title: "Submited", value: proposalStats.submited || 0, icon: CheckCircle, color: "purple", note: "Success" },
        { title: "Pending", value: proposalStats.pending || 0, icon: Clock, color: "yellow", note: "Wait" },
    ];

    const colorMap = {
        green: "from-green-50 text-green-600", blue: "from-blue-50 text-blue-600",
        indigo: "from-indigo-50 text-indigo-600", purple: "from-purple-50 text-purple-600",
        yellow: "from-yellow-50 text-yellow-600"
    };

    if (proposalsData.length === 0 && transactionData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white border border-dashed rounded-[2.5rem] p-16 text-center mx-6 mt-10">
                <div className="bg-gray-50 p-6 rounded-full mb-6">
                    <Inbox size={48} className="text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your dashboard is empty</h2>
                <p className="text-gray-500 max-w-sm mb-8">Start applying for tasks to see your earnings and proposal stats here.</p>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-blue-200">
                    <PlusCircle size={20} /> Find Work
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Freelancer Overview 👋</h1>
                <p className="text-gray-500 mt-1">Hello {userName}, track your proposals and earnings.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                {cardStats.map((item, index) => (
                    <div key={index} className={`bg-gradient-to-br ${colorMap[item.color].split(' ')[0]} to-white p-6 rounded-3xl border border-gray-100 shadow-sm`}>
                        <div className="flex justify-between items-start">
                            <div className={`p-2 rounded-xl bg-white shadow-sm ${colorMap[item.color].split(' ')[1]}`}>
                                <item.icon size={20} />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{item.note}</span>
                        </div>
                        <h3 className="text-2xl font-bold mt-4 text-gray-900">{item.value}</h3>
                        <p className="text-gray-500 text-xs font-semibold uppercase mt-1">{item.title}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Proposal Status Distribution */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Proposal Success Rate</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie 
                                    data={chartProposalData} 
                                    cx="50%" cy="50%" 
                                    innerRadius={70} outerRadius={100} 
                                    paddingAngle={5} dataKey="value"
                                >
                                    {chartProposalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || "#94a3b8"} />
                                    ))}
                                </Pie>
                                <Tooltip cornerRadius={12} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Earnings Trend */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Earnings Analytics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={earningsTrend}>
                                <defs>
                                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" hide />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                                <Area type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Big Bar Chart for Volume */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Activity Volume by Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartProposalData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f9fafb'}} />
                            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                                {chartProposalData.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[entry.name.toLowerCase()] || "#94a3b8"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FreelancerDashboardHome;