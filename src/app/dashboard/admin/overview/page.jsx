"use client";

import {
  GetOverviewUsers,
  GetOverviewTasksRaw,
  GetOverviewProposals,
} from "@/ServerActions/admin";
import {
  Briefcase,
  DollarSign,
  FileText,
  Loader2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
          GetOverviewTasksRaw(),
          GetOverviewProposals(),
        ]);

        console.log("userdata", usersData, "task data", tasksData, "proposaldata", proposalsData);

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

  const totalRevenue = tasks
    .filter((t) => t.status === "booked" || t.status === "submited")
    .reduce((sum, t) => sum + Number(t.budget || 0), 0);

  const statusCounts = {
    open: tasks.filter((t) => t.status === "open").length,
    booked: tasks.filter((t) => t.status === "booked").length,
    submited: tasks.filter((t) => t.status === "submited").length,
  };

  const barChartData = [
    { status: "Open", count: statusCounts.open },
    { status: "Booked", count: statusCounts.booked },
    { status: "Submitted", count: statusCounts.submited },
  ];

  const pieChartData = [
    { name: "Open", value: statusCounts.open, color: "#22c55e" },
    { name: "Booked", value: statusCounts.booked, color: "#eab308" },
    { name: "Submitted", value: statusCounts.submited, color: "#a855f7" },
  ].filter((d) => d.value > 0);

  const stats = [
    { title: "Total Users", value: users.length, icon: Users, color: "blue" },
    { title: "Total Tasks", value: tasks.length, icon: Briefcase, color: "green" },
    { title: "Total Proposals", value: proposals.length, icon: FileText, color: "yellow" },
    { title: "Total Revenue", value: `$${totalRevenue}`, icon: DollarSign, color: "purple" },
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

  const getLast14DaysTrend = () => {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }

    const isSameDay = (dateA, dateB) =>
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate();

    return days.map((day) => {
      const userCount = users.filter(
        (u) => u.createdAt && isSameDay(new Date(u.createdAt), day)
      ).length;

      const taskCount = tasks.filter(
        (t) => t.createdAt && isSameDay(new Date(t.createdAt), day)
      ).length;

      const proposalCount = proposals.filter(
        (p) => p.createdAt && isSameDay(new Date(p.createdAt), day)
      ).length;

      return {
        date: day.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        users: userCount,
        tasks: taskCount,
        proposals: proposalCount,
      };
    });
  };

  const trendData = getLast14DaysTrend();

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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Platform-এর সম্পূর্ণ পরিসংখ্যান এক নজরে
        </p>
      </div>

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

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 mb-1">Traffic Trend</h2>
        <p className="text-sm text-gray-500 mb-4">
          গত ১৪ দিনে user signup, task post, proposal submission
        </p>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" name="New Users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="tasks" name="Tasks Posted" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="proposals" name="Proposals" stroke="#eab308" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 mb-4">Task Status (Bar)</h2>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#22c55e", "#eab308", "#a855f7"][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 mb-4">Task Status (Pie)</h2>
          <div style={{ width: "100%", height: 260 }}>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                কোনো task নেই
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3 max-h-[260px] overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.type === "task" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                      {item.type === "task" ? <Briefcase size={16} /> : <FileText size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.title || "Untitled"}</p>
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

export default AdminoverView;