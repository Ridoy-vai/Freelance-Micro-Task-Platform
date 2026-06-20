// app/dashboard/freelancer/profile/page.jsx
// SERVER COMPONENT

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";

const API_URL = process.env.API_URL;

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const id = session.user.id
  console.log(session)
  const sessionUser = session?.user;
  if (!sessionUser) {
    redirect("/login");
  }

  // TODO: real API call
  const res = await fetch(`http://localhost:5000/users/${id}`, { cache: "no-store" });
  const user = res.ok ? await res.json() : null;

  console.log("user in prophil page", user)

  // Mock data (porer dike DB theke ashbe)
 

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-500">Profile pawa jay nai.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="w-28 h-28 relative">
            <Image
              src={user?.photo}
              alt="Profile"
              fill
              className="rounded-full object-cover border"
            />
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="mt-2 text-sm text-gray-600">
              💰 Hourly Rate:{" "}
              <span className="font-bold text-green-600">
                ${user.rate}/hr
              </span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Bio</h3>
          <p className="text-gray-600">{user?.bio}</p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Edit Icon - Link, no onClick needed */}
        <div className="mt-8">
          <Link
            href="/dashboard/freelancer/profile/edit"
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Pencil size={16} />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}