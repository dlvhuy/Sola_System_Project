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

    const handlePrev = () => {
        if (currentPage > 1) handleChangePage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) handleChangePage(Number(currentPage) + 1);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) =>{
                            e.preventDefault()
                            handlePrev()
                        }}
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
                        onClick={(e) =>{
                            e.preventDefault()
                            handleNext()
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}