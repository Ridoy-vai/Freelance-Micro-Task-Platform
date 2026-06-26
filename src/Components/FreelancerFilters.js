"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const FreelancerFilters = ({
    defaultSearch = "",
    defaultMinBudgetFrom = "",
    defaultMinBudgetTo = "",
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(defaultSearch);
    const [minFrom, setMinFrom] = useState(defaultMinBudgetFrom);
    const [minTo, setMinTo] = useState(defaultMinBudgetTo);

    const updateParams = useCallback(
        (updates) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });

            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    // Search input debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== defaultSearch) {
                updateParams({ search });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    // Budget range debounce 
    useEffect(() => {
        const timer = setTimeout(() => {
            if (minFrom !== defaultMinBudgetFrom || minTo !== defaultMinBudgetTo) {
                updateParams({
                    minBudgetFrom: minFrom,
                    minBudgetTo: minTo,
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [minFrom, minTo]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search Input */}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search freelancers by name..."
                className="w-full sm:w-72 bg-paper/5 border border-paper/15 rounded-xl px-4 py-2.5 text-paper placeholder:text-paper/40 outline-none focus:ring-2 ring-signal/30 transition"
            />

            {/* Budget Range */}
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={minFrom}
                    onChange={(e) => setMinFrom(e.target.value)}
                    placeholder="Min budget"
                    className="w-full sm:w-36 bg-paper/5 border border-paper/15 rounded-xl px-4 py-2.5 text-paper placeholder:text-paper/40 outline-none focus:ring-2 ring-signal/30 transition"
                />
                <span className="text-paper/40 text-sm">to</span>
                <input
                    type="number"
                    value={minTo}
                    onChange={(e) => setMinTo(e.target.value)}
                    placeholder="Max budget"
                    className="w-full sm:w-36 bg-paper/5 border border-paper/15 rounded-xl px-4 py-2.5 text-paper placeholder:text-paper/40 outline-none focus:ring-2 ring-signal/30 transition"
                />
            </div>
        </div>
    );
};

export default FreelancerFilters;