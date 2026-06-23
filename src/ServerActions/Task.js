const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PostTask = async ({ path, taskData }) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        console.error("PostTask failed:", response.status);
        return { success: false, message: "Failed to post task" };
    }
    return response.json();
};

export const GetAllTasks = async (path, limit, skip, search = "", category = "") => {
    const params = new URLSearchParams({ limit, skip });
    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/${path}?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        console.error("GetAllTasks failed:", response.status);
        return { tasks: [], total: 0, pages: 1 };
    }
    return response.json();
};

export const GetTasksByUser = async (path, clientId, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${NEXT_PUBLIC_API_URL}/${path}/${clientId}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.log("GetTasksByUser failed:", response.status);
            return { tasks: [], totalItems: 0, totalPages: 1, currentPage: page };
        }

        return response.json();
    } catch (error) {
        console.error("GetTasksByUser error:", error);
        return { tasks: [], totalItems: 0, totalPages: 1, currentPage: page };
    }
};

export const GetTasksById = async (path, id) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/${path}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        console.error("GetTasksById failed:", response.status);
        return { success: false, message: "Task not found" };
    }
    return response.json();
};

export const UpdateTask = async ({ path, taskData }) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        console.error("UpdateTask failed:", response.status);
        return { success: false, message: "Failed to update task" };
    }
    return response.json();
};

export const DeleteTask = async (path) => {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        console.error("DeleteTask failed:", response.status);
        return { success: false, message: "Failed to delete task" };
    }
    return response.json();
};