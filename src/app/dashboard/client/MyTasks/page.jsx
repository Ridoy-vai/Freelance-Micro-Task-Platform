import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Calendar, DollarSign } from 'lucide-react';
import TaskActions from "@/Dashboardaction/clientcomponent/TaskActions";
import { PaginationControlled } from "@/Components/PaginationControlled";
import { GetTasksByUser } from "@/ServerActions/Task";
import { requireRole } from "@/lib/role-check-access";

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "My Tasks | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};
const MyTasksPage = async ({ searchParams }) => {
    await requireRole(["client"]);
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const itemsPerPage = 10;

    const reqHeaders = await headers();

    const session = await auth.api.getSession({
        headers: reqHeaders,
    });

    const clientId = session?.user?.id;

    if (!clientId) {
        return (
            <div className="bg-white border rounded-xl shadow-sm p-10 text-center text-gray-500">
                Please login to view your tasks.
            </div>
        );
    }

    // Get the JWT token server-side via the jwt plugin API
    const tokenResponse = await auth.api.getToken({
        headers: reqHeaders,
    });
    const jwtToken = tokenResponse?.token;

    const result = await GetTasksByUser('my-tasks', clientId, currentPage, itemsPerPage, jwtToken);
    console.log("result", result)
    const tasks = Array.isArray(result?.tasks) ? result.tasks : [];
    const totalPages = result?.totalPages || 1;
    const totalItems = result?.totalItems || 0;

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">My Tasks</h2>
                <p className="text-sm text-gray-500">{totalItems} task</p>
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
                                        <TaskActions task={task} />
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

            <div className="p-4 border-t">
                <PaginationControlled
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
};

export default MyTasksPage;