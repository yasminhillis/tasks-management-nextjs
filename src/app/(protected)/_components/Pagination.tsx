'use client';

import { getTruncatedPagination } from '../_utils/getTruncatedPagination';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  isFetched: boolean;
  onPageChange: (page: number) => void;
  pageSize: number;
};

export default function Pagination({
  currentPage,
  totalCount,
  isFetched,
  onPageChange,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);  
  if (totalPages <= 1) return null;
  const truncatedPagination = getTruncatedPagination(
    1,
    currentPage,
    totalPages
  );
  console.log(truncatedPagination, 'pagination');
  console.log(currentPage, 'current');

  const pageButtons = truncatedPagination.map((page, index) => {
    if (typeof page === 'number') {
      return (
        <button
          key={index + 1}
          onClick={() => onPageChange(page)}
          className={`w-[32px] h-[32px] rounded-xs flex items-center 
              justify-center border border-[#C3C6D64D] ${currentPage === page ? 'border border-transparent bg-[#003D9B] text-white' : 'border border-[#C3C6D64D] text-[#434654]'}
              font-bold text-xs cursor-pointer`}
        >
          {page}
        </button>
      );
    } else {
      return (
        <span
          key={page}
          className="w-[32px] h-[32px] rounded-xs flex items-center justify-center border border-[#C3C6D64D] font-bold text-xs"
        >
          {page}
        </span>
      );
    }
  });

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  }

  if (totalPages <= 1) return null;
  return (
    isFetched && (
      <div className="hidden md:flex justify-between items-center mb-[121px]">
        <h3>
          Showing {pageSize} of {totalCount} epics
        </h3>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-[32px] h-[32px] rounded-xs 
        flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '12px' }}
            >
              arrow_back_ios_new
            </span>
          </button>

          {pageButtons}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-[32px] h-[32px] 
        rounded-xs flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '12px' }}
            >
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>
    )
  );
}
