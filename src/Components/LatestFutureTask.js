// import TaskCard from '@/ClientActions/TaskCard';
import TaskCard from '@/ClientActions/TaskCard';
import { GetAllTasks } from '@/ServerActions/Task';
// import { Link } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TaskPage = async () => {

  const TASKS = await GetAllTasks('tasks', 6, 0);
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
              Latest featured tasks
            </h2>
          </div>
          <Link href="/tasks">
            <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
              Browse all tasks →
            </button>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TASKS.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskPage;