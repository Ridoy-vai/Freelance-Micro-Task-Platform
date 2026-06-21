"use client";

import { authClient } from "@/lib/auth-client";
import { deleteProposal, GetProposalById } from "@/ServerActions/proposal";
// import { deleteProposal, GetProposalById } from "@/ServerActions/proposal";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function MyProposals() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [proposalList, setProposalList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProposals = async () => {
      try {
        const result = await GetProposalById({
          path: "myProposals",
          freelancerId: user.id,
        });
        setProposalList(result || []);
      } catch (error) {
        console.error("Fetch Proposals Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [isPending, user]);

  const handelDelete = async (id) => {
    try {
      console.log("Delete ID:", id);

      const data = await deleteProposal(id);

      console.log("Delete Response:", data);

      if (data?.success || data?.deletedCount > 0) {
        setProposalList((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data?.message || "Proposal delete করা যায়নি");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-500">
        Loading...
      </div>
    );
  }

  if (proposalList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-16 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <FileText size={26} className="text-blue-600" />
        </div>
        <p className="text-base font-medium text-gray-900 mb-1.5">
          কোনো proposal পাঠানো হয়নি
        </p>
        <p className="text-sm text-gray-500 mb-5 max-w-xs leading-relaxed">
          আপনি এখনো কোনো task-এ proposal সাবমিট করেননি। কাজ খুঁজে proposal
          পাঠালে এখানে দেখা যাবে।
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-800">My Proposals</h2>
        <p className="text-sm text-gray-500">
          {proposalList.length} টি প্রপোজাল
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4">Submited</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {proposalList.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-5">
                  <p className="font-semibold">
                    {p.title || "Untitled Project"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{p.message}</p>
                </td>

                <td className="px-6 py-5">
                  <p>{p.clientname || "Unknown Client"}</p>
                  <p className="text-xs text-gray-500">
                    {p.clientemail || "No Email"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="font-bold">${p.budget}</p>
                  <p className="text-xs text-gray-500">
                    Demand: ${p.proposedBudget}
                  </p>
                </td>

                <td className="px-6 py-5">{p.estimatedDays} Days</td>

                <td className="px-6 py-5">
                  <p className="font-bold">${p.budget}</p>
                  <p className="text-xs text-gray-500">
                    Demand: ${p.proposedBudget}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-gray-100">
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handelDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}