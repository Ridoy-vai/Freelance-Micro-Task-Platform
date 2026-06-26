"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
    "All",
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
];

const SearchAndFilter = ({ defaultSearch = "", defaultCategory = "" }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(defaultSearch);

    // Updates a single URL query param (adding it if a value is given, removing
    // it if not) and pushes the new URL so the page re-fetches with the filter applied.
    const updateParams = useCallback(
        (key, value) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }

            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    // Debounce the search input: wait 500ms after the user stops typing before
    // syncing it to the URL, and skip the update if it already matches the current value.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== defaultSearch) {
                updateParams("search", search);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    // Category changes apply immediately, no debounce needed
    const handleCategoryChange = (e) => {
        updateParams("category", e.target.value);
    };

    return (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks by title..."
                className="w-full sm:w-72 bg-paper/5 border border-paper/15 rounded-xl px-4 py-2.5 text-paper placeholder:text-paper/40 outline-none focus:ring-2 ring-signal/30 transition"
            />

            <select
                value={defaultCategory || "All"}
                onChange={handleCategoryChange}
                className="w-full sm:w-56 bg-paper/5 border border-paper/15 rounded-xl px-4 py-2.5 text-paper outline-none focus:ring-2 ring-signal/30 transition"
            >
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="text-ink">
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchAndFilter;