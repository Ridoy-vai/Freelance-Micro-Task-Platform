import TaskCard from '@/Components/TaskCard';
import { GetAllTasks } from '@/ServerActions/Task';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const FeaturedTasks = async () => {
    const limit = 6;
    const { tasks: TASKS } = await GetAllTasks('tasks', limit, 0);

    return (
        <section className="bg-ink py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">

                {/* Section Header */}
                <div className="flex flex-col items-start justify-between gap-6 mb-14 md:flex-row md:items-end">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-3">
                            <div className="h-px w-6 bg-signal" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal font-semibold">
                                Marketplace
                            </span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
                            Latest featured <span className="text-paper/30">tasks</span>
                        </h2>
                    </div>

                    <Link href="/tasks">
                        <button className="group flex items-center gap-2.5 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-paper/70 transition-all hover:text-paper hover:border-signal/40">
                            Explore all tasks
                            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </Link>
                </div>

                {/* Grid */}
                {TASKS.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {TASKS.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
                            <PackageOpen size={28} className="text-paper/30" />
                        </div>
                        <h3 className="text-base font-semibold text-paper/80">
                            No featured tasks yet
                        </h3>
                        <p className="mt-1 max-w-xs text-sm text-paper/50">
                            Check back soon, new tasks are posted regularly.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedTasks;