import ProposalForm from "@/Components/ProposalForm";
import { auth } from "@/lib/auth";
import { GetTasksById } from "@/ServerActions/Task";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, Calendar, DollarSign, MapPin, User, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default async function TaskDetailsPage({ params }) {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    if (!user) redirect("/");

    const { id } = await params;
    let task = await GetTasksById("tasksid", id, user.id);
    console.log(task)

    if (!task) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center uppercase tracking-widest text-paper/40">
                Task not found
            </div>
        );
    }

    const { title, category, clientname, description, budget, deadline, status, alreadyApplied } = task;

    return (
        <div className="relative min-h-screen bg-[#ffffff] py-12 lg:py-20">
            {/* Background Gradient Orbs */}
            <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-signal/10 blur-[120px]" />
            <div className="pointer-events-none absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-sage/5 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Left Side: Task Content */}
                    {/*ljdsnakjfnlasjbfjasdbjasb*/}
                    {/* Left Side: Task Content */}
                    <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">

                        {/* TAGS */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                                <Briefcase size={11} /> {category || "Project"}
                            </span>

                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-600">
                                <Clock size={11} /> {status}
                            </span>
                        </div>

                        {/* TITLE */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                                {title}
                            </h1>
                        </div>


                        {/* CLIENT */}
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-3 sm:p-4">

                            <div className="flex items-center gap-2">

                                <img
                                    src={task.claintimage || "/user.png"}
                                    alt={clientname}
                                    className="h-9 w-9 rounded-full object-cover border border-gray-200"
                                />

                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                        Client
                                    </p>

                                    <p className="text-sm font-semibold text-gray-900">
                                        {clientname}
                                    </p>

                                    <a
                                        href={task.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                    >
                                        {task.companyName || "Not Found Company"}
                                    </a>
                                </div>

                            </div>
                            <div
                                className={`flex items-center gap-1 rounded-full px-3 py-1 ${task.companyName && task.companyWebsite
                                    ? "bg-green-50"
                                    : "bg-red-50"
                                    }`}
                            >
                                <ShieldCheck
                                    size={14}
                                    className={
                                        task.companyName && task.companyWebsite
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                />

                                <span
                                    className={`text-xs font-medium ${task.companyName && task.companyWebsite
                                        ? "text-green-700"
                                        : "text-red-700"
                                        }`}
                                >
                                    {task.companyName && task.companyWebsite
                                        ? "Verified"
                                        : "Not Verified"}
                                </span>
                            </div>

                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Budget
                                </p>
                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    <span className="text-green-600 mr-1">$</span>{budget}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Deadline
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {formatDate(deadline)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Status
                                </p>

                                <div className="mt-1 flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-sm font-semibold text-gray-800 capitalize">
                                        {status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                                Project Overview
                            </h3>

                            <div className="mt-3 space-y-3">
                                {description.split("\n").map((para, i) => (
                                    <p
                                        key={i}
                                        className="text-sm sm:text-base text-gray-600 leading-relaxed 
                 bg-white border border-gray-100 rounded-lg p-1 
                 break-words whitespace-pre-wrap
                 max-h-[4.5rem] overflow-y-auto"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/* Right Side: Sticky Proposal Form */}
                    <div className="lg:col-span-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
                        <div className="sticky top-12 overflow-hidden rounded-3xl border border-white/10 bg-white p-1 backdrop-blur-xl">
                            <div className="rounded-[22px] bg-[#ffffff] p-6 lg:p-8">
                                <h2 className="flex items-center gap-2 font-display text-2xl text-paper">
                                    Interested?
                                </h2>
                                <p className="mt-1 text-sm text-paper/40">Submit your pitch and timeline.</p>

                                {user?.role === "client" ? (
                                    <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                                        <p className="text-xs font-medium text-amber-500/80">
                                            Clients cannot submit proposals.
                                        </p>
                                    </div>
                                ) : alreadyApplied ? (
                                    <div className="mt-8 rounded-2xl border border-signal/20 bg-signal/5 p-6 text-center">
                                        <p className="text-sm text-paper/60">
                                            You have already aplaied for this task.
                                        </p>
                                    </div>
                                ) : (
                                    <ProposalForm task={task} />
                                )}

                                <p className="mt-6 text-center text-[10px] leading-relaxed text-paper/30">
                                    By submitting, you agree to our terms of service and project guidelines.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}