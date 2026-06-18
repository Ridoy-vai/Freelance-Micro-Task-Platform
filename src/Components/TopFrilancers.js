"use client";

/**
 * TopFreelancers — "Top Freelancers" section
 *
 * FREELANCERS is a static array right now so the UI is visible immediately.
 * Swap it for real data later — keep the same object shape and nothing
 * else in this file needs to change.
 *
 *   const res = await fetch("/api/freelancers/top");
 *   const FREELANCERS = await res.json();
 *
 * or directly from MongoDB in a server component:
 *
 *   const FREELANCERS = await db.collection("freelancers")
 *     .find({})
 *     .sort({ avgRating: -1, completedJobs: -1 })
 *     .limit(6)
 *     .toArray();
 *
 * avatar: a real image URL (Cloudinary, S3, /uploads/..., etc).
 * If a freelancer has no avatar yet, the card falls back to initials.
 */

const FREELANCERS = [
  {
    id: "frl_001",
    name: "Rafiq Hossain",
    avatar: "",
    skills: ["React", "Next.js", "Tailwind CSS"],
    rating: 4.9,
    completedJobs: 132,
  },
  {
    id: "frl_002",
    name: "Nadia Islam",
    avatar: "",
    skills: ["UI/UX Design", "Figma", "Prototyping"],
    rating: 4.8,
    completedJobs: 98,
  },
  {
    id: "frl_003",
    name: "Tanvir Ahmed",
    avatar: "",
    skills: ["Node.js", "Express", "MongoDB"],
    rating: 4.7,
    completedJobs: 76,
  },
  {
    id: "frl_004",
    name: "Mehzabin Karim",
    avatar: "",
    skills: ["Content Writing", "SEO", "Copywriting"],
    rating: 5.0,
    completedJobs: 154,
  },
  {
    id: "frl_005",
    name: "Shafin Reza",
    avatar: "",
    skills: ["Video Editing", "Premiere Pro", "Motion Graphics"],
    rating: 4.6,
    completedJobs: 61,
  },
  {
    id: "frl_006",
    name: "Farzana Akter",
    avatar: "",
    skills: ["Data Entry", "Excel", "Data Cleaning"],
    rating: 4.9,
    completedJobs: 110,
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRating({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${
              i < fullStars ? "fill-signal" : "fill-white/15"
            }`}
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.97l-5.21 2.55 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="font-mono text-xs font-semibold text-paper/80">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function FreelancerCard({ freelancer }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-paper/[0.04] p-5 text-center transition-colors duration-300 hover:border-signal/40 hover:bg-paper/[0.07]">
      <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-white/10">
        {freelancer.avatar ? (
          <img
            src={freelancer.avatar}
            alt={freelancer.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sage/40 to-signal/40 text-sm font-semibold text-paper">
            {getInitials(freelancer.name)}
          </div>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-paper">
        {freelancer.name}
      </h3>

      <div className="mt-2 flex justify-center">
        <StarRating rating={freelancer.rating} />
      </div>

      <p className="mt-1 text-xs text-paper/50">
        {freelancer.completedJobs} jobs completed
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {freelancer.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-sage/30 bg-sage/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-sage"
          >
            {skill}
          </span>
        ))}
      </div>

      <button className="mt-5 w-full rounded-xl border border-white/15 bg-white/[0.02] py-2.5 text-sm font-semibold text-paper transition-colors duration-200 group-hover:border-signal/40 group-hover:bg-signal group-hover:text-ink">
        View profile
      </button>
    </div>
  );
}

export default function TopFreelancers() {
  return (
    <section className="bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
              Trusted by clients
            </span>
            <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
              Top freelancers
            </h2>
          </div>
          <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
            Browse all freelancers →
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FREELANCERS.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      </div>
    </section>
  );
}