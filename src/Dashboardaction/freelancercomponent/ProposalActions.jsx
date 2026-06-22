"use client";

import { deleteProposal } from "@/ServerActions/proposal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ProposalActions = ({ proposalId }) => {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "আপনি কি নিশ্চিতভাবে এই proposal টি ডিলিট করতে চান?"
        );

        if (!confirmDelete) return;

        try {
            setDeleting(true);

            const data = await deleteProposal(proposalId);

            if (data?.success || data?.deletedCount > 0) {
                router.refresh();
            } else {
                alert(data?.message || "Proposal delete করা যায়নি");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Server error, আবার চেষ্টা করুন");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
        >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
            Delete
        </button>
    );
};

export default ProposalActions;