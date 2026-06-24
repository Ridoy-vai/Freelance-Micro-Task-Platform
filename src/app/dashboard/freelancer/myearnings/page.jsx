import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Receipt } from "lucide-react";
import { GetFreelancerTransactions } from "@/ServerActions/Freelancer";
import { PaginationControlled } from "@/Components/PaginationControlled";
import { requireRole } from "@/lib/role-check-access";

export const dynamic = 'force-dynamic';

const page = async ({ searchParams }) => {
    await requireRole(["freelancer"]);
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
                Please login to view your transactions.
            </div>
        );
    }

    const result = await GetFreelancerTransactions({
        freelancerId: user.id,
        page: currentPage,
        limit: itemsPerPage,
    });

    const transactions = Array.isArray(result?.transactions) ? result.transactions : [];
    console.log(transactions,"to earning page")
    const totalPages = result?.totalPages || 1;
    const totalItems = result?.totalItems || 0;

    const totalEarning = transactions.reduce(
        (sum, t) => sum + (Number(t.price) || 0),
        0
    );

    const formatDate = (dateValue) => {
        if (!dateValue) return "N/A";
        const date = new Date(dateValue);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">My Earnings</h2>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{totalItems} টি transaction</p>
                    <p className="text-sm font-semibold text-green-600">
                        এই পেজের মোট: ${totalEarning.toLocaleString()}
                    </p>
                </div>
            </div>

            {transactions.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Task</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                                    <th className="p-4 text-sm font-semibold text-gray-600">Session ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <p className="font-medium text-gray-900">
                                                {t.title || "Untitled Task"}
                                            </p>
                                        </td>

                                        <td className="p-4">
                                            <p className="text-sm text-gray-700">{t.Clintemail || "N/A"}</p>
                                        </td>

                                        <td className="p-4">
                                            <span className="font-bold text-green-600">${t.price}</span>
                                        </td>

                                        <td className="p-4 text-sm text-gray-500">
                                            {formatDate(t.createdAt)}
                                        </td>

                                        <td className="p-4">
                                            <span className="text-xs text-gray-400 font-mono truncate max-w-[160px] inline-block">
                                                {t.session_id}
                                            </span>
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
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center px-8 py-16">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
                        <Receipt size={26} className="text-green-600" />
                    </div>
                    <p className="text-base font-medium text-gray-900 mb-1.5">
                        এখনো কোনো earning হয়নি
                    </p>
                    <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                        কোনো task এর payment সম্পন্ন হলে এখানে দেখা যাবে।
                    </p>
                </div>
            )}
        </div>
    );
};

export default page;