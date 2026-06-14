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
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  async function fetchProjects(page: number) {
    try {
      const offset = (page - 1) * PROJECTS_PAGE_SIZE;
      // console.log(page, 'page');

      setLoading('loading');
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
      if (page > 1) {
        const existingIds = new Set(projects.map((p: Project) => p.id));
        const newProjects = data.filter((p: Project) => !existingIds.has(p.id));

        setProjects((prev) => [...prev, ...newProjects]);
      } else {
        setProjects(data);
      }
      setIsFetched(true);
      setTotalCount(totalCount);
      setCurrentPage(page);
      setLoading('success');
    } catch (error) {
      setError('Network error. Please try again later');
      setLoading('failed');
    }
  }

  useEffect(() => {
    fetchProjects(1);
  }, []);
  return (
    <PageWrapper>
      <ProjectsList
        projects={projects}
        loading={loading}
        error={error}
        totalCount={totalCount}
        currentPage={currentPage}
        isFetched={isFetched}
        fetchProjects={fetchProjects}
        pageSize={PROJECTS_PAGE_SIZE}
      />
      <InfiniteScroll
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={PROJECTS_PAGE_SIZE}
        onScroll={fetchProjects}
      />
    </PageWrapper>
  );
}
