import FreelancerCard from '@/Components/FreelancerCard';
import FreelancerFilters from '@/Components/FreelancerFilters';
import { PaginationControlled } from '@/Components/PaginationControlled';
import React from 'react';

const BrowseFreelancers = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params?.search || "";
    const minBudgetFrom = params?.minBudgetFrom || "";
    const minBudgetTo = params?.minBudgetTo || "";
    const page = Number(params?.page) || 1;
    const limit = 9; // grid 3 column hisebe 9 valo lagbe, change korte parba

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
                        <p className="col-span-full text-center text-paper/60 py-10">
                            কোনো freelancer পাওয়া যায়নি।
                        </p>
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