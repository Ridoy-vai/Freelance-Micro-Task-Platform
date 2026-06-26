import Link from 'next/link';
import { MapPin, Briefcase, Star } from 'lucide-react';
import React from 'react';

const FreelancerCard = ({ freelancer }) => {

    return (
        <Link href={`freelancers/${freelancer._id}`}>
            <div className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/[0.04] p-5 transition-colors duration-300 hover:border-signal/40 hover:bg-paper/[0.07]">

                {/* Header: avatar, name, jobs, rating */}
                <div className="flex items-center justify-between gap-3 border-b border-paper/10 pb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-11 w-11 shrink-0 rounded-full bg-paper/10">
                            <img
                                src={freelancer?.image || "/default-avatar.png"}
                                alt={freelancer?.name || "Freelancer avatar"}
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-paper">
                                {freelancer?.name}
                            </h3>
                            <p className="flex items-center gap-1 text-xs text-paper/50">
                                <Briefcase size={12} className="text-paper/40" />
                                {freelancer?.totalJobsSubmitted || 0} jobs completed
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-paper/10 px-2.5 py-1.5">
                        <Star size={13} className="fill-signal text-signal" />
                        <span className="text-sm font-semibold text-paper">
                            {freelancer?.rating || 0.0}
                        </span>
                    </div>
                </div>

                {/* Title / role */}
                <p className="mt-3 line-clamp-1 text-sm font-medium text-paper/80">
                    {freelancer?.title || "Freelancer"}
                </p>

                {/* Stats: rate / location, label above value */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-paper/[0.04] px-3 py-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                            Hourly rate
                        </span>
                        <p className="mt-1 font-mono text-sm font-semibold text-signal">
                            ${freelancer?.hourlyRate || 10}/hr
                        </p>
                    </div>

                    <div className="rounded-xl bg-paper/[0.04] px-3 py-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                            Location
                        </span>
                        <p className="mt-1 flex items-center gap-1 truncate text-sm font-semibold text-paper/80">
                            <MapPin size={12} className="shrink-0 text-paper/40" />
                            {freelancer?.location || "Bangladesh"}
                        </p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {(freelancer?.skills?.length
                        ? freelancer.skills.slice(0, 4)
                        : ["Next.js", "React", "MongoDB"]
                    ).map((skill, index) => (
                        <span
                            key={index}
                            className="rounded-full border border-sage/30 bg-sage/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-sage"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default FreelancerCard;