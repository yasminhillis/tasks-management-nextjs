'use client';

import { useParams } from 'next/navigation';
import InfiniteScroll from '../../../_components/InfiniteScroll';
import PageWrapper from '../../_components/PageWrapper';
import EpicsList from './EpicsLists';
import { useEffect, useState } from 'react';
import type { Epic } from '@/lib/types';
import { EPICS_PAGE_SIZE } from '@/lib/constants';

export default function Epics() {
  const { projectId } = useParams<{ projectId: string }>();
  const [desktopEpics, setDesktopEpics] = useState<Epic[]>([]);
  const [mobileEpics, setMobileEpics] = useState<Epic[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [desktopCurrentPage, setDesktopCurrentPage] = useState(1);
  const [mobileCurrentPage, setMobileCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    function checkScreenWidth() {
      setIsMobile(window.innerWidth < 768);
    }
    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  async function fetchEpics(page: number) {
    try {
      const offset = (page - 1) * EPICS_PAGE_SIZE;

      const res = await fetch(
        `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}`
      );

      if (!res.ok) {
        const error = await res.json();
        setLoading('failed');
        setError(error.message || 'Epic fetching failed');
        return;
      }

      const { data, totalCount } = await res.json();
      setDesktopEpics(data);
      setMobileEpics(data)
      setMobileCurrentPage(page)
      setDesktopCurrentPage(page);
      setTotalCount(totalCount);
      setError('')
      setIsFetched(true);
      setLoading('success');
    } catch (error) {
      console.log(error);
      setError('Network error. Please try again later');
      setLoading('failed');
    }
  }

  async function loadMore(page: number) {
    try {
      const offset = (page - 1) * EPICS_PAGE_SIZE;

      const res = await fetch(
        `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}`
      );

      if (!res.ok) {
        const error = await res.json();
        setLoading('failed');
        setError(error.message || 'Epic fetching failed');
        return;
      }

      const { data, totalCount } = await res.json();
      setMobileEpics((prev) => {
        const existingIds = new Set(prev.map((epic: Epic) => epic.id));
        const newEpics = data.filter((epic: Epic) => !existingIds.has(epic.id));
        return [...prev, ...newEpics];
      });
      setMobileCurrentPage(page);
      setTotalCount(totalCount);
      setIsFetched(true);
      setLoading('success');
    } catch (error) {
      console.log(error);
      setError('Network error. Please try again later');
      setLoading('failed');
    }
  }

  useEffect(() => {
    fetchEpics(1);
  }, []);

  return (
    <PageWrapper>
      <EpicsList
        projectId={projectId}
        epics={isMobile ? mobileEpics : desktopEpics}
        error={error}
        loading={loading}
        currentPage={isMobile ? mobileCurrentPage : desktopCurrentPage}
        totalCount={totalCount}
        isFetched={isFetched}
        onPageChange={fetchEpics}
        pageSize={EPICS_PAGE_SIZE}
      />
      <InfiniteScroll
        totalCount={totalCount}
        currentPage={mobileCurrentPage}
        pageSize={EPICS_PAGE_SIZE}
        onScroll={loadMore}
      />
    </PageWrapper>
  );
}
