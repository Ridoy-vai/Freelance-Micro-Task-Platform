"use client";

import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, CheckCircle, XCircle, Loader2 } from "lucide-react";

const ManageProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fake API (later MongoDB replace)
  useEffect(() => {
    const data = [
      {
        _id: "1",
        freelancer: "Rahim Ahmed",
        title: "Video Editing",
        category: "Design",
        budget: 120,
        deadline: "2026-06-27",
        message: "I can deliver fast and high quality work",
        status: "pending",
      },
      {
        _id: "2",
        freelancer: "Karim Khan",
        title: "Website Design",
        category: "Web Dev",
        budget: 250,
        deadline: "2026-06-30",
        message: "React expert with 3 years experience",
        status: "accepted",
      },
      {
        _id: "3",
        freelancer: "Nusrat Jahan",
        title: "Content Writing",
        category: "Writing",
        budget: 80,
        deadline: "2026-07-01",
        message: "SEO optimized content writer",
        status: "rejected",
      },
    ];

    setTimeout(() => {
      setProposals(data);
      setIsLoading(false);
    }, 500);
  }, []);

  // Accept
  const handleAccept = (id) => {
    setProposals((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status: "accepted" } : p
      )
    );
  };

  // Reject
  const handleReject = (id) => {
    setProposals((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, status: "rejected" } : p
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">
          Manage Proposals
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Freelancer
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Task Info
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Budget
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
            {proposals.length > 0 ? (
              proposals.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Freelancer */}
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {p.freelancer}
                    </div>
                    <div className="text-xs text-gray-500 truncate w-40">
                      {p.message}
                    </div>
                  </td>

                  {/* Task Info */}
                  <td className="p-4">
                    <div className="font-medium">{p.title}</div>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </td>

                  {/* Budget */}
                  <td className="p-4 font-semibold text-gray-800">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-green-600" />
                      {p.budget}
                    </div>
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

                  {/* Actions */}
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
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No proposals found.
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