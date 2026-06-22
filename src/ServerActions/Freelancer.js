const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// User-এর সম্পূর্ণ data আনার জন্য
export const GetUserById = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

// Freelancer profile update করার জন্য
export const UpdateFreelancerProfile = async (id, payload) => {
    const response = await fetch(`${API_URL}/users/${id}/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return response.json();
};

export const GetFreelancerTransactions = async ({ freelancerId, page = 1, limit = 10 }) => {
    try {
        const res = await fetch(
            `${API_URL}/myFreelancerTransactions/${freelancerId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("GetFreelancerTransactions failed:", res.status);
            return { transactions: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return res.json();
    } catch (error) {
        console.error("GetFreelancerTransactions error:", error);
        return { transactions: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
};

export const IncrementSubmissionCount = async (freelancerId) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${freelancerId}/increment-submission`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!res.ok) {
            console.error("IncrementSubmissionCount failed:", res.status);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error("IncrementSubmissionCount error:", error);
        return null;
    }
};

export const UpdateUserProfile = async (userId, payload) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("UpdateUserProfile failed:", data.message);
            return { success: false, message: data.message };
        }

        return data;
    } catch (error) {
        console.error("UpdateUserProfile error:", error);
        return { success: false, message: "Server error" };
    }
};