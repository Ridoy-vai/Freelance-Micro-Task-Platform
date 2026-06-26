"use client";

import React, { useState } from "react";
import { Calendar, DollarSign, CheckCircle, XCircle, Inbox } from "lucide-react";
import { toast } from "react-toastify";

const MyProposals = ({ initialProposals = [] }) => {
  const [proposals, setProposals] = useState(initialProposals);

  // Marks a proposal as accepted in local state.
  // TODO: replace with a real PATCH/POST request to persist the status change in MongoDB
  const handleAccept = (id) => {
    setProposals((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "accepted" } : p))
    );
    toast.success("Proposal accepted");
  };

  // Marks a proposal as rejected in local state.
  // TODO: replace with a real PATCH/POST request to persist the status change in MongoDB
  const handleReject = (id) => {
    setProposals((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p))
    );
    toast.success("Proposal rejected");
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
              <th className="p-4 text-sm font-semibold text-gray-600">Freelancer</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Task Info</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Budget</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Deadline</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {proposals.length > 0 ? (
              proposals.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{p.freelancer}</div>
                    <div className="text-xs text-gray-500 truncate w-40">{p.message}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-medium">{p.title}</div>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-gray-800">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-green-600" />
                      {p.budget}
                    </div>
                  </td>

                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {p.deadline}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : p.status === "accepted"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAccept(p._id)}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition"
                      >
                        <CheckCircle size={18} />
                      </button>

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
                <td colSpan="6" className="py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                      <Inbox size={28} className="text-gray-300" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-700">
                      No proposals found
                    </h3>
                    <p className="mt-1 max-w-xs text-sm text-gray-400">
                      Proposals submitted by freelancers will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProposals;