"use client";

import { PaginationControlled } from "@/Components/PaginationControlled";
import ConfirmDeleteDialog from "@/modals/Confirmdeletedialog ";
import {
  DeleteAdminTask,
  UpdateAdminTaskStatus,
  ToggleAdminTaskFeature,
} from "@/ServerActions/admin";
import { Loader2, Star, Trash2 } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = ["open", "booked", "submited"];

const AdminTaskTable = ({ tasks: initialTasks, currentPage, totalPages, totalItems }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [actionId, setActionId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      setActionId(id);
      const result = await DeleteAdminTask(id);

      if (result?.success) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert(result?.message || "Task delete করা যায়নি");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Server error, আবার চেষ্টা করুন");
    } finally {
      setActionId(null);
      setTaskToDelete(null);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setActionId(id);
      const result = await UpdateAdminTaskStatus(id, status);

      if (result?.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status } : t))
        );
      } else {
        alert(result?.message || "Status পরিবর্তন করা যায়নি");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Server error, আবার চেষ্টা করুন");
    } finally {
      setActionId(null);
    }
  };

  const handleToggleFeature = async (id, currentFeatured) => {
    const nextFeatured = !currentFeatured;

    try {
      setActionId(id);
      const result = await ToggleAdminTaskFeature(id, nextFeatured);

      if (result?.success) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, isFeatured: nextFeatured } : t
          )
        );
      } else {
        alert(result?.message || "Feature পরিবর্তন করা যায়নি");
      }
    } catch (error) {
      console.error("Error toggling feature:", error);
      alert("Server error, আবার চেষ্টা করুন");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Task Management</h2>
        <p className="text-sm text-gray-500">{tasks.length} টি task</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Budget</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                Featured
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500 truncate w-40">
                      {task.description}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {task.category}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-gray-800">${task.budget}</td>

                  <td className="p-4 text-sm text-gray-600">
                    {task.clientname || "N/A"}
                  </td>

                  <td className="p-4">
                    <select
                      value={task.status}
                      disabled={actionId === task._id}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1.5 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:ring-2 ring-blue-100 disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleToggleFeature(task._id, task.isFeatured)}
                        disabled={actionId === task._id}
                        title={task.isFeatured ? "Unfeature this task" : "Feature this task"}
                        className={`p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${task.isFeatured
                          ? "text-yellow-500 hover:bg-yellow-50"
                          : "text-gray-300 hover:bg-gray-50 hover:text-yellow-400"
                          }`}
                      >
                        <Star size={18} fill={task.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setTaskToDelete(task)}
                        disabled={actionId === task._id}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionId === task._id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  কোনো task পাওয়া যায়নি।
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

      <ConfirmDeleteDialog
        item={taskToDelete}
        title="Task স্থায়ীভাবে ডিলিট করবেন?"
        itemLabel={taskToDelete?.title}
        onConfirm={handleDelete}
        onClose={() => setTaskToDelete(null)}
      />
    </div>
  );
};

export default AdminTaskTable;