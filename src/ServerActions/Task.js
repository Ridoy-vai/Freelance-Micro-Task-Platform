import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const { session } = authClient.getSession();
const user = session?.user;
// Get the user from the session data
export const PostTask = ({ path, taskData }) => {
    fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(taskData)
    });
};

// export const GetAllTasks = async (path, limit, skip) => {
//     const response = await fetch(`${API_URL}/${path}?limit=${limit}&skip=${skip}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${user?.token}`
//         }
//     });
//     return response.json();
// };








export const GetAllTasks = async (path, limit, skip, search = "", category = "") => {
    const params = new URLSearchParams({
        limit,
        skip,
    });

    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const response = await fetch(`${API_URL}/${path}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
        }
    });
    return response.json();
};





















export const GetTasksByUser = async (path, clientId) => {
    const response = await fetch(`${API_URL}/${path}/${clientId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
        }
    });
    return response.json();
};

export const GetTasksById = async (path, id) => {
    const response = await fetch(`${API_URL}/${path}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": `Bearer ${token}`
        }
    });

    return response.json();
};

export const UpdateTask = async ({ path, taskData }) => {
    const response = await fetch(`${API_URL}/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(taskData)
    });
    return response.json();
};

export const DeleteTask = async (path) => {
    const response = await fetch(`${API_URL}/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
        }
    });
    return response.json();
};
