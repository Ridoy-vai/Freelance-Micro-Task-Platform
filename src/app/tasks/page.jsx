import TaskCard from '@/ClientActions/TaskCard';
import SearchAndFilter from '@/Components/SearchAndFilter';
// import TaskFilters from '@/ClientActions/TaskFilters';
import { GetAllTasks } from '@/ServerActions/Task';
import React from 'react';

const TaskPage = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params?.search || "";
    const category = params?.category || "";

    const TASKS = await GetAllTasks('tasks', 0, 0, search, category);
    console.log('TASK:', TASKS);

    return (
        <section className="bg-ink py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            Fresh on the board
                        </span>
                        <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
                            Total Active Tasks
                        </h2>
                    </div>
                    <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
                        Total Tasks: {TASKS.length}
                    </button>
                </div>

                {/* Search + Category Filter */}
                <SearchAndFilter
                    defaultSearch={search}
                    defaultCategory={category}
                />

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {TASKS.length > 0 ? (
                        TASKS.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-paper/60 py-10">
                            কোনো task পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TaskPage;