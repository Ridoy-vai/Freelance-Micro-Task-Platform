import FreelancerCard from '@/Components/FreelancerCard';
import FreelancerFilters from '@/Components/FreelancerFilters';
import { PaginationControlled } from '@/Components/PaginationControlled';
import { UserX } from 'lucide-react';
import React from 'react';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Freelancers | TaskNest",
  description: "Browse skilled freelancers on TaskNest. Search and filter by budget to find the right talent for your project.",
};

const BrowseFreelancers = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params?.search || "";
    const minBudgetFrom = params?.minBudgetFrom || "";
    const minBudgetTo = params?.minBudgetTo || "";
    const page = Number(params?.page) || 1;
    const limit = 9; // 9 fits nicely as a 3-column grid; adjust if the grid layout changes

    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (minBudgetFrom) query.append("minBudgetFrom", minBudgetFrom);
    if (minBudgetTo) query.append("minBudgetTo", minBudgetTo);
    query.append("page", page);
    query.append("limit", limit);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/freelancers?${query.toString()}`,
        { cache: "no-store" }
    );
    const data = res.ok ? await res.json() : { freelancers: [], totalItems: 0, totalPages: 1 };

    const FREELANCERS = data.freelancers || [];

    return (
        <section className="bg-ink py-20 mt-20 sm:py-24">
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
                        Total freelancers : {data.totalItems}
                    </button>
                </div>

                <FreelancerFilters
                    defaultSearch={search}
                    defaultMinBudgetFrom={minBudgetFrom}
                    defaultMinBudgetTo={minBudgetTo}
                />

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
                                Try adjusting your search or budget filters to see more results.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-10">
                    <PaginationControlled
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                        totalItems={data.totalItems}
                        itemsPerPage={data.itemsPerPage}
                    />
                </div>
            </div>
        </section>
    );
};

export default BrowseFreelancers;