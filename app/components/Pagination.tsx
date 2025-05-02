import { useLocation, useSearch } from '@tanstack/react-router';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './ui/pagination';
import truncatePagination from 'utils/truncatePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationMenu = ({ totalCount }: { totalCount: number }) => {
  const { page: currentPage } = useSearch({ from: '/cocktails/' });
  const { pathname } = useLocation();

  const numItemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / numItemsPerPage);
  const visiblePages = truncatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage != 1 && (
          <PaginationItem>
            <PaginationLink href={`${pathname}?page=${currentPage - 1}`}>
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
        )}

        {visiblePages.map((page) =>
          page === 'ellipsis' ? (
            <PaginationEllipsis />
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${pathname}?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${pathname}?page=${currentPage + 1}`}>
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMenu;
