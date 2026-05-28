'use client';
import { PAGE_SIZE } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchProjects } from '@/lib/store/slices/projectsSlice';
import { useEffect, useRef } from 'react';

export default function InfiniteScroll() {
  const dispatch = useAppDispatch();
  const { isLoading, currentPage, totalCount } = useAppSelector(
    (state) => state.projects
  );
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (isFetchingRef.current || currentPage === totalPages) return;
        isFetchingRef.current = true;
        dispatch(
          fetchProjects({
            page: currentPage + 1,
            limit: PAGE_SIZE,
            mode: 'mobile',
          })
        ).finally(() => {
          isFetchingRef.current = false;
        });
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
