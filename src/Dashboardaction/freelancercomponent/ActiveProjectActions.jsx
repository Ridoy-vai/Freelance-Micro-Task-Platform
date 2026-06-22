"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WithForm } from "@/modals/freelancerSubmissionModal";
import {   updateProposalStatus } from "@/ServerActions/proposal";
import { IncrementSubmissionCount } from "@/ServerActions/Freelancer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const ActiveProjectActions = ({ proposalId, freelancerId }) => {
    const [submittingId, setSubmittingId] = useState(null);
    const router = useRouter();

    const markAsSubmitted = async (id, extraData = {}) => {
        setSubmittingId(id);
        try {
            await updateProposalStatus(
                id,
                "submited",
                extraData.submitionLink,
                extraData.submitionMessage
            );

            const res = await fetch(`${API_URL}/updatetaskstatus/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "submited",
                    isSubmit: true,
                    ...extraData,
                }),
            });

            if (!res.ok) {
                throw new Error("Task status update failed");
            }

            await res.json();

            // 👇 notun: profile e submission counter increment kora
            if (freelancerId) {
                await IncrementSubmissionCount(freelancerId);
            }

            router.refresh();
        } catch (error) {
            console.log("submit failed:", error);
            alert("Submit করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
        } finally {
            setSubmittingId(null);
        }
    };

    return <WithForm id={proposalId} onSubmitSuccess={markAsSubmitted} />;
};

export default ActiveProjectActions;