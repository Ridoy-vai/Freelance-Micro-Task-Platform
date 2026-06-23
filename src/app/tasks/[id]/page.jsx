import ProposalForm from "@/Components/ProposalForm";
import { auth } from "@/lib/auth";
import { GetTasksById } from "@/ServerActions/Task";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, Calendar, DollarSign, MapPin, User, Clock, ShieldCheck } from "lucide-react";

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
    let task = await GetTasksById("tasksid", id);

    if (!task) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center uppercase tracking-widest text-paper/40">
                Task not found
            </div>
        );
    }

    const { title, category, clientname, description, budget, deadline, status, alreadyApplied } = task;

    return (
        <div className="relative min-h-screen bg-[#050505] py-12 lg:py-20">
            {/* Background Gradient Orbs */}
            <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-signal/10 blur-[120px]" />
            <div className="pointer-events-none absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-sage/5 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    
                    {/* Left Side: Task Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 rounded-full border border-sage/30 bg-sage/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-sage">
                                <Briefcase size={10} /> {category || "Project"}
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper/60">
                                <Clock size={10} /> Active
                            </span>
                        </div>

                        <h1 className="mt-6 font-display text-4xl leading-tight text-paper sm:text-5xl lg:text-6xl">
                            {title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-paper/50">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10">
                                    <User size={14} className="text-paper/80" />
                                </div>
                                <span className="text-sm">Posted by <span className="text-paper font-medium">{clientname}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                < ShieldCheck size={16} className="text-signal" />
                                <span className="text-sm font-medium text-signal">Verified Client</span>
                            </div>
                        </div>

                        {/* Highlight Stats Card */}
                        <div className="mt-10 grid grid-cols-1 gap-1 border-y border-white/10 py-8 sm:grid-cols-3">
                            <div className="px-4 py-4 sm:border-r border-white/5">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40">Budget Range</p>
                                <p className="mt-2 flex items-baseline gap-1 font-mono text-3xl font-bold text-paper">
                                    <span className="text-lg text-signal">$</span>{budget}
                                </p>
                            </div>
                            <div className="px-4 py-4 sm:border-r border-white/5">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40">Expected Delivery</p>
                                <p className="mt-2 font-mono text-2xl font-medium text-paper/90">
                                    {formatDate(deadline)}
                                </p>
                            </div>
                            <div className="px-4 py-4 uppercase tracking-widest">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-paper/40">Job Status</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-signal" />
                                    <p className="font-mono text-2xl text-paper/90">{status}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mt-12">
                            <h3 className="flex items-center gap-2 font-display text-xl text-paper">
                                Project Overview
                            </h3>
                            <div className="mt-4 max-w-3xl leading-relaxed text-paper/60 selection:bg-signal/30">
                                {description.split('\n').map((para, i) => (
                                    <p key={i} className="mb-4 text-lg">{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sticky Proposal Form */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-1 backdrop-blur-xl">
                            <div className="rounded-[22px] bg-[#0A0A0A] p-6 lg:p-8">
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
                                            You've already pitched for this task.
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