// app/dashboard/freelancer/page.jsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// import FreelancerDashboardHome from "./FreelancerDashboardHome";
// import { GetFreelancerTransactions, GetActiveProposals, GetProposalById } from "@/ServerActions/Freelancer";
// import FreelancerDashboardHome from "./overview/page";
import { GetFreelancerTransactions } from "@/ServerActions/Freelancer";
import { GetActiveProposals, GetProposalById } from "@/ServerActions/proposal";
import { headers } from "next/headers";
import FreelancerDashboardHome from "@/Dashboardoverview/FreelancerDashboardHome";
import { requireRole } from "@/lib/role-check-access";

const FreelancerDashboardPage = async () => {
    await requireRole(["freelancer"]);
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) redirect("/login");

    const transactions = await GetFreelancerTransactions({ freelancerId: user.id, page: 1, limit: 50 });
    const activeProposals = await GetActiveProposals({ freelancerId: user.id, page: 1, limit: 50 });
    const allProposals = await GetProposalById({ path: "myProposals", freelancerId: user.id, page: 1, limit: 50 });
    console.log("transection", transactions)

    return (
        <FreelancerDashboardHome
            userName={user.name}
            transactionData={transactions?.transactions || []}
            activeData={activeProposals?.proposals || []}
            proposalsData={allProposals?.proposals || []}
        />
    );
};

export default FreelancerDashboardPage;