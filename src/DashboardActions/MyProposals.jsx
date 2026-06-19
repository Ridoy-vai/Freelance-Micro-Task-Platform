"use client";

export default function MyProposals({ proposals = [] }) {
  if (proposals.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
        কোনো proposal পাঠানো হয়নি।
      </div>
    );
  }

  const statusConfig = {
    pending: {
      label: "Pending",
      class: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    },
    accepted: {
      label: "Accepted",
      class: "bg-green-100 text-green-700 border border-green-200",
    },
    rejected: {
      label: "Rejected",
      class: "bg-red-100 text-red-700 border border-red-200",
    },
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-800">My Proposals</h2>
        <p className="text-sm text-gray-500">
          {proposals.length} টি প্রপোজাল
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Project
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Client
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Budget
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Days
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {proposals.map((p) => {

              return (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-all duration-150"
                >
                  {/* Project */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {p.title || "Untitled Project"}
                      </p>

                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {p.message}
                      </p>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {p.clientName || "Unknown Client"}
                      </p>

                      <p className="text-xs text-gray-500">
                        {p.clientEmail ||
                          (p.ClientId
                            ? `Client ID: ${p.ClientId}`
                            : "No Email")}
                      </p>
                    </div>
                  </td>

                  {/* Budget */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        ${p.proposedBudget}
                      </p>

                      {p.budget && (
                        <p className="text-xs text-gray-500">
                          Client: ${p.budget}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Days */}
                  <td className="px-6 py-5">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      {p.estimatedDays} Days
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full ${status.class}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => {
                        if (p.status === "Pending") {
                          alert(`Proposal: ${p._id}`);
                        }
                      }}
                      disabled={p.status === "Pending"}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${p.status === "Pending"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                      {p.status === "Pending" ? "wating..." : "View"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}