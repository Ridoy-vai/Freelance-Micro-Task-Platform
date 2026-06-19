// app/dashboard/layout.js
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const {session} = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await session?.user;
  console.log("user", user);

  // // Login নাই → login এ পাঠাও
  // // if (!user) {
  // //   redirect("/login");
  // // }

  // const role = user?.role?.toLowerCase() || "";

  // // Role নাই → home এ পাঠাও
  // if (!role) {
  //   redirect("/");
  // }

  // if(role === "admin"){
  //   redirect("/dashboard/admin");
  // }else if(role === "freelancer"){
  //   redirect("/dashboard/freelancer");
  // }else if(role === "client"){
  //   redirect("/dashboard/client");
  // }else{
  //   redirect("/");
  // }

 

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}