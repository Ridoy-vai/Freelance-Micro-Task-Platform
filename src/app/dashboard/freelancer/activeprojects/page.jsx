"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WithForm } from "@/modals/freelancerSubmissionModal";
// import { GetProposalById, updateProposalStatus } from "@/ServerActions/proposal";
import { authClient } from "@/lib/auth-client";
import { GetProposalById, updateProposalStatus } from "@/ServerActions/proposal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function MyActiveProjects() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [localProposals, setLocalProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const freelancerId = user.id;
        const result = await GetProposalById({ path: "myProposals", freelancerId });
        setLocalProposals(result || []);
      } catch (error) {
        console.error("Fetch Proposals Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [isPending, user]);

  const activeProposals = localProposals.filter((p) => p.status === "accepted");

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

  if (isPending || loading) {
    return (
      <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
        Loading...
      </div>
    );
  }

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
                <td className="px-6 py-5">
                  <p className="font-semibold">{p.title || "Untitled Project"}</p>
                  <p className="text-xs text-gray-500">{p.message}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-medium">{p.clientname || "Unknown"}</p>
                  <p className="text-xs text-gray-500">{p.clientemail || "No Email"}</p>
                </td>
                <td className="px-6 py-5 font-bold">${p.proposedBudget}</td>
                <td className="px-6 py-5">{p.estimatedDays} Days</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center gap-2 justify-end">
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