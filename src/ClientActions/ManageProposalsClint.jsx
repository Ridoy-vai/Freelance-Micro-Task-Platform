// src/ClientActions/ManageProposals.jsx
"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

const ManageProposals = ({ proposals: myproposals = [] }) => {
  const [proposals, setProposals] = useState(myproposals);

  // শুধু pending proposals filter করা হচ্ছে
  const pendingProposals = proposals.filter((p) => p.status === "pending");

  // Accept
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/task/proposals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Failed to update proposal status:", result.message);
        return;
      }

      // UI update
      setProposals((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: "accepted" } : p))
      );
    } catch (error) {
      console.log("Error accepting proposal:", error);
    }

    try {
      const res = await fetch(`http://localhost:5000/proposalTaskid/${id}`);
      const data = await res.json();

      const taskId = data.taskId;
      console.log("task id in task", taskId);

      const respons = await fetch(
        `http://localhost:5000/updatetaskstatus/${taskId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "booked" }),
        }
      );
      const taskstatus = await respons.json();

      console.log("resul update task", taskstatus);
    } catch (error) {
      console.log(error);
    }
  };

  // Reject
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/task/proposals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Failed to update proposal status:", result.message);
        return;
      }

      // UI update
      setProposals((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p))
      );

      console.log("Rejected successfully:", result);
    } catch (error) {
      console.log("Error rejecting proposal:", error);
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Manage Proposals</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Task</th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Freelancer
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Budget
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Est. Days
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Deadline
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {pendingProposals.length > 0 ? (
              pendingProposals.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Task */}
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{p.title}</div>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </td>

                  {/* Freelancer */}
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {p.Freelancer}
                    </div>
                    <div className="text-xs text-gray-500 truncate w-40">
                      {p.message}
                    </div>
                  </td>

                  {/* Budget */}
                  <td className="p-4">
                    <div className="text-sm text-gray-500">
                      Client:{" "}
                      <span className="font-semibold text-gray-700">
                        ${p.budget}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Freelancer:{" "}
                      <span className="font-semibold">${p.proposedBudget}</span>
                    </div>
                  </td>

                  {/* Estimated Days */}
                  <td className="p-4 text-sm text-gray-600">
                    {p.estimatedDays} days
                  </td>

                  {/* Deadline */}
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {p.deadline}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : p.status === "accepted"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {/* Accept Button */}
                      <form action={'/api/checkout-session'} method="POST">
                        <button
                        type="submit"
                          // onClick={() => handleAccept(p._id)}
                          className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition"
                        >
                          <CheckCircle size={18} />
                        </button>
                      </form>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleReject(p._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No pending proposals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProposals;