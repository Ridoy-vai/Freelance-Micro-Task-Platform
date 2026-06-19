import { authClient } from "@/lib/auth-client";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
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