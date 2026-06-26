import AdminTaskTable from "@/Dashboardaction/adminClientComponent/AdminTaskTable";
import { requireRole } from "@/lib/role-check-access";
import { GetAllAdminTasks } from "@/ServerActions/admin";

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Admin  Task | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};
const AdminTasksPage = async ({ searchParams }) => {
    const session = await requireRole(["admin"]);
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;

    const data = await GetAllAdminTasks(currentPage);
    const tasks = data?.tasks || [];
    const totalPages = data?.totalPages || 1;
    const totalItems = data?.total || 0;

    return (
        <AdminTaskTable
            tasks={tasks}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
        />
    );
};

export default AdminTasksPage;