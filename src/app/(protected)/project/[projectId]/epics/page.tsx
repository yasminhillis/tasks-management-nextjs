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
     
      const res = await fetch(
        `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}`
      );

      if (!res.ok) {
        const error = await res.json();
        console.log(error, 'errrrrrrrrorrrrrrrrrrrr');
        setLoading('failed');
        setError(error.message || 'Epic fetching failed');
        return;
      }

      const { data, totalCount } = await res.json();

      // setEpics(data);
      if (page > 1) {
        // setEpics((prev) => {
        //   const existingIds = new Set(prev.map((epic: Epic) => epic.id));
        //   console.log(
        //     ...prev,
        //     ...data.filter((epic: Epic) => !existingIds.has(epic.id))
        //   );

        //   return [
        //     ...prev,
        //     ...data.filter((epic: Epic) => !existingIds.has(epic.id)),
        //   ];
        // });

        const existingIds = new Set(epics.map((epic: Epic) => epic.id));
        const newEpics = data.filter((epic: Epic) => !existingIds.has(epic.id));

        setEpics((prev) => [...prev, ...newEpics]);
      } else {
        setEpics(data);
      }
      console.log(epics, 'epics');

      setTotalCount(totalCount);
      setCurrentPage(page);
      console.log(page);

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
