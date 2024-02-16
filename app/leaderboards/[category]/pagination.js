"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function LeaderboardsPagination({ className, nextButtonHidden, length }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState({
        "page": searchParams.get("page") || 1
    });

    const pageSelectorHandler = (page) => {
        const updatedQuery = { ...searchQuery, "page": page };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "page" && updatedQuery[key] == "1") params.delete(key);
                else params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedPath);

        setSearchQuery(updatedQuery);
    }

    const PAGINATION = window.innerWidth >= 600 ? 10 : 5;
    const page = parseInt(searchParams.get("page")) || 1;

    return (
        <Pagination className={cn("mt-2", className)}>
            <PaginationContent className={"w-full flex justify-between"}>
                <PaginationItem className={"min-w-[40px]"}>
                    {
                        parseInt((page - 1) / PAGINATION) != 0 &&
                        <PaginationPrevious
                            className={"hover:cursor-pointer"}
                            onClick={() => pageSelectorHandler(((parseInt((page - 1) / PAGINATION) - 1) * PAGINATION) + 1)}
                        />
                    }
                </PaginationItem>

                <div className="flex flex-row items-center gap-1">
                    {
                        Array(PAGINATION).fill().map((_, pageIndex) => {
                            pageIndex += 1;
                            const pageNumber = (parseInt((page - 1) / PAGINATION) * PAGINATION) + pageIndex;
                            if ((parseInt((page - 1) / PAGINATION) * PAGINATION) - ((parseInt((page - 1) / PAGINATION) * PAGINATION) % 20) + Math.ceil(length / 10) < pageNumber) return;
                            return (
                                <PaginationItem key={pageIndex}>
                                    <PaginationLink
                                        className={"hover:cursor-pointer"}
                                        onClick={() => pageSelectorHandler(pageNumber)}
                                        {...pageNumber == page ? { isActive: true } : {}}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                </div>

                <PaginationItem className={"min-w-[40px]"}>
                    {
                        !(
                            ((parseInt((page - 1) / PAGINATION) * PAGINATION) % 20) == 10 && 10 < Math.ceil(length / 10) && Math.ceil(length / 10) < 20 ||
                            ((parseInt((page - 1) / PAGINATION) * PAGINATION) % 20) == 0 && 0 < Math.ceil(length / 10) && Math.ceil(length / 10) < 10 ||
                            length == 0
                        ) &&
                        <PaginationNext
                            className={"hover:cursor-pointer"}
                            onClick={() => pageSelectorHandler(((parseInt((page - 1) / PAGINATION) + 1) * PAGINATION) + 1)}
                        />
                    }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )

}
