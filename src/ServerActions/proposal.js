import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const { session } = authClient.getSession();
const user = session?.user;
// Get the user from the session data
export const Postproposals = async ({ path, proposal }) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(proposal)
    });
};

export const GetProposalById = async ({ path, freelancerId }) => {
    const res = await fetch(`${API_URL}/${path}/${freelancerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    return res.json()

};

export const updateProposalStatus = async (id, status, submitionLink, submitionMessage) => {
    const res = await fetch(`${API_URL}/task/proposals/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status,
            submitionLink,
            submitionMessage,
            submitDate:
                status === "submited"
                    ? new Date().toISOString().split("T")[0]
                    : null,
        }),
    });

    const result = await res.json();
    console.log("proposal.js", result);

    return result;
};

export const deleteProposal = async (id) => {
    const res = await fetch(`${API_URL}/proposals/${id}`, {
        method: "DELETE",
    });

    const result = await res.json();
    console.log("proposal.js delete:", result);

    return result;
};