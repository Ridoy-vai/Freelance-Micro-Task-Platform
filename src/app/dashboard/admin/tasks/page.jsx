import AdminTaskTable from "@/Dashboardaction/adminClientComponent/AdminTaskTable";
import { GetAllAdminTasks } from "@/ServerActions/admin";

const AdminTasksPage = async () => {
  const data = await GetAllAdminTasks();
  const tasks = Array.isArray(data) ? data : [];

  return <AdminTaskTable tasks={tasks} />;
};

export default AdminTasksPage;