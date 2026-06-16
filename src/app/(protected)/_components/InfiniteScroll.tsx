'use client';
import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onScroll: (page: number) => Promise<void>;
};

export default function InfiniteScroll({
  currentPage,
  totalCount,
  pageSize,
  onScroll,
}: InfiniteScrollProps) {
  
  const totalPages = Math.ceil(totalCount / pageSize);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (isFetchingRef.current || currentPage === totalPages) return;
        isFetchingRef.current = true;
        onScroll(currentPage + 1).finally(
          () => (isFetchingRef.current = false)
        );
      }
    });
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [currentPage, totalPages]);


  return (
    <div className="md:hidden">
      <div ref={bottomRef} className="h-[1px]"></div>
    </div>
  );
}
