"use client";

import {
    GetOverviewUsers,
    GetOverviewTasks,
    GetOverviewProposals,
} from "@/ServerActions/admin";
import {
    Briefcase,
    DollarSign,
    FileText,
    Loader2,
    Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminoverView = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                setIsLoading(true);

                const [usersData, tasksData, proposalsData] = await Promise.all([
                    GetOverviewUsers(),
                    GetOverviewTasks(),
                    GetOverviewProposals(),
                ]);

                setUsers(Array.isArray(usersData) ? usersData : []);
                setTasks(Array.isArray(tasksData) ? tasksData : []);
                setProposals(Array.isArray(proposalsData) ? proposalsData : []);
            } catch (error) {
                console.error("Error fetching overview data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    // Revenue: booked + submited task-গুলোর budget যোগ করা হচ্ছে
    const totalRevenue = tasks
        .filter((t) => t.status === "booked" || t.status === "submited")
        .reduce((sum, t) => sum + Number(t.budget || 0), 0);

    // Status অনুযায়ী breakdown
    const statusCounts = {
        open: tasks.filter((t) => t.status === "open").length,
        booked: tasks.filter((t) => t.status === "booked").length,
        submited: tasks.filter((t) => t.status === "submited").length,
    };

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: Users,
            color: "blue",
        },
        {
            title: "Total Tasks",
            value: tasks.length,
            icon: Briefcase,
            color: "green",
        },
        {
            title: "Total Proposals",
            value: proposals.length,
            icon: FileText,
            color: "yellow",
        },
        {
            title: "Total Revenue",
            value: `$${totalRevenue}`,
            icon: DollarSign,
            color: "purple",
        },
    ];

    const colorMap = {
        blue: "from-blue-50",
        green: "from-green-50",
        yellow: "from-yellow-50",
        purple: "from-purple-50",
    };

    const iconColorMap = {
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        purple: "text-purple-600",
    };

    // Recent activity: task আর proposal মিলিয়ে সাম্প্রতিক ৫টা
    const recentTasks = [...tasks]
        .sort((a, b) => (b._id > a._id ? 1 : -1))
        .slice(0, 5)
        .map((t) => ({
            type: "task",
            title: t.title,
            meta: `${t.clientname || "Unknown"} • $${t.budget}`,
            status: t.status,
        }));

    const recentProposals = [...proposals]
        .sort((a, b) => (b._id > a._id ? 1 : -1))
        .slice(0, 5)
        .map((p) => ({
            type: "proposal",
            title: p.title,
            meta: `${p.Freelancer || "Unknown"} • $${p.proposedBudget}`,
            status: p.status,
        }));

    const recentActivity = [...recentTasks, ...recentProposals].slice(0, 8);

    return (
        <div className="p-4 md:p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Admin Overview
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Platform-এর সম্পূর্ণ পরিসংখ্যান এক নজরে
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${colorMap[item.color]} to-white p-6 rounded-2xl border hover:shadow-md transition`}
                        >
                            <Icon className={iconColorMap[item.color]} />
                            <h3 className="text-3xl font-bold mt-3 text-gray-800">
                                {item.value}
                            </h3>
                            <p className="text-gray-500 text-sm">{item.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Status Breakdown + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-white border rounded-2xl p-6">
                    <h2 className="font-bold text-gray-800 mb-4">
                        Task Status Breakdown
                    </h2>
                    <div
                        style={{ position: "relative", width: "100%", height: "260px" }}
                    >
                        <canvas
                            id="statusChart"
                            role="img"
                            aria-label={`Task status breakdown: ${statusCounts.open} open, ${statusCounts.booked} booked, ${statusCounts.submited} submitted`}
                        >
                            Open: {statusCounts.open}, Booked: {statusCounts.booked},
                            Submitted: {statusCounts.submited}
                        </canvas>
                    </div>
                    <StatusChartScript counts={statusCounts} />
                </div>

                {/* Recent Activity */}
                <div className="bg-white border rounded-2xl p-6">
                    <h2 className="font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between border-b last:border-b-0 pb-3 last:pb-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${
                                                item.type === "task"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-yellow-50 text-yellow-600"
                                            }`}
                                        >
                                            {item.type === "task" ? (
                                                <Briefcase size={16} />
                                            ) : (
                                                <FileText size={16} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {item.title || "Untitled"}
                                            </p>
                                            <p className="text-xs text-gray-500">{item.meta}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                        {item.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-6">
                                কোনো সাম্প্রতিক activity নেই
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Chart.js দিয়ে status breakdown bar chart বানানোর জন্য আলাদা component
const StatusChartScript = ({ counts }) => {
    useEffect(() => {
        let chartInstance;

        const loadChart = async () => {
            // Chart.js CDN থেকে লোড করা হচ্ছে যদি আগে লোড না হয়ে থাকে
            if (!window.Chart) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src =
                        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
                    script.onload = resolve;
                    document.body.appendChild(script);
                });
            }

            const ctx = document.getElementById("statusChart");
            if (!ctx) return;

            // আগের chart instance থাকলে destroy করা হচ্ছে (re-render এড়াতে)
            const existingChart = window.Chart.getChart(ctx);
            if (existingChart) existingChart.destroy();

            chartInstance = new window.Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Open", "Booked", "Submitted"],
                    datasets: [
                        {
                            label: "Tasks",
                            data: [counts.open, counts.booked, counts.submited],
                            backgroundColor: ["#22c55e", "#eab308", "#a855f7"],
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                },
            });
        };

        loadChart();

        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [counts]);

    return null;
};

export default AdminoverView;