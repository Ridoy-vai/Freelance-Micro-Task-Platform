"use client";

export default function MyActiveProjects({ proposals = [] }) {
  const activeProposals = proposals.filter(
    (p) => p.status === "remove"
  );

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
        <h2 className="font-bold text-xl text-gray-800">
          Active Proposals
        </h2>
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
                  <p className="font-semibold">
                    {p.title || "Untitled Project"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.message}
                  </p>
                </td>

                {/* Client */}
                <td className="px-6 py-5">
                  <p className="font-medium">
                    {p.clientName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.clientEmail || "No Email"}
                  </p>
                </td>

                {/* Budget */}
                <td className="px-6 py-5 font-bold">
                  ${p.proposedBudget}
                </td>

                {/* Days */}
                <td className="px-6 py-5">
                  {p.estimatedDays} Days
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-5 text-right">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View
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