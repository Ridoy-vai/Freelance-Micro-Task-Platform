import ProposalForm from "@/ClientActions/ProposalForm";
import { GetTasksById } from "@/ServerActions/Task";
// import ProposalForm from "./ProposalForm";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  let task = null;
  let loadError = null;

  try {
    task = await GetTasksById("tasksid", id);
    if (!task) loadError = "Task not found.";
  } catch (err) {
    console.error("Failed to load task:", err);
    loadError = "Something went wrong loading this task.";
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-white/10 bg-paper/[0.03] p-8 text-center">
          <p className="text-sm text-paper/60">{loadError}</p>
        </div>
      </div>
    );
  }

  const alreadyApplied = task.alreadyApplied;
  const category = task.category || "Uncategorized";
  const title = task.title || "Untitled task";
  const clientName = task.clientName || "Unknown client";
  const description = task.description || "No description provided.";
  const budget = task.budget ?? "—";
  const status = task.status || "open";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left: Task details */}
        <div className="lg:col-span-2">
          <span className="inline-block rounded-full border border-sage/30 bg-sage/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-sage">
            {category}
          </span>

          <h1 className="mt-4 font-display text-3xl text-paper sm:text-4xl">
            {title}
          </h1>

          <p className="mt-2 text-sm text-paper/50">
            Posted by <span className="text-paper/80">{clientName}</span>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-paper/[0.04] p-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                Budget
              </p>
              <p className="mt-1 font-mono text-xl font-semibold text-signal">
                ${budget}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                Deadline
              </p>
              <p className="mt-1 font-mono text-xl text-paper/80">
                {formatDate(task.deadline)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                Status
              </p>
              <p className="mt-1 font-mono text-xl capitalize text-paper/80">
                {status}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
              Description
            </p>
            <p className="mt-2 text-base leading-relaxed text-paper/70">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Submit a Proposal form */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-paper/[0.03] p-6 lg:sticky lg:top-8">
            <h2 className="font-display text-xl text-paper">
              Submit a proposal
            </h2>

            {alreadyApplied ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper/60">
                You have already submitted a proposal for this task. You can
                only apply once.
              </div>
            ) : (
              <ProposalForm taskId={task._id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}