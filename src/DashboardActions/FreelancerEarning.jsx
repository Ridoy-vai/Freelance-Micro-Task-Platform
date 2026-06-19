"use client";

export default function EarningsPage({ proposals = [] }) {
    // শুধু accepted proposal গুলো
    const earnings = proposals.filter(
        (proposal) => proposal.status === "submited"
    );

    console.log("Accepted Earnings:", earnings);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Earnings</h1>

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
                        {earnings.length > 0 ? (
                            earnings.map((e) => (
                                <tr
                                    key={e._id || e.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {e.title || e.taskTitle}
                                    </td>

                                    <td className="px-6 py-4">
                                        {e.ClientId || e.clientName}
                                    </td>

                                    <td className="px-6 py-4 font-bold text-green-600">
                                        ${e.proposedBudget || e.payableAmount || 0}
                                    </td>

                                    <td className="px-6 py-4">
                                        {e.date || "NOT SUBMIT"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No accepted earnings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}