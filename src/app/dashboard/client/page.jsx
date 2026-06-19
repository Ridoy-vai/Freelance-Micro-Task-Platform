import ClientDashboardShell from "@/ClientActions/ClientDashboardShell";
import { auth } from "@/lib/auth";
import { GetProposalById } from "@/ServerActions/proposal";
import { headers } from "next/headers";
import React from "react";

const menuItems = [
  { id: "overview", name: "Dashboard", icon: "dashboard" },
  { id: "post", name: "Post a Task", icon: "plus" },
  { id: "tasks", name: "My Tasks", icon: "tasks" },
  { id: "proposals", name: "Manage Proposals", icon: "proposals" },
];

// const proposals = [
//   {
//     _id: "6a33e62343272fee573fbdf8",
//     title: "Design Web Landing Page",
//     category: "Web Development",
//     description: "we provied 4 years + landing page design survice",
//     budget: "2500",
//     deadline: "2026-06-27",
//     status: "pending",
//     ClientId: "6a338085c3bc3d56145bf98c",
//     taskId: "6a33e62343272fee573fbdf8",
//     freelancerEmail: "mdsahariyarridoy@gmail.com",
//     proposedBudget: "12",
//     estimatedDays: "12",
//     message: "wgfgnb nbvbdf",
//     Freelancer: "Ridoy Vai",
//     FreelancerId: "6a336f78c3bc3d56145bf985",
//   },
// ];


export default async function ClientDashboardPage() {

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
  const result = await GetProposalById({ path: "ClintProposals", freelancerId })
  // const res = await fetch(`http://localhost:5000/myProposals/${freelancerId}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
  // const result = await res.json()

  console.log("fetch by proposals Clint", result)

  proposals.push(...result)

  // console.log("status:", res.status);
  // console.log("content-type:", res.headers.get("content-type"));

  // const text = await res.text();
  // console.log("raw response:", text);
  console.log("proposals list ", proposals)
  return <ClientDashboardShell menuItems={menuItems} proposals={proposals} />;
}