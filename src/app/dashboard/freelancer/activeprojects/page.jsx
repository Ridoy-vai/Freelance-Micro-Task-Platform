import { PaginationControlled } from "@/Components/PaginationControlled";
import ActiveProjectActions from "@/Dashboardaction/freelancercomponent/ActiveProjectActions";
import { auth } from "@/lib/auth";
import { GetActiveProposals } from "@/ServerActions/proposal";
import { headers } from "next/headers";

const MyActiveProjects = async ({ searchParams }) => {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const itemsPerPage = 10;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
                Please login to view your active proposals.
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
                    {totalItems} টি active proposal
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
                                        <ActiveProjectActions proposalId={p._id} freelancerId={p.FreelancerId} />
                                    </div>
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

export default MyActiveProjects;