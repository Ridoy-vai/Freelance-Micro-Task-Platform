import FreelancerCard from '@/Components/FreelancerCard';
import { UserX } from 'lucide-react';
import React from 'react';

const FeaturedFreelancers = async () => {
    const limit = 6;

    let FREELANCERS = [];
    // console.log(FREELANCERS)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-freelancers?limit=${limit}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        FREELANCERS = data.freelancers || [];
    } catch (error) {
        console.error("Error fetching featured freelancers:", error);
    }

    return (
        <section className="bg-ink py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 bg">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            Trusted by clients
                        </span>
                        <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
                            Top rated freelancers
                        </h2>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FREELANCERS.length > 0 ? (
                        FREELANCERS.map((freelancer) => (
                            <FreelancerCard key={freelancer._id} freelancer={freelancer} />
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04]">
                                <UserX size={28} className="text-paper/30" />
                            </div>
                            <h3 className="text-base font-semibold text-paper/80">
                                No freelancers found
                            </h3>
                            <p className="mt-1 max-w-xs text-sm text-paper/50">
                                Check back soon, new freelancers are joining regularly.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedFreelancers;