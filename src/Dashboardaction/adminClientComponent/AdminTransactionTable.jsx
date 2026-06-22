"use client";

import { useState } from "react";
import { PaginationControlled } from "@/Components/PaginationControlled";
import { Receipt, Copy, Check } from "lucide-react";

const AdminTransactionTable = ({ transactions, currentPage, totalPages, totalItems }) => {
  const [copiedId, setCopiedId] = useState(null);

  const totalRevenue = transactions.reduce(
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

  const handleCopy = async (sessionId) => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopiedId(sessionId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Transactions</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">{totalItems} টি transaction</p>
          <p className="text-sm font-semibold text-green-600">
            এই পেজের মোট: ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {transactions.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">Task</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Freelancer</th>
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
                      <p className="text-sm text-gray-700">{t.Freelancer || "N/A"}</p>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-green-600">${t.price}</span>
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {formatDate(t.createdAt)}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleCopy(t.session_id)}
                        title="Session ID কপি করুন"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 font-mono group"
                      >
                        <span className="truncate max-w-[140px]">{t.session_id}</span>
                        {copiedId === t.session_id ? (
                          <Check size={14} className="text-green-600 shrink-0" />
                        ) : (
                          <Copy size={14} className="shrink-0 opacity-50 group-hover:opacity-100" />
                        )}
                      </button>
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
              itemsPerPage={10}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
            <Receipt size={26} className="text-green-600" />
          </div>
          <p className="text-base font-medium text-gray-900 mb-1.5">
            এখনো কোনো transaction হয়নি
          </p>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            কোনো payment সফলভাবে সম্পন্ন হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionTable;