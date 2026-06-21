"use client";

import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { GetProposalById } from "@/ServerActions/proposal";
// import { GetProposalById } from "@/ServerActions/proposal";

export default function EarningsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setProposals(result || []);
      } catch (error) {
        console.error("Fetch Proposals Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [isPending, user]);

  // শুধু submited proposal গুলো
  const earnings = proposals.filter(
    (proposal) => proposal.status === "submited"
  );

  const totalEarnings = earnings.reduce(
    (sum, e) => sum + Number(e.proposedBudget || e.payableAmount || 0),
    0
  );

  if (isPending || loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Earnings</h1>

      {earnings.length > 0 ? (
        <div className="bg-white border rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">Task Title</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Amount Made</th>
                <th className="px-6 py-4">Completion Date</th>
              </tr>
            </thead>

            <tbody>
              {earnings.map((e) => (
                <tr key={e._id || e.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {e.title || e.taskTitle}
                  </td>

                  <td className="px-6 py-4">
                    {e.clientname || e.ClientId || e.clientName}
                  </td>

                  <td className="px-6 py-4 font-bold text-green-600">
                    ${e.proposedBudget || e.payableAmount || 0}
                  </td>

                  <td className="px-6 py-4">{e.submitDate || "NOT SUBMIT"}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-gray-50 border-t">
                <td colSpan="2" className="px-6 py-4 font-semibold text-right">
                  Total
                </td>
                <td className="px-6 py-4 font-bold text-green-600">
                  ${totalEarnings}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-8 py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
            <DollarSign size={26} className="text-green-600" />
          </div>
          <p className="text-base font-medium text-gray-900 mb-1.5">
            এখনো কোনো earnings নেই
          </p>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            আপনার কোনো task এখনো সাবমিট হয়নি। কোনো task সাবমিট করার পর
            আপনার earnings এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </div>
  );
}