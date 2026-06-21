"use client";

import { PaginationControlled } from "@/Components/PaginationControlled";
import ConfirmBlockDialog from "@/modals/ConfirmBlockDialog";
import { ToggleUserBlock } from "@/ServerActions/admin";
import { Loader2, ShieldBan, ShieldCheck } from "lucide-react";
import { useState } from "react";

const AdminUserTable = ({ users: initialUsers, currentPage, totalPages, totalItems }) => {
  const [users, setUsers] = useState(initialUsers);
  const [actionId, setActionId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleToggleBlock = async (id, currentStatus) => {
    const nextStatus = !currentStatus;

    try {
      setActionId(id);
      const result = await ToggleUserBlock(id, nextStatus);

      if (result?.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: nextStatus } : u))
        );
      } else {
        alert(result?.message || "Action সফল হয়নি");
      }
    } catch (error) {
      console.error("Error toggling block:", error);
      alert("Server error, আবার চেষ্টা করুন");
    } finally {
      setActionId(null);
      setSelectedUser(null);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">User Management</h2>
        <p className="text-sm text-gray-500">{users.length} জন user</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{u.name || "N/A"}</td>
                  <td className="p-4 text-sm text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedUser(u)}
                        disabled={actionId === u._id}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                          u.isBlocked
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      >
                        {actionId === u._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : u.isBlocked ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <ShieldBan size={14} />
                        )}
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  কোনো user পাওয়া যায়নি।
                </td>
              </tr>
            )}
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

      <ConfirmBlockDialog
        user={selectedUser}
        onConfirm={handleToggleBlock}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default AdminUserTable;