import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// একটা reusable helper - প্রতিটা ফাংশনে আলাদা করে token নেওয়ার বদলে এটা ব্যবহার করো
const getAuthHeader = async () => {
    const { data: token } = await authClient.token();
    return { "Authorization": `Bearer ${token?.token}` };
};

export const PostTask = async ({ path, taskData }) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader,
        },
        body: JSON.stringify(taskData)
    });
    return response.json();
};

export const GetAllTasks = async (path, limit, skip, search = "", category = "") => {
    const params = new URLSearchParams({ limit, skip });
    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/${path}?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...authHeader,
        }
    });
    return response.json();
};

export const GetTasksByUser = async (path, clientId, page = 1, limit = 10) => {
    // "use server"
    const token = await auth.api.getSession({
        headers: await headers()
    })
    // const tokenResult = await authClient.token();
    // console.log("Full token result:", tokenResult);
    // const { data: token } = tokenResult;
    console.log("token.data:", token);
    // ...
    try {
        const response = await fetch(
            `${API_URL}/${path}/${clientId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token?.token}`
                },
                cache: "no-store",
            }
        );
        // ...

        if (!response.ok) {
            console.error("GetTasksByUser failed:", response.status);
            return { tasks: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return response.json();
    } catch (error) {
        console.error("GetTasksByUser error:", error);
        return { tasks: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
};

export const GetTasksById = async (path, id) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/${path}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeader,
        }
    });
    return response.json();
};

export const UpdateTask = async ({ path, taskData }) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader,
        },
        body: JSON.stringify(taskData)
    });
    return response.json();
};

export const DeleteTask = async (path) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...authHeader,
        }
    });
    return response.json();
};