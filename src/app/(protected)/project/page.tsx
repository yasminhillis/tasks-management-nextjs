'use client'
import { useEffect, useState } from 'react';
import InfiniteScroll from '../_components/InfiniteScroll';
import PageWrapper from './_components/PageWrapper';
import ProjectsList from './ProjectsList';
import { PROJECTS_PAGE_SIZE } from '@/lib/constants';
import type { Project } from '@/lib/types';

export default function Project() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle')
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0);
  async function fetchProjects(page: number){
    try {
      const offset = (page - 1) * PROJECTS_PAGE_SIZE;
      setLoading('loading')
      const res = await fetch(`/api/projects?limit=${PROJECTS_PAGE_SIZE}&offset=${offset}`);
      if (!res.ok) {
        const error = await res.json(); 
        console.log(error);
        setError(error.message || 'fetching projects failed')
        setLoading('failed');
        return;
      }
      const {data, totalCount} = await res.json();
      setProjects(data)
      setIsFetched(true)
      setTotalCount(totalCount)
      setCurrentPage(page)
      setLoading('success')
    } catch(error) {

    }
  }

  useEffect(() => {
    fetchProjects(1)
  }, [])
  return (
    <PageWrapper>
      <ProjectsList projects={projects} loading={loading} error={error} totalCount={totalCount} currentPage={currentPage} isFetched={isFetched} fetchProjects={fetchProjects} pageSize={PROJECTS_PAGE_SIZE} />
      <InfiniteScroll slice="projects" />
    </PageWrapper>
  );
}
