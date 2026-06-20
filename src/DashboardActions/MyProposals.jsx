"use client";

import { deleteProposal } from "@/ServerActions/proposal";
import { useState } from "react";

const REACT_APP_PUBLICK_API_URL = process.env.REACT_APP_PUBLICK_API_URL;

export default function MyProposals({ proposals = [] }) {
  const [proposalList, setProposalList] = useState(proposals);

  const handelDelete = async (id) => {
    try {
      console.log("Delete ID:", id);
      // console.log("api url", API_URL)
      deleteProposal(id);
      // const res = await fetch(
      //   // `http://localhost:5000/deletefreelanceproposal/${id}`,
      //   `${REACT_APP_PUBLICK_API_URL}deletefreelanceproposal/${id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      // const data = await res.json();

      // console.log("Delete Response:", data);

      // if (data.deletedCount > 0) {
      //   setProposalList((prev) =>
      //     prev.filter((item) => item._id !== id)
      //   );
      // }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (proposalList.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">
        কোনো proposal পাঠানো হয়নি।
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-800">My Proposals</h2>
        <p className="text-sm text-gray-500">
          {proposalList.length} টি প্রপোজাল
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {proposalList.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-5">
                  <p className="font-semibold">
                    {p.title || "Untitled Project"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {p.message}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p>{p.clientname || "Unknown Client"}</p>
                  <p className="text-xs text-gray-500">
                    {p.clientemail || "No Email"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <p className="font-bold">${p.budget}</p>
                  <p className="text-xs text-gray-500">
                    Demand: ${p.proposedBudget}
                  </p>
                </td>

                <td className="px-6 py-5">
                  {p.estimatedDays} Days
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-gray-100">
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handelDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}