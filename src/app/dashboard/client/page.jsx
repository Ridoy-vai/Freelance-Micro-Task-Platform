import ClientDashboardShell from "@/ClientActions/ClientDashboardShell";
import React from "react";
// import ClientDashboardShell from "./ClientDashboardShell";

// এই মেনু আইটেমগুলো static data — কোনো state বা event handler নেই,
// তাই এটা সার্ভারেই রাখা হলো এবং props দিয়ে client component-কে পাঠানো হচ্ছে।
// NOTE: lucide-react icon component (LayoutDashboard, Plus ইত্যাদি) সরাসরি পাঠানো যায় না,
// কারণ সেগুলো plain object নয় (render method সহ component object)।
// Server → Client boundary পার করতে পারে শুধু plain data (string/number/array/object)।
// তাই এখানে icon-এর বদলে একটা string key পাঠানো হচ্ছে, আসল icon component
// client component-এর ভেতরে এই key থেকে lookup করা হবে।
const menuItems = [
  { id: "overview", name: "Dashboard", icon: "dashboard" },
  { id: "post", name: "Post a Task", icon: "plus" },
  { id: "tasks", name: "My Tasks", icon: "tasks" },
  { id: "proposals", name: "Manage Proposals", icon: "proposals" },
];

const proposals = [
    {
      _id: "6a33e62343272fee573fbdf8",
      title: "Design Web Landing Page",
      category: "Web Development",
      description: "we provied 4 years + landing page design survice",
      budget: "2500",
      deadline: "2026-06-27",
      status: "pending",
      ClientId: "6a338085c3bc3d56145bf98c",
      taskId: "6a33e62343272fee573fbdf8",
      freelancerEmail: "mdsahariyarridoy@gmail.com",
      proposedBudget: "12",
      estimatedDays: "12",
      message: "wgfgnb nbvbdf",
      Freelancer: "Ridoy Vai",
      FreelancerId: "6a336f78c3bc3d56145bf985",
    },
  ];

// --- এটি একটি Server Component (ডিফল্ট) ---
// এখানে কোনো "use client" নেই, কোনো useState/useEffect নেই, কোনো onClick নেই।
// ভবিষ্যতে এখানে সার্ভার থেকে সরাসরি ডেটা fetch (await fetch(...) / db call) করে
// সেটাও props হিসেবে ClientDashboardShell-এ পাঠানো যাবে।
export default function ClientDashboardPage() {
  return <ClientDashboardShell menuItems={menuItems} proposals={proposals} />;
}