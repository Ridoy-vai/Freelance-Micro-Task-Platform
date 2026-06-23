import AdminTaskTable from "@/Dashboardaction/adminClientComponent/AdminTaskTable";
import { GetAllAdminTasks } from "@/ServerActions/admin";

export const dynamic = 'force-dynamic';

const AdminTasksPage = async ({ searchParams }) => {
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