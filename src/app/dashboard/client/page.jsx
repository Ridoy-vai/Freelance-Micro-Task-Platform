// app/dashboard/client/page.jsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GetTasksByUser } from "@/ServerActions/Task";
// import DashboardHome from "./page";
import { redirect } from "next/navigation"; // redirect ইম্পোর্ট করুন
import DashboardHome from "@/Dashboardoverview/DashboardHome";
// import DashboardHome from "@/app/dashboard/freelancer/overview/page";

const ClientDashboardPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    // ১. ভ্যালিডেশন: সেশন বা ইউজার না থাকলে লগইন পেজে পাঠিয়ে দাও
    if (!session || !session.user) {
        redirect("/login"); // আপনার লগইন পেজের পাথ অনুযায়ী পরিবর্তন করুন
    }

    const clientId = session.user.id;
    const userName = session.user.name;

    // ২. সেশন থাকলে ডাটা ফেচ করো
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