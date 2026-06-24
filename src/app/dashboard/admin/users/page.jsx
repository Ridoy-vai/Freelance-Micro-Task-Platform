import AdminUserTable from "@/Dashboardaction/adminClientComponent/AdminUserTable";
import { requireRole } from "@/lib/role-check-access";
import { GetAllUsers } from "@/ServerActions/admin";

export const dynamic = 'force-dynamic';

const AdminUsersPage = async ({ searchParams }) => {
  const session = await requireRole(["admin"]);
  // const session = await requireRole(["client", "freelancer"]);
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const data = await GetAllUsers(currentPage);

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.total || 0;

  return (
    <AdminUserTable
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
    />
  );
};

export default AdminUsersPage;