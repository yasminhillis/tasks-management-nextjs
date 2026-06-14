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
  const [epics, setEpics] = useState<Epic[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  async function fetchEpics(page: number) {
    try {
      const offset = (page - 1) * EPICS_PAGE_SIZE;
      setLoading('loading');
      const res = await fetch(
        `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}`
      );
      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        setLoading('failed');
        setError(error.message || 'Epic fetching failed');
        return;
        // setError()
      }

      const { data, totalCount } = await res.json();
      // console.log(epics, 'epics');
      setLoading('success');
      setEpics(data);
      setTotalCount(totalCount);
      setCurrentPage(page);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
      setLoading('failed');
      // netwrok erro
    }
  }

  useEffect(() => {
    fetchEpics(1);
  }, []);

  return (
    <PageWrapper>
      <EpicsList
        projectId={projectId}
        epics={epics}
        error={error}
        loading={loading}
        currentPage={currentPage}
        totalCount={totalCount}
        isFetched={isFetched}
        onPageChange={fetchEpics}
        pageSize={EPICS_PAGE_SIZE}
      />
      <InfiniteScroll
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={EPICS_PAGE_SIZE}
        onScroll={fetchEpics}
      />
    </PageWrapper>
  );
}
