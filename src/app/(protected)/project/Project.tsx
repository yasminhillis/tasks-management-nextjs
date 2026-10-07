'use client';
import { useEffect, useState } from 'react';
import InfiniteScroll from '../_components/InfiniteScroll';
import PageWrapper from './_components/PageWrapper';
import ProjectsList from './ProjectsList';
import { PROJECTS_PAGE_SIZE } from '@/lib/constants';
import type { Project } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Project() {
  const [error, setError] = useState('');
  const [fetchingStatus, setFetchingStatus] = useState<
    'loading' | 'success' | 'failed'
  >('loading');
  const [projects, setProjects] = useState<Project[]>([]);
  const [mobileProjects, setMobileProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [currentMobilePage, setMobileCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname()
  console.log(pathname, 'pathname33');
  console.log(searchParams.get('page'), 'searchParams.get(page)');
  console.log(typeof searchParams.get('page'), 'searchParams.get(page)');
  console.log(searchParams, 'searchParams');
  console.log(typeof searchParams, 'typeof searchParams');
  console.log(searchParams.toString(), 'searchParams toString');
  
  const pageParam = Number(searchParams.get('page'));
  // const validatePage =  Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1
  // console.log(totalCount, 'totalCount 6785');
  // const totalPages = Math.ceil(totalCount / PROJECTS_PAGE_SIZE);
  
  // const currentPage = (validatePage > totalPages) ? totalPages : validatePage;

  const currentPage = Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  function handlePageChange(page: number){
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`)
  }

  async function fetchProjects(page: number) {
    try {
      const offset = (page - 1) * PROJECTS_PAGE_SIZE;
      const res = await fetch(
        `/api/projects?limit=${PROJECTS_PAGE_SIZE}&offset=${offset}`
      );
      if (!res.ok) {
        const error = await res.json();
        setError(error.message || 'fetching projects failed');
        setFetchingStatus('failed');
        return;
      }
      const { data, totalCount } = await res.json();
      setProjects(data);
      setMobileProjects(data);
      setError('');
      setIsFetched(true);
      setTotalCount(totalCount);
      setFetchingStatus('success');
    } catch (error) {
      setError('Network error. Please try again later');
      setFetchingStatus('failed');
    }
  }

  async function loadMore(page: number) {
    const offset = (page - 1) * PROJECTS_PAGE_SIZE;

    const res = await fetch(
      `/api/projects?limit=${PROJECTS_PAGE_SIZE}&offset=${offset}`
    );
    setFetchingStatus('loading');
    if (!res.ok) {
      const error = await res.json();
      setError(error.message || 'fetching projects failed');
      setFetchingStatus('failed');
      return;
    }
    const { data, totalCount } = await res.json();

    setMobileProjects((prev) => {
      const existingIds = new Set(prev.map((p: Project) => p.id));
      const newProjects = data.filter((p: Project) => !existingIds.has(p.id));
      return [...prev, ...newProjects];
    });

    setMobileCurrentPage(page);
    setTotalCount(totalCount);
  }

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  return (
    <PageWrapper>
      <ProjectsList
        projects={isMobile ? mobileProjects : projects}
        loading={fetchingStatus}
        error={error}
        totalCount={totalCount}
        currentPage={currentPage}
        isFetched={isFetched}
        fetchProjects={fetchProjects}
        pageSize={PROJECTS_PAGE_SIZE}
        onPageChange={handlePageChange}
      />
      <InfiniteScroll
        totalCount={totalCount}
        currentPage={currentMobilePage}
        pageSize={PROJECTS_PAGE_SIZE}
        onScroll={loadMore}
      />
    </PageWrapper>
  );
}
