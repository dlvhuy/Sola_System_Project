'use client'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

export function DynamicPagination(
    { currentPage,
        totalPages,
        handleChangePage }:
        {
            currentPage: number;
            totalPages: number;
            handleChangePage: (value: number) => void
        }) {

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                    />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i + 1 === currentPage}
                            onClick={() => handleChangePage(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}