// app/dashboard/freelancer/profile/page.jsx
// SERVER COMPONENT

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Globe,
  Sparkles,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessionUser = session?.user;
  if (!sessionUser) {
    redirect("/login");
  }

  const id = sessionUser.id;

  // TODO: real API call
  const res = await fetch(`http://localhost:5000/users/${id}`, { cache: "no-store" });
  const user = res.ok ? await res.json() : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-ink px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-paper/10 bg-paper/[0.03] p-8 text-center">
          <p className="text-paper/50">Profile pawa jay nai.</p>
        </div>
      </div>
    );
  }

  const isFreelancer = user.role === "freelancer";
  const isClient = user.role === "client";

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink px-4 py-12 sm:px-6 sm:py-16">
      {/* Ambient glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sage/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sage">
              <Sparkles className="h-3.5 w-3.5" />
              My account
            </span>
            <h1 className="mt-2 font-display text-3xl text-paper">My Profile</h1>
          </div>

          <Link
            href={
              isFreelancer
                ? "/dashboard/freelancer/profile/edit"
                : "/dashboard/client/profile/edit"
            }
            className="inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-signal/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-signal/30"
          >
            <Pencil size={16} />
            Edit Profile
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-paper/10 bg-gradient-to-b from-paper/[0.04] to-transparent p-5 shadow-2xl shadow-black/40 sm:p-8">
          {/* Top section */}
          <div className="flex flex-col items-center gap-6 border-b border-paper/10 pb-8 text-center sm:flex-row sm:text-left">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-2 border-signal/30">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile photo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-paper/[0.06] text-2xl font-semibold text-paper/40">
                  {user.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="font-display text-xl text-paper">{user.name}</h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                    isFreelancer
                      ? "bg-sage/15 text-sage"
                      : "bg-signal/15 text-signal"
                  }`}
                >
                  {isFreelancer ? <Briefcase className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                  {isFreelancer ? "Freelancer" : "Client"}
                </span>
              </div>
              <p className="mt-1 text-sm text-paper/50">{user.email}</p>

              {isFreelancer && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-paper/70 sm:justify-start">
                  {user.title && (
                    <span className="font-medium text-paper">{user.totalJobsSubmitted}</span>
                  )}
                  {typeof user.hourlyRate !== "undefined" && user.hourlyRate !== null && (
                    <span className="inline-flex items-center gap-1 text-sage">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span className="font-semibold">${user.hourlyRate}</span>/hr
                    </span>
                  )}
                  {user.location && (
                    <span className="inline-flex items-center gap-1 text-paper/50">
                      <MapPin className="h-3.5 w-3.5" />
                      {user.location}
                    </span>
                  )}
                </div>
              )}

              {isClient && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-paper/70 sm:justify-start">
                  {user.companyName && (
                    <span className="font-medium text-paper">{user.companyName}</span>
                  )}
                  {user.industry && (
                    <span className="text-paper/50">{user.industry}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Freelancer details */}
          {isFreelancer && (
            <>
              <div className="mt-8">
                <h3 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-sage">
                  <Briefcase className="h-3 w-3" />
                  Bio
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  {user.bio || (
                    <span className="text-paper/30">No bio added yet.</span>
                  )}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-sage">
                  Skills
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {user.skills?.length ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-sage/20 bg-sage/[0.08] px-3 py-1 text-sm text-sage"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-paper/30">No skills added yet.</span>
                  )}
                </div>
              </div>

              {user.category && (
                <div className="mt-6">
                  <h3 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-sage">
                    Category
                  </h3>
                  <p className="mt-2 text-sm text-paper/70">{user.category}</p>
                </div>
              )}
            </>
          )}

          {/* Client details */}
          {isClient && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-signal/20 bg-signal/[0.04] p-4">
                <h3 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                  <Building2 className="h-3 w-3" />
                  Company
                </h3>
                <p className="mt-2 text-sm text-paper/80">
                  {user.companyName || <span className="text-paper/30">Not set</span>}
                </p>
              </div>

              <div className="rounded-2xl border border-signal/20 bg-signal/[0.04] p-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  Industry
                </h3>
                <p className="mt-2 text-sm text-paper/80">
                  {user.industry || <span className="text-paper/30">Not set</span>}
                </p>
              </div>

              <div className="rounded-2xl border border-signal/20 bg-signal/[0.04] p-4 sm:col-span-2">
                <h3 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                  <Globe className="h-3 w-3" />
                  Website
                </h3>
                {user.companyWebsite ? (
                  <a
                    href={user.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-signal hover:underline"
                  >
                    {user.companyWebsite}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-paper/30">Not set</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}