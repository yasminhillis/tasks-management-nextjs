'use client';
import { useEffect, useState } from 'react';
import InfiniteScroll from '../_components/InfiniteScroll';
import PageWrapper from './_components/PageWrapper';
import ProjectsList from './ProjectsList';
import { PROJECTS_PAGE_SIZE } from '@/lib/constants';
import type { Project } from '@/lib/types';

export default function Project() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [projects, setProjects] = useState<Project[]>([]);
  const [mobileProjects, setMobileProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [currentDesktopPage, setDesktopCurrentPage] = useState(1);
  const [currentMobilePage, setMobileCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  async function fetchProjects(page: number) {
    try {
      const offset = (page - 1) * PROJECTS_PAGE_SIZE;
      const res = await fetch(
        `/api/projects?limit=${PROJECTS_PAGE_SIZE}&offset=${offset}`
      );
      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        setError(error.message || 'fetching projects failed');
        setLoading('failed');
        return;
      }
      const { data, totalCount } = await res.json();
      setProjects(data);

      if (window.innerWidth < 768) {
        setMobileProjects(data)
      }

      setIsFetched(true);
      setTotalCount(totalCount);
      setDesktopCurrentPage(page);
      setLoading('success');
    } catch (error) {
      setError('Network error. Please try again later');
      setLoading('failed');
    }
  }

  async function loadMore(page: number) {
    const offset = (page - 1) * PROJECTS_PAGE_SIZE;

    const res = await fetch(
      `/api/projects?limit=${PROJECTS_PAGE_SIZE}&offset=${offset}`
    );
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      setError(error.message || 'fetching projects failed');
      setLoading('failed');
      return;
    }
    const { data, totalCount } = await res.json();

    setMobileProjects((prev) => {
      const existingIds = new Set(prev.map((p: Project) => p.id));
      const newProjects = data.filter((p: Project) => !existingIds.has(p.id));
      return [...prev, ...newProjects]
    });

    setMobileCurrentPage(page)
    setTotalCount(totalCount)
  }

  useEffect(() => {
    console.log('here');
    
    fetchProjects(1);
    // loadMore(1)
  }, []);

  return (
    <PageWrapper>
      <ProjectsList
        projects={isMobile ? mobileProjects : projects}
        loading={loading}
        error={error}
        totalCount={totalCount}
        currentPage={currentDesktopPage}
        isFetched={isFetched}
        fetchProjects={fetchProjects}
        pageSize={PROJECTS_PAGE_SIZE}
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
