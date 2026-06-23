"use client";

import { authClient } from "@/lib/auth-client";
import { Postproposals } from "@/ServerActions/proposal";
import { Button } from "@heroui/react";
import { useState } from "react";

export default function ProposalForm({ task }) {
    const taskId = task._id
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
                ...task,
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
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
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
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    placeholder="Briefly explain how you'd approach this task..."
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success w-full rounded-xl"
            >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
        </form>
    );
}