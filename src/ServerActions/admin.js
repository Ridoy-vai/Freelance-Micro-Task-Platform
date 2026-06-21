// সব client + freelancer user আনার জন্য
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";



export const GetAllUsers = async (page = 1, limite = 8) => {
    const response = await fetch(`${API_URL}/admin/users?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};


// Block / Unblock টগল করার জন্য
export const ToggleUserBlock = async (id, isBlocked) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/block`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBlocked }),
    });
    return response.json();
};

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// সব task আনার জন্য
export const GetAllAdminTasks = async (page = 1, limite = 3) => {
    const response = await fetch(`${API_URL}/admin/tasks?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

export const GetAllTransactions = async (page = 1, limite = 10) => {
    const response = await fetch(`${API_URL}/admin/transactions?page=${page}&limite=${limite}`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

// Task delete করার জন্য
export const DeleteAdminTask = async (id) => {
    const response = await fetch(`${API_URL}/admin/tasks/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

// Status পরিবর্তন করার জন্য
export const UpdateAdminTaskStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/admin/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    return response.json();
};

// Feature / Unfeature টগল করার জন্য
export const ToggleAdminTaskFeature = async (id, isFeatured) => {
    const response = await fetch(`${API_URL}/admin/tasks/${id}/feature`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured }),
    });
    return response.json();
};

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const GetOverviewUsers = async () => {
    const response = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

export const GetOverviewTasks = async () => {
    const response = await fetch(`${API_URL}/admin/tasks`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

export const GetOverviewProposals = async () => {
    const response = await fetch(`${API_URL}/admin/proposals`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};


export const GetOverviewTasksRaw = async () => {
    const response = await fetch(`${API_URL}/alltask`, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};

