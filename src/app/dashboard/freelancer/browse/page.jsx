import TaskCard from '@/Components/TaskCard';
import { requireRole } from '@/lib/role-check-access';
import { GetAllTasks } from '@/ServerActions/Task';
import { ClipboardList } from 'lucide-react'; // Added Icon for empty state
import Link from 'next/link';
import React from 'react';

const TASKS_PER_PAGE = 6;

export const metadata = {
  title: "Browse Tasks | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};

const FeaturedTasks = async () => {
    await requireRole(["freelancer"]);
    const limit = TASKS_PER_PAGE;

    const { tasks: TASKS } = await GetAllTasks('tasks', limit, 0);

    return (
        <section className="bg-ink py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            Fresh on the board
                        </span>
                        <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
                            Latest featured tasks
                        </h2>
                    </div>
                    {/* Only show "Browse all" link if there are tasks */}
                    {TASKS && TASKS.length > 0 && (
                        <Link href="/tasks">
                            <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
                                Browse all tasks →
                            </button>
                        </Link>
                    )}
                </div>

                {/* Task Grid or Empty State */}
                {TASKS && TASKS.length > 0 ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {TASKS.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                ) : (
                    /* Professional Empty State Message */
                    <div className="mt-16 flex flex-col items-center justify-center rounded-[2rem] border border-paper/5 bg-paper/[0.02] py-20 px-6 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-paper/5 text-paper/20">
                            <ClipboardList size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="mt-6 font-display text-xl text-paper">
                            No tasks available right now
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/40">
                            The task board is currently quiet. Please check back later or refresh the page to find new opportunities.
                        </p>
                        <button 
                            onClick="window.location.reload()"
                            className="mt-8 rounded-xl border border-paper/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-paper/60 transition-all hover:bg-paper/5 hover:text-paper"
                        >
                            Refresh Board
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedTasks;