'use client';
import { PROJECTS_PAGE_SIZE, EPICS_PAGE_SIZE } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchEpics } from '@/lib/store/slices/epicSlice';
import { fetchProjects } from '@/lib/store/slices/projectsSlice';
import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  slice: 'epics' | 'projects';
};

export default function InfiniteScroll({ slice }: InfiniteScrollProps) {
  const dispatch = useAppDispatch();
  // const { isLoading, currentPage, totalCount } = useAppSelector(
  //   (state) => state.projects
  // );

  const epicData = useAppSelector((state) => state.epics);
  const projectData = useAppSelector((state) => state.projects);
  const { currentPage, totalCount } =
    slice === 'epics' ? epicData : projectData;
  const pageSize = slice === 'epics' ? EPICS_PAGE_SIZE : PROJECTS_PAGE_SIZE;
  const totalPages = Math.ceil(totalCount / pageSize);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const projectId = epicData.projectId;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (isFetchingRef.current || currentPage === totalPages) return;
        isFetchingRef.current = true;
        if (slice === 'projects') {
          dispatch(
            fetchProjects({
              page: currentPage + 1,
              limit: pageSize,
              mode: 'mobile',
            })
          ).finally(() => {
            isFetchingRef.current = false;
          });
        } else {
          dispatch(
            fetchEpics({
              projectId,
              page: currentPage + 1,
              limit: pageSize,
              mode: 'mobile'
            })
          ).finally(() => {
            isFetchingRef.current = false;
          });
        }
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
