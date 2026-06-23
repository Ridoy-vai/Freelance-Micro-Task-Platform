// app/freelancers/[id]/page.jsx
// SERVER COMPONENT

import { Star, Briefcase, CheckCircle2, Mail } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`${API_URL}/users/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  const freelancer = await res.json();

  if (!freelancer) {
    return { title: "Freelancer Not Found" };
  }

  const skillsText = freelancer.skills?.length
    ? freelancer.skills.join(", ")
    : "No skills listed";

  return {
    title: `${freelancer.name} | TaskNest Freelancer`,
    description: `${freelancer.name} - ${skillsText}. ${freelancer.completedJobs || 0} completed jobs.`,
  };
}

export default async function FreelancerProfilePage({ params }) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/users/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  const freelancer = await res.json();
  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Freelancer not found.</p>
      </div>
    );
  }

  const initials = freelancer.name
    ? freelancer.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "??";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            {freelancer.avatar ? (
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-600">
                {initials}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {freelancer.name}
              </h1>

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-700">
                    {freelancer.rating || 0}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span>{freelancer.completedJobs || 0} jobs completed</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {freelancer.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center gap-2 shrink-0">
              <Mail size={16} /> Contact
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl border shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">
              {freelancer.completedJobs || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Jobs Done</p>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
              {freelancer.rating || 0}
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            </p>
            <p className="text-sm text-gray-500 mt-1">Rating</p>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold text-gray-900">
              {freelancer.skills?.length || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Skills</p>
          </div>
        </div>

        {/* About / Bio placeholder */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mt-6">
          <h2 className="font-bold text-lg text-gray-800 mb-3">About</h2>
          <p className="text-gray-500 text-sm">
            {freelancer.bio || "No bio added yet."}
          </p>
        </div>

        {/* Reviews placeholder */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mt-6">
          <h2 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
            <Briefcase size={18} /> Recent Work
          </h2>
          <p className="text-gray-500 text-sm">
            {/* TODO: completed projects list DB theke ashbe */}
            No completed work to show yet.
          </p>
        </div>
      </div>
    </div>
  );
}