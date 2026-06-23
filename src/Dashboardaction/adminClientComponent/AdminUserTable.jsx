"use client";

import { PaginationControlled } from "@/Components/PaginationControlled";
import ConfirmBlockDialog from "@/modals/ConfirmBlockDialog";
import { DeleteUser, ToggleUserBlock } from "@/ServerActions/admin";
import { Loader2, ShieldBan, ShieldCheck, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminUserTable = ({ users: initialUsers, currentPage, totalPages, totalItems }) => {
  const [users, setUsers] = useState(initialUsers);
  const [actionId, setActionId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // ব্লকের জন্য মোডাল স্টেট থাকবে

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // ব্লক/আনব্লক লজিক (মোডাল এর মাধ্যমে)
  const handleToggleBlock = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    try {
      setActionId(id);
      const result = await ToggleUserBlock(id, nextStatus);
      if (result?.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: nextStatus } : u))
        );
        toast.success(result.message);
      } else {
        toast.error(result?.message || "Action failed");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setActionId(null);
      setSelectedUser(null);
    }
  };

  // ডিলিট লজিক (কোনো কাস্টম মোডাল নেই, সরাসরি ব্রাউজার কনফার্মেশন)
  const handleDeleteUser = async (user) => {
    console.log(user, "delet user")
    // কনফার্মেশন ছাড়া ডিলিট করা বিপজ্জনক, অন্তত ব্রাউজার কনফার্মেশন অন রাখা ভালো
    // if (!window.confirm(`Delete ${user.name} permanently?`)) return;

    try {
      setActionId(user._id);
      const id = user._id
      const result = await DeleteUser(id);

      console.log("Frontend Delete Result:", result); // এখানে চেক করুন success true কি না

      if (result?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
        toast.success(result.message || "User deleted successfully");
      } else {
        toast.error(result?.message || "Delete failed from server");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setActionId(null);
    }
  };
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">User Management</h2>
        <p className="text-sm text-gray-500">{totalItems} Total Users</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase text-gray-600">Name</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-600">Email</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-600">Role</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-600">Status</th>
              <th className="p-4 text-xs font-semibold uppercase text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{u.name}</td>
                <td className="p-4 text-sm text-gray-600">{u.email}</td>
                <td className="p-4 text-sm font-semibold uppercase text-gray-400">{u.role}</td>

                {/* স্ট্যাটাস ব্যাজ */}
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}>
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center items-center gap-3">
                    {/* ব্লক বাটন: স্ট্যাটাস অনুযায়ী কালার চেঞ্জ হবে */}
                    <button
                      onClick={() => setSelectedUser(u)}
                      disabled={actionId === u._id}
                      className={`p-2 rounded-lg transition-colors ${u.isBlocked
                        ? "text-green-600 hover:bg-green-50" // ব্লক থাকলে আনব্লক করার জন্য সবুজ
                        : "text-amber-500 hover:bg-amber-50" // একটিভ থাকলে ব্লক করার জন্য হলুদ/কমলা
                        }`}
                      title={u.isBlocked ? "Unblock User" : "Block User"}
                    >
                      {actionId === u._id && selectedUser?._id === u._id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : u.isBlocked ? (
                        <ShieldCheck size={20} />
                      ) : (
                        <ShieldBan size={20} />
                      )}
                    </button>

                    {/* ডিলিট বাটন: কোনো মোডাল নেই, সরাসরি ফাংশন কল */}
                    <button
                      onClick={() => handleDeleteUser(u)}
                      disabled={actionId === u._id}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Permanently"
                    >
                      {actionId === u._id && !selectedUser ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* শুধুমাত্র ব্লক ডায়ালগ রাখা হয়েছে */}
      <ConfirmBlockDialog
        user={selectedUser}
        onConfirm={handleToggleBlock}
        onClose={() => setSelectedUser(null)}
      />

      <div className="p-4 border-t">
        <PaginationControlled currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={10} />
      </div>
    </div>
  );
};

export default AdminUserTable;