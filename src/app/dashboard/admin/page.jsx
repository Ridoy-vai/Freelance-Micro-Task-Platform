import AdminOverviewDashboard from "@/Dashboardoverview/AdminOverviewDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import AdminOverviewDashboard from "./overview/page";
// import AdminOverviewDashboard from "./AdminOverviewDashboard";

const AdminPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

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