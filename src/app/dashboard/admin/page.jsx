import AdminOverviewDashboard from "@/Dashboardoverview/AdminOverviewDashboard";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/role-check-access";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Admin Overview | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};
const AdminPage = async () => {
    const session = await requireRole(["admin"]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [usersRes, tasksRes, paymentsRes, proposalsRes] = await Promise.all([
        fetch(`${API_URL}/alluserusers`, { cache: "no-store" }),
        fetch(`${API_URL}/alltask`, { cache: "no-store" }),
        fetch(`${API_URL}/allpayment`, { cache: "no-store" }),
        fetch(`${API_URL}/allproposals`, { cache: "no-store" }),
    ]);

    const users = await usersRes.json();
    const tasks = await tasksRes.json();
    const payments = await paymentsRes.json();
    const proposals = await proposalsRes.json();

    return (
        <AdminOverviewDashboard
            users={users || []}
            tasks={tasks || []}
            payments={payments || []}
            proposals={proposals || []}
        />
    );
};

export default AdminPage;