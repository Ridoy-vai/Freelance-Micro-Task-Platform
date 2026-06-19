"use client"; // যেহেতু আপনি হুক ব্যবহার করছেন
import { authClient } from '@/lib/auth-client';
import { GetTasksByUser } from '@/ServerActions/Task';
import { Calendar, DollarSign, Edit, Trash2, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const MyTasksPage = () => {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const [tasks, setTasks] = useState([]); // ডাটা রাখার জন্য স্টেট
    const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট

    const user = session?.user;
    const clientId = user?.id;

    useEffect(() => {
        const fetchTasks = async () => {
            if (clientId) {
                try {
                    setIsLoading(true);

                    const fetchedTasks = await GetTasksByUser(
                        'my-tasks',
                        clientId
                    );

                    console.log("client my tasks", fetchedTasks);

                    setTasks(
                        Array.isArray(fetchedTasks)
                            ? fetchedTasks
                            : []
                    );
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                    setTasks([]);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchTasks();
    }, [clientId]);

    const handleDelete = async (_id) => {
        console.log("delete id", _id);

        try {
            const res = await fetch(
                `http://localhost:5000/deleteclinttask/${_id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.deletedCount > 0) {
                alert("Task deleted successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEadit = () => {
        console.log("clicked")
    }


    if (isLoading || sessionPending) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">My Tasks</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Task Info</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Budget</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Deadline</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{task.title}</div>
                                        <div className="text-xs text-gray-500 truncate w-40">{task.description}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                            {task.category}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-gray-800">
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={14} className="text-green-600" />
                                            {task.budget}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {task.deadline}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${task.status === 'open'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={handleEadit}
                                                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => { handleDelete(task._id) }}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasksPage;