import {
  Star,
  Briefcase,
  CheckCircle2,
  Mail,
  Award,
  Zap,
  MapPin,
  Clock,
  DollarSign,
  Tag,
} from "lucide-react";
import RatingWidget from "@/Components/RatingWidget";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic";

export default async function FreelancerProfilePage({ params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`${API_URL}/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium text-lg">Freelancer not found</p>
      </div>
    );
  }

  const freelancer = await res.json();

  const initials =
    freelancer?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";

  const stats = [
    {
      label: "Hourly Rate",
      value: `$${freelancer.hourlyRate || 0}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Jobs Completed",
      value: freelancer.totalJobsSubmitted || 0,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Rating",
      value: freelancer.rating,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Main Content (Left) */}
          <div className="space-y-6 lg:col-span-8">

            {/* Header Card */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="px-8 pb-8">
                <div className="relative -mt-16 mb-6 flex flex-col items-start gap-6 md:flex-row md:items-end">
                  <div className="relative">
                    {freelancer.image ? (
                      <img
                        src={freelancer.image}
                        alt={freelancer.name}
                        className="h-40 w-40 rounded-3xl border-8 border-white object-cover shadow-xl"
                      />
                    ) : (
                      <div className="flex h-40 w-40 items-center justify-center rounded-3xl border-8 border-white bg-blue-100 text-5xl font-bold text-blue-600 shadow-xl">
                        {initials}
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 rounded-full border-4 border-white bg-emerald-500 p-1.5 shadow-lg">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        {freelancer.name}
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-600 border border-blue-100">
                        <Zap size={14} className="fill-blue-600" />
                        Verified
                      </span>
                    </div>
                    <p className="mt-2 text-lg font-medium text-blue-600/80">
                      {freelancer.title || "Professional Freelancer"}
                    </p>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition-all hover:bg-slate-800 md:w-auto">
                    <Mail size={20} />
                    Hire Me
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 md:grid-cols-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{freelancer.location || "Remote"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Tag size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{freelancer.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock size={18} className="text-slate-400" />
                    <span className="text-sm font-medium tracking-tight">Active recently</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className={`mb-4 inline-flex rounded-2xl ${item.bg} p-3`}>
                    <item.icon size={24} className={item.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{item.value}</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* About & Skills Section */}
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-blue-600"></div>
                  Professional Summary
                </h2>
                <p className="leading-relaxed text-slate-600">
                  {freelancer.bio || "No biography provided yet."}
                </p>
              </div>

              <div className="pt-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                  Expertise & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <RatingWidget freelancerId={id} user={user} />

              {/* Additional Info Box */}
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                <h3 className="text-lg font-bold">Ready to start?</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Get a custom quote from {freelancer.name?.split(" ")[0]} for your next big project.
                </p>
                <button className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-slate-900 transition-all hover:bg-blue-50">
                  Send Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}