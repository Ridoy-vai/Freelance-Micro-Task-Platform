import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FileText, Search, PlusCircle, ExternalLink } from "lucide-react"; // Added ExternalLink icon
import { GetProposalById } from "@/ServerActions/proposal";
import ProposalActions from "@/Dashboardaction/freelancercomponent/ProposalActions";
import { PaginationControlled } from "@/Components/PaginationControlled";
import Link from "next/link";

const MyProposals = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 5;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <p className="text-lg font-semibold text-gray-900">Access Denied</p>
        <p className="text-gray-500 mt-2">Please login to view your submitted proposals.</p>
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
      <div className="flex flex-col items-center justify-center text-center px-6 py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
            <FileText size={40} className="text-blue-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
            <Search size={16} className="text-blue-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Proposals Submitted Yet</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          It looks like you haven't applied for any projects yet. Start exploring available tasks to find your next big opportunity!
        </p>
        <Link 
          href="/tasks"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <PlusCircle size={20} />
          Browse Available Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
        <div>
          <h2 className="font-bold text-xl text-gray-800">My Proposals</h2>
          <p className="text-sm text-gray-500 mt-1">Showing {totalItems} total applications</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Project</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Client</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Budget</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Submission</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {proposalList.map((p) => (
              <tr key={p._id} className="hover:bg-blue-50/30 transition-all duration-150">
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-900 truncate max-w-[180px]">
                    {p.title || "Untitled Project"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.message}</p>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-800">{p.clientname || "Unknown Client"}</p>
                  <p className="text-xs text-gray-400">{p.clientemail || "No Email"}</p>
                </td>

                <td className="px-6 py-5">
                  <p className="font-bold text-gray-900">${p.proposedBudget}</p>
                  <p className="text-[10px] text-gray-400 line-through">Project: ${p.budget}</p>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">{p.estimatedDays} Days</td>

                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    p.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                    p.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status}
                  </span>
                </td>

                {/* NEW SUBMISSION LINK COLUMN */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-blue-600 cursor-pointer hover:underline text-sm font-medium">
                    <span>View Link</span>
                    <ExternalLink size={14} />
                  </div>
                </td>

                <td className="px-6 py-5 text-right">
                  <ProposalActions proposalId={p._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t bg-gray-50/30">
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