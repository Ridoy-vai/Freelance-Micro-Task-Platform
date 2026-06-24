"use client";
import React from "react";
import {
    Users, Briefcase, FileText, DollarSign, Activity,
    TrendingUp, Inbox, UserX, CreditCard, CheckCircle,
    XCircle, Clock
} from "lucide-react";
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, AreaChart, Area
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#6366f1", "#ef4444", "#8b5cf6", "#f97316"];

const AdminOverviewDashboard = ({ users = [], tasks = [], payments = [], proposals = [] }) => {

    // 1. User Metrics
    const clientsCount = users.filter(u => u.role === "client").length;
    const freelancersCount = users.filter(u => u.role === "freelancer").length;
    const blockedUsersCount = users.filter(u => u.isBlocked === true).length;

    // 2. Task Lifecycle Metrics
    const taskStats = tasks.reduce((acc, t) => {
        const s = t.status || "pending";
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});

    const lifecycleData = [
        { name: "Pending", value: taskStats.pending || 0, color: "#eab308" },
        { name: "Submitted", value: taskStats.submited || 0, color: "#6366f1" },
        { name: "Rejected", value: taskStats.rejected || 0, color: "#ef4444" },
        { name: "Approved", value: taskStats.booked || 0, color: "#22c55e" },
    ];

    // 3. Payment Metrics
    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.price || 0), 0);
    const transactionCount = payments.length;

    // 4. Trend Data
    const getTrendData = () => {
        const days = [];
        for (let i = 13; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            days.push({
                date: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
                Clients: users.filter(u => u.role === "client" && u.createdAt?.startsWith(dateStr)).length,
                Freelancers: users.filter(u => u.role === "freelancer" && u.createdAt?.startsWith(dateStr)).length,
                Revenue: payments.filter(p => p.createdAt?.startsWith(dateStr)).reduce((s, curr) => s + Number(curr.price || 0), 0),
            });
        }
        return days;
    };

    const trendData = getTrendData();

    const stats = [
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "purple", note: "Gross" },
        { title: "Transactions", value: transactionCount, icon: CreditCard, color: "blue", note: "Total" },
        { title: "Clients", value: clientsCount, icon: Users, color: "green", note: "Employers" },
        { title: "Freelancers", value: freelancersCount, icon: Activity, color: "indigo", note: "Providers" },
        { title: "Blocked", value: blockedUsersCount, icon: UserX, color: "red", note: "Restricted" },
        { title: "Active Tasks", value: tasks.length, icon: Briefcase, color: "yellow", note: "Market" },
    ];

    const colorClasses = {
        purple: "from-purple-50 text-purple-600",
        blue: "from-blue-50 text-blue-600",
        green: "from-green-50 text-green-600",
        indigo: "from-indigo-50 text-indigo-600",
        red: "from-red-50 text-red-600",
        yellow: "from-yellow-50 text-yellow-600",
    };

    return (
        <div className="p-3 md:p-8 bg-gray-50 min-h-screen space-y-6 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">
                    Admin Intelligence
                </h1>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                    Deep dive into platform users, tasks, and financials.
                </p>
            </div>

            {/* Top Stats Cards - Responsive 2 Columns on Mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6">
                {stats.map((item, index) => (
                    <div key={index} className={`bg-gradient-to-br ${colorClasses[item.color].split(' ')[0]} to-white p-3 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm`}>
                        <div className="flex justify-between items-start">
                            <div className={`p-1.5 md:p-2 rounded-lg bg-white shadow-sm ${colorClasses[item.color].split(' ')[1]}`}>
                                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-[7px] md:text-[9px] uppercase font-bold text-gray-400 tracking-widest">{item.note}</span>
                        </div>
                        <h3 className="text-sm md:text-2xl font-black mt-2 md:mt-4 text-gray-900 truncate">
                            {item.value}
                        </h3>
                        <p className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase mt-0.5 md:mt-1 truncate">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Growth & Revenue Analytics */}
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-8 gap-4">
                    <h3 className="text-base md:text-xl font-bold text-gray-800">Growth Trend</h3>
                    <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase">
                        <span className="text-blue-500">● Clients</span>
                        <span className="text-indigo-500">● Freelancers</span>
                        <span className="text-green-500">● Revenue</span>
                    </div>
                </div>
                <div className="h-[250px] md:h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            {/* graph paper style grid - both directions */}
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                            <XAxis
                                dataKey="date"
                                axisLine={{ stroke: '#e2e8f0' }}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 600 }}
                            />

                            <YAxis
                                yAxisId="left"
                                axisLine={{ stroke: '#e2e8f0' }}
                                tickLine={false}
                                tick={{ fontSize: 10 }}
                            />

                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={{ stroke: '#e2e8f0' }}
                                tickLine={false}
                                tick={{ fontSize: 10 }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />

                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />

                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="Revenue"
                                stroke="#22c55e"
                                strokeWidth={3}
                                fill="url(#colorRev)"
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="Clients"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="transparent"
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="Freelancers"
                                stroke="#6366f1"
                                strokeWidth={2}
                                fill="transparent"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Distribution Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 md:mb-6">User Base</h3>
        <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={[
                            { name: "Clients", value: clientsCount },
                            { name: "Freelancers", value: freelancersCount }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={8}
                        cornerRadius={12}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        <Cell fill="#f97316" />
                        <Cell fill="#06b6d4" />
                    </Pie>
                    <Tooltip
                        cornerRadius={12}
                        formatter={(value, name, props) => {
                            const total = clientsCount + freelancersCount;
                            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                            return [`${value} (${percent}%)`, name];
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>

    <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 md:mb-6 text-center lg:text-left">Task Lifecycle</h3>
        <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lifecycleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={{ stroke: '#e2e8f0' }} tickLine={false} tick={{ fontWeight: 600, fontSize: 10 }} />
                    <YAxis axisLine={{ stroke: '#e2e8f0' }} tickLine={false} tick={{ fontSize: 10 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={36}>
                        {lifecycleData.map((entry, index) => {
                            const colors = ["#f97316", "#06b6d4", "#8b5cf6", "#ec4899", "#22c55e", "#eab308"];
                            return <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />;
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
</div>

            {/* Bottom Quick Summary - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 flex items-center gap-3 md:gap-4">
                    <div className="bg-red-50 p-2 md:p-3 rounded-xl text-red-600"><XCircle size={20} /></div>
                    <div>
                        <p className="text-sm md:text-base font-bold text-gray-800">{taskStats.rejected || 0} Tasks</p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black tracking-wider">Rejected Total</p>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 flex items-center gap-3 md:gap-4">
                    <div className="bg-blue-50 p-2 md:p-3 rounded-xl text-blue-600"><CheckCircle size={20} /></div>
                    <div>
                        <p className="text-sm md:text-base font-bold text-gray-800">{taskStats.submited || 0} Tasks</p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black tracking-wider">Submitted Review</p>
                    </div>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 flex items-center gap-3 md:gap-4">
                    <div className="bg-yellow-50 p-2 md:p-3 rounded-xl text-yellow-600"><Clock size={20} /></div>
                    <div>
                        <p className="text-sm md:text-base font-bold text-gray-800">{taskStats.pending || 0} Tasks</p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black tracking-wider">Waiting Response</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewDashboard;