import { useLocation } from '@tanstack/react-router';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './ui/pagination';

const PaginationMenu = ({ totalCount }: { totalCount: number }) => {
  const {
    pathname,
    search: { page: currentPage },
  } = useLocation();

  const numItemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / numItemsPerPage);
  const totalPagesList = Array.from(
    {
      length: totalPages,
    },
    (_, i) => i + 1,
  );

  return (
    <Pagination>
      <PaginationContent>
        {currentPage != 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${pathname}?page=${currentPage - 1}`} />
          </PaginationItem>
        )}
        {totalPagesList.map((page) => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${pathname}?page=${page}`}
                isActive={page === currentPage ? true : false}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${pathname}?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMenu;
