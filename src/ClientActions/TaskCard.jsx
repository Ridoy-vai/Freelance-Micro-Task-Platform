import React from 'react';


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
};

export default TaskCard;