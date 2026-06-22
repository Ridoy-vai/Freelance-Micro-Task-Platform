import { PaginationControlled } from "@/Components/PaginationControlled";
import ActiveProjectActions from "@/Dashboardaction/freelancercomponent/ActiveProjectActions";
import { auth } from "@/lib/auth";
import { GetActiveProposals } from "@/ServerActions/proposal";
import { headers } from "next/headers";
import { Briefcase, Zap, ArrowRight } from "lucide-react"; // Added modern icons
import Link from "next/link";

const MyActiveProjects = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 10;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // --- ACCESS DENIED STATE ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-8 py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <p className="text-lg font-semibold text-gray-900">Access Denied</p>
        <p className="text-gray-500 mt-2">Please login to view your active projects.</p>
      </div>
    );
  }

  const result = await GetActiveProposals({
    freelancerId: user.id,
    page: currentPage,
    limit: itemsPerPage,
  });

  const activeProposals = Array.isArray(result?.proposals) ? result.proposals : [];
  const totalPages = result?.totalPages || 1;
  const totalItems = result?.totalItems || 0;

  // --- BEAUTIFIED EMPTY STATE ---
  if (activeProposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-6 py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center rotate-3">
            <Briefcase size={36} className="text-green-600 -rotate-3" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-sm">
            <Zap size={16} className="text-amber-600 fill-amber-600" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Active Projects
        </h3>

        <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          You don't have any ongoing projects at the moment. Once a client
          accepts your proposal, it will appear here for you to manage.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard/proposals"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
          >
            Check Sent Proposals
          </Link>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl transition-all duration-200 shadow-md active:scale-95"
          >
            Browse New Tasks
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
        <div>
          <h2 className="font-bold text-xl text-gray-800">Active Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            You are currently working on {totalItems} projects
          </p>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
          In Progress
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Project</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Client</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Budget</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Timeline</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activeProposals.map((p) => (
              <tr key={p._id} className="hover:bg-green-50/20 transition-all duration-150">
                <td className="px-6 py-5">
                  <p className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {p.title || "Untitled Project"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">
                    "{p.message}"
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-gray-800">{p.clientname || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{p.clientemail || "No Email"}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-900">${p.proposedBudget}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Fixed Price</p>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  <div className="flex flex-col">
                    <span>{p.estimatedDays} Days</span>
                    <span className="text-[10px] text-gray-400 tracking-tight">Delivery Time</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <ActiveProjectActions 
                    proposalId={p._id} 
                    freelancerId={p.FreelancerId} 
                  />
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

export default MyActiveProjects;