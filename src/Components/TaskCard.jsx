
import Link from "next/link";
import React from "react";

const TaskCard = ({ task }) => {
  function formatDeadline(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  function formatBudget(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <Link href={`/tasks/${task._id}`} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">

        {/* Top Accent Line */}
        {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" /> */}

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-emerald-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col p-6">

          {/* Category & Status */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
                {task.category}
              </span>

              {task.type && <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {task?.type}
              </span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                Active
              </span>
            </div>
          </div>

          {/* Company */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {task.companyName || "TechSprint Labs"}
            </span>

            <svg
              className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600">
            {task.title}
          </h3>

          {/* Description */}
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {task.description ||
              "Looking for a skilled freelancer who can complete this task efficiently with attention to detail and on-time delivery."}
          </p>

          {/* Client */}
          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">

            <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src={task.claintimage || "/user.png"}
                alt={task.clientname}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Posted By
              </p>
              <p className="text-sm font-medium text-slate-700">
                {task.clientname}
              </p>
            </div>

          </div>

          {/* Budget & Deadline */}
          <div className="mt-auto flex items-end justify-between pt-6">
            <div>
              <h4 className="font-mono text-2xl font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                {formatBudget(task.budget)}
              </h4>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Estimated Budget
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-base font-bold text-slate-700">
                {formatDeadline(task.deadline)}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Due Date
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-blue-600">
              Apply Now
            </span>

            <div className="flex items-center gap-2">
              <div className="h-[2px] w-8 bg-blue-300 transition-all duration-300 group-hover:w-12" />

              <svg
                className="h-4 w-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;

