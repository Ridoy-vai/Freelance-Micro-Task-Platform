"use client";

/**
 * FeaturedTasks — "Latest Featured Tasks" section
 *
 * Right now TASKS is a static array (object) so you can see the UI immediately.
 * Swap it for real data later — shape stays identical, e.g.:
 *
 *   const res = await fetch("/api/tasks/latest");
 *   const TASKS = await res.json();
 *
 * or directly from MongoDB in a server component:
 *
 *   const TASKS = await db.collection("tasks")
 *     .find({ status: "open" })
 *     .sort({ createdAt: -1 })
 *     .limit(6)
 *     .toArray();
 *
 * Keep each task object shaped like the ones below and the cards
 * below will render correctly without any other changes.
 */

const TASKS = [
  {
    id: "tsk_001",
    title: "Redesign onboarding flow for fintech app",
    client: "Rafiq Hossain",
    category: "UI/UX Design",
    budget: 420,
    deadline: "2026-06-25",
  },
  {
    id: "tsk_002",
    title: "Build responsive pricing page in React",
    client: "Nadia Islam",
    category: "Web Development",
    budget: 310,
    deadline: "2026-06-22",
  },
  {
    id: "tsk_003",
    title: "SEO blog series — 6 posts on sustainable travel",
    client: "Tanvir Ahmed",
    category: "Content Writing",
    budget: 180,
    deadline: "2026-06-30",
  },
  {
    id: "tsk_004",
    title: "Fix cart bug and add Stripe webhook",
    client: "Mehzabin Karim",
    category: "Backend Development",
    budget: 95,
    deadline: "2026-06-20",
  },
  {
    id: "tsk_005",
    title: "Edit 3-minute product launch teaser",
    client: "Shafin Reza",
    category: "Video Editing",
    budget: 260,
    deadline: "2026-06-24",
  },
  {
    id: "tsk_006",
    title: "Clean and deduplicate 40k row customer CSV",
    client: "Farzana Akter",
    category: "Data Entry",
    budget: 60,
    deadline: "2026-06-19",
  },
];

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

function TaskCard({ task }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-paper/[0.04] p-5 transition-colors duration-300 hover:border-signal/40 hover:bg-paper/[0.07]">
      <span className="inline-block rounded-full border border-sage/30 bg-sage/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-sage">
        {task.category}
      </span>

      <h3 className="mt-4 text-base font-semibold leading-snug text-paper">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-paper/50">
        Posted by <span className="text-paper/80">{task.client}</span>
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
            Budget
          </p>
          <p className="mt-1 font-mono text-sm font-semibold text-signal">
            {formatBudget(task.budget)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
            Due
          </p>
          <p className="mt-1 font-mono text-sm text-paper/80">
            {formatDeadline(task.deadline)}
          </p>
        </div>
      </div>

      <button className="mt-5 w-full rounded-xl border border-white/15 bg-white/[0.02] py-2.5 text-sm font-semibold text-paper transition-colors duration-200 group-hover:border-signal/40 group-hover:bg-signal group-hover:text-ink">
        View task
      </button>
    </div>
  );
}

export default function FeaturedTasks() {
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
          <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
            Browse all tasks →
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TASKS.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}