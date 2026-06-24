// import AdminTransactionTable from "@/Dashboardaction/adminClientComponent/AdminTransactionTable";
import AdminTransactionTable from "@/Dashboardaction/adminClientComponent/AdminTransactionTable";
import { requireRole } from "@/lib/role-check-access";
import { GetAllTransactions } from "@/ServerActions/admin";

export const dynamic = 'force-dynamic';

const AdminTransactionsPage = async ({ searchParams }) => {
  const session = await requireRole(["admin"]);
  // const session = await requireRole(["client", "freelancer"]);
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;


  const data = await GetAllTransactions(currentPage);

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.total || 0;

  return (
    <AdminTransactionTable
      transactions={transactions}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
    />
  );
};

export default AdminTransactionsPage;