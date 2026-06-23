import { authClient } from "@/lib/auth-client";


// সব client + freelancer user আনার জন্য
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";



export const GetAllUsers = async (page = 1, limite = 10) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        console.error("GetAllUsers failed:", response.status);
        return { users: [], total: 0, pages: 1 };
    }
    return response.json();
};


// Block / Unblock টগল করার জন্য
export const ToggleUserBlock = async (id, isBlocked) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users/${id}/block`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBlocked }),
    });
    if (!response.ok) {
        console.error("ToggleUserBlock failed:", response.status);
        return { success: false, message: "Failed to toggle user block" };
    }
    return response.json();
};


// সব task আনার জন্য
export const GetAllAdminTasks = async (page = 1, limite = 10) => {
    const { data: token } = await authClient.token();
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/tasks?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${token?.token}`,
        },
    });
    if (!response.ok) {
        console.error("GetAllAdminTasks failed:", response.status);
        return { tasks: [], total: 0, pages: 1 };
    }
    return response.json();
};

export const GetAllTransactions = async (page = 1, limite = 10) => {
    const { data: token } = await authClient.token();
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/transactions?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${token?.token}`,
        },
    });
    if (!response.ok) {
        console.error("GetAllTransactions failed:", response.status);
        return { transactions: [], total: 0, pages: 1 };
    }
    return response.json();
};

// Task delete করার জন্য
export const DeleteAdminTask = async (id) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/tasks/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        console.error("DeleteAdminTask failed:", response.status);
        return { success: false, message: "Failed to delete task" };
    }
    return response.json();
};

// Status পরিবর্তন করার জন্য
export const UpdateAdminTaskStatus = async (id, status) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        console.error("UpdateAdminTaskStatus failed:", response.status);
        return { success: false, message: "Failed to update task status" };
    }
    return response.json();
};

// Feature / Unfeature টগল করার জন্য
export const ToggleAdminTaskFeature = async (id, isFeatured) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/tasks/${id}/feature`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured }),
    });
    if (!response.ok) {
        console.error("ToggleAdminTaskFeature failed:", response.status);
        return { success: false, message: "Failed to toggle feature" };
    }
    return response.json();
};

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const GetOverviewUsers = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/users`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        console.error("GetOverviewUsers failed:", response.status);
        return { users: [] };
    }
    return response.json();
};

export const GetOverviewTasks = async () => {
    const response = await fetch(`${API_URL}/admin/tasks`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        console.error("GetOverviewTasks failed:", response.status);
        return { tasks: [] };
    }
    return response.json();
};

export const GetOverviewProposals = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/proposals`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        console.error("GetOverviewProposals failed:", response.status);
        return { proposals: [] };
    }
    return response.json();
};


export const GetOverviewTasksRaw = async () => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/alltask`, {
        method: "GET",
        cache: "no-store",
    });
    if (!response.ok) {
        console.error("GetOverviewTasksRaw failed:", response.status);
        return { tasks: [] };
    }
    return response.json();
};



export const DeleteUser = async (id) => {
    try {
        // স্ল্যাশ চেক করার জন্য ট্রিম করে নিন
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store" // ক্যাশ ডিলিট করে দিন
        });

        const data = await response.json();
        console.log("Server Action Result:", data); // ব্রাউজারের কনসোলে নয়, টার্মিনালে চেক করুন
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        return { success: false, message: "Network error" };
    }
}