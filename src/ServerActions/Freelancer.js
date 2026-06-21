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