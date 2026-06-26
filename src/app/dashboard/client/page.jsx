import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GetTasksByUser } from "@/ServerActions/Task";
import { redirect } from "next/navigation";
import DashboardHome from "@/Dashboardoverview/DashboardHome";
import { requireRole } from "@/lib/role-check-access";
export const metadata = {
  title: "Overview | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};
const ClientDashboardPage = async () => {
    const role = await requireRole(["client"]);
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user) {
        redirect("/login"); 
    }

    const clientId = session.user.id;
    const userName = session.user.name;

    const data = await GetTasksByUser("my-tasks", clientId, 1, 50);
    
    const tasks = data?.tasks || [];

    return (
        <DashboardHome
            tasks={tasks}
            clientId={clientId}
            userName={userName}
        />
    );
};

export default ClientDashboardPage;