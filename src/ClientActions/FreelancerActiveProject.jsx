"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WithForm } from "@/modals/freelancerSubmissionModal";
import { updateProposalStatus } from "@/ServerActions/proposal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function MyActiveProjects({ proposals = [] }) {
  const router = useRouter();

  // local state রাখলাম যাতে modal/button click এর সাথে সাথে optimistic update দেখানো যায়
  const [localProposals, setLocalProposals] = useState(proposals);
  const [submittingId, setSubmittingId] = useState(null);

  const activeProposals = localProposals.filter((p) => p.status === "accepted");

  // একটা single helper — যেখান থেকেই update হোক (button বা modal), এটাই কল হবে
  const markAsSubmitted = async (id, extraData = {}) => {
    setSubmittingId(id);
    try {
      // ১. proposal status update (ServerAction) — link/message সহ পাঠালাম
      await updateProposalStatus(
        id,
        "submited",
        extraData.submitionLink,
        extraData.submitionMessage
      );

      // ২. task status update (Express API)
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

      const taskStatus = await res.json();
      console.log("task status updated:", taskStatus);

      setLocalProposals((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: "submited" } : p))
      );

      router.refresh();
    } catch (error) {
      console.log("submit failed:", error);
      alert("Submit করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setSubmittingId(null);
    }
  };

  if (activeProposals.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
        কোনো active proposal নেই।
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-800">Active Proposals</h2>
        <p className="text-sm text-gray-500">
          {activeProposals.length} টি active proposal
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activeProposals.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                {/* Project */}
                <td className="px-6 py-5">
                  <p className="font-semibold">{p.title || "Untitled Project"}</p>
                  <p className="text-xs text-gray-500">{p.message}</p>
                </td>
                {/* Client */}
                <td className="px-6 py-5">
                  <p className="font-medium">{p.clientname || "Unknown"}</p>
                  <p className="text-xs text-gray-500">{p.clientemail || "No Email"}</p>
                </td>
                {/* Budget */}
                <td className="px-6 py-5 font-bold">${p.proposedBudget}</td>
                {/* Days */}
                <td className="px-6 py-5">{p.estimatedDays} Days</td>
                {/* Status */}
                <td className="px-6 py-5">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
                {/* Action */}
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    {/* <button
                      onClick={() => markAsSubmitted(p._id)}
                      disabled={submittingId === p._id}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submittingId === p._id ? "Submitting..." : "Submit"}
                    </button> */}
                    <WithForm id={p._id} onSubmitSuccess={markAsSubmitted} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}