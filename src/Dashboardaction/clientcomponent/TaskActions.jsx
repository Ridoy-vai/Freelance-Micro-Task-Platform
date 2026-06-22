"use client";

import { Edit, Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TaskActions = ({ taskId }) => {
    const [deletingId, setDeletingId] = useState(null);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "আপনি কি নিশ্চিতভাবে এই টাস্কটি ডিলিট করতে চান?"
        );

        if (!confirmDelete) return;

        try {
            setDeletingId(taskId);

            const res = await fetch(
                `http://localhost:5000/deleteclinttask/${taskId}`,
                { method: "DELETE" }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                alert("Task deleted successfully");
                router.refresh();
            } else {
                alert(data.message || "Task delete করা যায়নি");
            }
        } catch (error) {
            console.log(error);
            alert("Server error, পরে আবার চেষ্টা করুন");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = () => {
        console.log("clicked");
    };

    return (
        <div className="flex justify-center gap-2">
            <button
                onClick={handleEdit}
                disabled={deletingId === taskId}
                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                <Edit size={18} />
            </button>
            <button
                onClick={handleDelete}
                disabled={deletingId === taskId}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                {deletingId === taskId ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <Trash2 size={18} />
                )}
            </button>
        </div>
    );
};

export default TaskActions;