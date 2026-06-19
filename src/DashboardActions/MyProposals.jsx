"use client";

export default function MyProposals({ proposals = [] }) {
  if (proposals.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center text-gray-400">
        কোনো proposal পাঠানো হয়নি।
      </div>
    );
  }

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <h2 className="font-bold text-lg p-5 pb-3">My Proposals</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-y">
              <th className="px-5 py-3 text-sm font-semibold text-gray-600">
                Message
              </th>
              <th className="px-5 py-3 text-sm font-semibold text-gray-600">
                Budget
              </th>
              <th className="px-5 py-3 text-sm font-semibold text-gray-600">
                Estimated Days
              </th>
              <th className="px-5 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr
                key={p._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 text-sm text-gray-700 max-w-xs truncate">
                  {p.message}
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                  ${p.proposedBudget}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  {p.estimatedDays} days
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      statusColor[p.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}