"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { WithForm } from "@/modals/freelancerSubmissionModal";
import { updateProposalStatus } from "@/ServerActions/proposal";
import { IncrementSubmissionCount } from "@/ServerActions/Freelancer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const ActiveProjectActions = ({ proposalId, freelancerId, taskId }) => {
    const [submittingId, setSubmittingId] = useState(null);
    const router = useRouter();

    // Marks a proposal as submitted, increments the freelancer's submission count,
    // then refreshes the page data so the UI reflects the new status.
    const markAsSubmitted = async (id, extraData = {}) => {
        setSubmittingId(id);
        try {
            await updateProposalStatus(
                id,
                "submited",
                extraData.submitionLink,
                extraData.submitionMessage
            );

            if (freelancerId) {
                await IncrementSubmissionCount(freelancerId);
            }

            router.refresh();
        } catch (error) {
            console.error("Failed to mark proposal as submitted:", error);
            toast.error("Failed to submit, please try again.");
        } finally {
            setSubmittingId(null);
        }
    };

    return <WithForm id={proposalId} taskId={taskId} onSubmitSuccess={markAsSubmitted} />;
};

export default ActiveProjectActions;