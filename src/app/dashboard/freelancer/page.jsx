import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FreelancerDashboardClient from "@/ClientActions/FreelancerDashboardClient";
import { GetProposalById } from "@/ServerActions/proposal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

export default async function FreelancerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  console.log("user freelancer", user)
  const freelancerId = user.id;

  // --- Proposals (Express API theke) ---
  const proposals = []
   const result = await GetProposalById({ path: "myProposals", freelancerId })
  // const res = await fetch(`http://localhost:5000/myProposals/${freelancerId}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
  // const result = await res.json()

  console.log("fetch by proposals", result)

  proposals.push(...result)

  // console.log("status:", res.status);
  // console.log("content-type:", res.headers.get("content-type"));

  // const text = await res.text();
  // console.log("raw response:", text);
  console.log("proposals list ", proposals)
  // --- Stats (proposals theke calculate kora hocche) ---
  const totalProposals = proposals.length;

  const acceptedProposalsList = proposals.filter(
    (p) => p.status === "accepted"
  );
  const acceptedProposals = acceptedProposalsList.length;

  const earnings = acceptedProposalsList.reduce(
    (sum, p) => sum + (Number(p.proposedBudget) || 0),
    0
  );

  // --- Tasks ar Active Projects ekhon mock/placeholder, porer dike thik hobe ---
  const tasks = [];
  const activeProjects = [];

  const dashboardData = {
    stats: {
      totalProposals,
      acceptedProposals,
      earnings,
    },
    tasks,
    proposals,
    activeProjects,
  };

  return <FreelancerDashboardClient data={dashboardData} />;
}