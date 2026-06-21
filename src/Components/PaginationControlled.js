"use client";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function PaginationControlled({ currentPage = 1, totalPages = 1, totalItems = 0, itemsPerPage = 10 }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page);
        router.push(`${pathname}?${params.toString()}`);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("ellipsis");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("ellipsis");
            pages.push(totalPages);
        }
        return pages;
    };

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <Pagination.Summary>
                Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous
                        isDisabled={currentPage === 1}
                        onPress={() => goToPage(currentPage - 1)}
                    >
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                    </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    ) : (
                        <Pagination.Item key={p}>
                            <Pagination.Link isActive={p === currentPage} onPress={() => goToPage(p)}>
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    )
                )}

                <Pagination.Item>
                    <Pagination.Next
                        isDisabled={currentPage === totalPages}
                        onPress={() => goToPage(currentPage + 1)}
                    >
                        <span>Next</span>
                        <Pagination.NextIcon />
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}