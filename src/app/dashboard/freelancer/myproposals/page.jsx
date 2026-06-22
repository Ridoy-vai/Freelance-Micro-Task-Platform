import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FileText } from "lucide-react";
import { GetProposalById } from "@/ServerActions/proposal";
import ProposalActions from "@/Dashboardaction/freelancercomponent/ProposalActions";
import { PaginationControlled } from "@/Components/PaginationControlled";

const MyProposals = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 2;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-16 bg-gray-50 rounded-2xl border border-gray-200">
        <p className="text-base font-medium text-gray-900">
          Please login to view your proposals.
        </p>
      </div>
    );
  }

  const result = await GetProposalById({
    path: "myProposals",
    freelancerId: user.id,
    page: currentPage,
    limit: itemsPerPage,
  });

  const proposalList = Array.isArray(result?.proposals) ? result.proposals : [];
  const totalPages = result?.totalPages || 1;
  const totalItems = result?.totalItems || 0;

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
          {totalItems} টি প্রপোজাল
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
                  <ProposalActions proposalId={p._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t">
        <PaginationControlled
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default MyProposals;