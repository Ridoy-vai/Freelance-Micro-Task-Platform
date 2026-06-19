import FreelancerCard from '@/ClientActions/FreelancerCard';
import React from 'react';

const BrowseFreelancers = () => {
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

    return (
        <section className="bg-ink py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            Trusted by clients
                        </span>
                        <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
                            Browse freelancers
                        </h2>
                    </div>
                    <button className="text-sm font-semibold text-paper/60 transition-colors hover:text-signal">
                         Total freelancers : {FREELANCERS.length}
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
};

export default BrowseFreelancers;