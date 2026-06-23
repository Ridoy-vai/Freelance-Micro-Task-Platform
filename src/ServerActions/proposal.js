import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    if (!res.ok) {
        console.error("Postproposals failed:", res.status);
        return { success: false, message: "Failed to post proposal" };
    }
    return res.json();
};

export const GetProposalById = async ({ path, freelancerId, page = 1, limit = 2 }) => {
    try {
        const res = await fetch(
            `${API_URL}/${path}/${freelancerId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("GetProposalById failed:", res.status);
            return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return res.json();
    } catch (error) {
        console.error("GetProposalById error:", error);
        return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
};

export const GetActiveProposals = async ({ freelancerId, page = 1, limit = 10 }) => {
    try {
        const res = await fetch(
            `${API_URL}/myActiveProposals/${freelancerId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("GetActiveProposals failed:", res.status);
            return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return res.json();
    } catch (error) {
        console.error("GetActiveProposals error:", error);
        return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
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

    if (!res.ok) {
        console.error("updateProposalStatus failed:", res.status);
        return { success: false, message: "Failed to update proposal status" };
    }

    const result = await res.json();
    console.log("proposal.js", result);

    return result;
};

export const deleteProposal = async (id) => {
    const res = await fetch(`${API_URL}/proposals/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        console.error("deleteProposal failed:", res.status);
        return { success: false, message: "Failed to delete proposal" };
    }

    const result = await res.json();
    console.log("proposal.js delete:", result);

    return result;
};

export const GetProposalDetails = async (proposalId) => {
    try {
        const res = await fetch(`${API_URL}/proposal-details/${proposalId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("GetProposalDetails failed:", res.status);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("GetProposalDetails error:", error);
        return null;
    }
};


export const GetPendingProposalsByClient = async ({ clientId, page = 1, limit = 10 }) => {
    try {
        const res = await fetch(
            `${API_URL}/pendingProposalsByClient/${clientId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("GetPendingProposalsByClient failed:", res.status);
            return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return res.json();
    } catch (error) {
        console.error("GetPendingProposalsByClient error:", error);
        return { proposals: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
};