function truncatePagination(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  let startRange: number;
  let endRange: number;

  if (currentPage === 1) {
    // Display 2 and 3 if on page 1
    startRange = 2;
    endRange = Math.min(3, totalPages - 1);
  } else if (currentPage === totalPages) {
    // Display 2 pages before last page if on last page
    startRange = Math.max(totalPages - 2, 2);
    endRange = totalPages - 1;
  } else {
    // Display 1 page before and 1 page after current page
    startRange = Math.max(2, currentPage - 1);
    endRange = Math.min(totalPages - 1, currentPage + 1);
  }

  // Always show first page
  pages.push(1);

  // Show ellipsis if leftRange is greater than 2
  if (startRange > 2) {
    pages.push('ellipsis');
  }

  // Display middle range
  // (Ex: 1 2 3 ... 20 || 1 ... 3 4 5 ... 20 || 1 ... 18 19 20)
  for (let i = startRange; i <= endRange; i++) {
    pages.push(i);
  }

  // Show ellipsis if endRange is less than one less the total pages
  if (endRange < totalPages - 1) {
    pages.push('ellipsis');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export default truncatePagination;
