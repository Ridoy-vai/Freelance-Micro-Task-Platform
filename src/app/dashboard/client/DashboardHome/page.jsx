"use client"
import React, { useEffect, useState } from "react";
import { Briefcase, CheckCircle, Clock, DollarSign, FileCheck, Loader2 } from "lucide-react";
import { GetTasksByUser } from "@/ServerActions/Task";
import { authClient } from "@/lib/auth-client";

const DashboardHome = () => {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [tasks, setTasks] = useState([]); // ডাটা রাখার জন্য স্টেট
    const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট

    const user = session?.user;
    const clientId = user?.id;

    useEffect(() => {
        const fetchTasks = async () => {
            if (clientId) {
                try {
                    setIsLoading(true);
                    // সার্ভার অ্যাকশন কল করে ডাটা আনা
                    const fetchedTasks = await GetTasksByUser('my-tasks', clientId);

                    // যদি ডাটা এরে হিসেবে আসে তবে সেট করা, নাহলে খালি এরে
                    setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    setTasks([]);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (!sessionPending) {
            fetchTasks();
        }
    }, [clientId, sessionPending]);

    // লোডিং অবস্থা দেখালে ইউজার বুঝতে পারবে ডাটা আসছে
    if (isLoading || sessionPending) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    // booked + submited দুটো status-ই "spent" হিসেবে count হবে
    const totalBookedBudget = tasks
        .filter((task) => task.status === "booked" || task.status === "submited")
        .reduce((sum, task) => sum + Number(task.budget || 0), 0);

    const stats = [
        {
            title: "Total Tasks",
            value: tasks.length,
            icon: Briefcase,
            color: "blue",
            note: "All Time",
        },
        {
            title: "Open Tasks",
            value: tasks.filter((task) => task.status === "open").length,
            icon: CheckCircle,
            color: "green",
            note: "Active",
        },
        {
            title: "In Progress",
            value: tasks.filter((task) => task.status === "booked").length,
            icon: Clock,
            color: "yellow",
            note: "Working",
        },
        {
            title: "Submitted",
            value: tasks.filter((task) => task.status === "submited").length,
            icon: FileCheck,
            color: "indigo",
            note: "Review",
        },
        {
            title: "Total Spent",
            value: `$ ${totalBookedBudget}`,
            icon: DollarSign,
            color: "purple",
            note: "Spent",
            valueColor: "text-green-600",
        },
    ];

    const colorMap = {
        blue: "from-blue-50",
        green: "from-green-50",
        yellow: "from-yellow-50",
        indigo: "from-indigo-50",
        purple: "from-purple-50",
    };

    const iconColorMap = {
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        indigo: "text-indigo-600",
        purple: "text-purple-600",
    };

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome Back, Client 👋
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Here is your task overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${colorMap[item.color]} to-white p-6 rounded-2xl border hover:shadow-md transition`}
                        >
                            <div className="flex items-center justify-between">
                                <Icon className={iconColorMap[item.color]} />
                                <span className="text-xs text-gray-400">{item.note}</span>
                            </div>

                            <h3
                                className={`text-3xl font-bold mt-3 ${item.valueColor || "text-gray-800"
                                    }`}
                            >
                                {item.value}
                            </h3>

                            <p className="text-gray-500 text-sm">{item.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardHome;