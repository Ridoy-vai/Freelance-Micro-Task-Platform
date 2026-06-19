"use client";

import { authClient } from "@/lib/auth-client";
import { Postproposals } from "@/ServerActions/proposal";
import { useState } from "react";

export default function ProposalForm({ taskId }) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [form, setForm] = useState({
        taskId,
        freelancerEmail: "",
        proposedBudget: "",
        estimatedDays: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const proposal = {
                ...form,
                status: "pending",
                Freelancer: user.name,
                FreelancerId: user.id,
                taskId,

            }
            Postproposals({ path: "proposals", proposal })

            console.log("Proposal submitted:", proposal);

            await new Promise((r) => setTimeout(r, 500));
            setSubmitted(true);
        } catch (err) {
            console.error("Failed to submit proposal:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper/60">
                Your proposal has been submitted.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <input type="hidden" name="taskId" value={form.taskId} />

            <div>
                <label
                    htmlFor="freelancerEmail"
                    className="mb-1.5 block text-sm font-medium text-paper/80"
                >
                    Your email
                </label>
                <input
                    id="freelancerEmail"
                    name="freelancerEmail"
                    type="email"
                    required
                    value={form.freelancerEmail}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
                    placeholder="you@example.com"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="proposedBudget"
                        className="mb-1.5 block text-sm font-medium text-paper/80"
                    >
                        Budget (USD)
                    </label>
                    <input
                        id="proposedBudget"
                        name="proposedBudget"
                        type="number"
                        min="1"
                        required
                        value={form.proposedBudget}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
                        placeholder="90"
                    />
                </div>
                <div>
                    <label
                        htmlFor="estimatedDays"
                        className="mb-1.5 block text-sm font-medium text-paper/80"
                    >
                        Days
                    </label>
                    <input
                        id="estimatedDays"
                        name="estimatedDays"
                        type="number"
                        min="1"
                        required
                        value={form.estimatedDays}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
                        placeholder="5"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-paper/80"
                >
                    Cover note
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
                    placeholder="Briefly explain how you'd approach this task..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-signal py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
                {isSubmitting ? "Submitting…" : "Submit proposal"}
            </button>
        </form>
    );
}