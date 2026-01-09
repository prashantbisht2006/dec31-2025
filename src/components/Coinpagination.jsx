"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { buildPageNumbers, cn, ELLIPSIS } from "@/lib/utils";

const Coinpagination = ({
  currentPage,
  totalPages, // ✅ MUST match prop from Coins page
  hasMorePages,
}) => {
  const router = useRouter();

  /**
   * ❌ FIX:
   * - was `coins?pages=`
   * - Coins page reads `searchParams.page`
   */
  const handlePageChange = (page) => {
    router.push(`/coins?page=${page}`);
  };

  /**
   * ❌ FIX:
   * - better variable naming
   */
  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  const isLastPage = !hasMorePages || currentPage === totalPages;

  return (
    <Pagination id="coins-pagination">
      <PaginationContent className="pagination-content">
        {/* PREVIOUS */}
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
            className={
              currentPage === 1 ? "control-disabled" : "control-button"
            }
          />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            /**
             * ✅ FIX:
             * - Unique key using page + index
             */
            <PaginationItem key={`${page}-${index}`}>
              {page === ELLIPSIS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                   className={cn('page-link',{
                    'page-link-active':currentPage === page
                   })}

                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        {/* NEXT */}
        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() =>
              !isLastPage && handlePageChange(currentPage + 1)
            }
            className={isLastPage ? "control-disabled" : "control-button"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Coinpagination;
