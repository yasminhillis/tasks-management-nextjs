'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
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
  const [fetchStatus, setFetchStatus] = useState<
    'loading' | 'success' | 'failed'
  >('loading');
  const [mobileCurrentPage, setMobileCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const titleFromURL = (searchParams.get('search') || '').trim();
  const currentPage =
    Number.isInteger(pageParam) && pageParam >= 1 ? pageParam : 1;
  const router = useRouter();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  const [title, setTitle] = useState(titleFromURL);
  const [searchTerm, setSearchTerm] = useState('');

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    setTitle(title);
  }

  function navigateToFirstPageAndSetSearchParam(title: string) {
    const trimmed = title.trim();
    if (trimmed === titleFromURL) return;
    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) {
      params.set('search', String(trimmed));
    } else {
      params.delete('search');
    }
    console.log(title === titleFromURL, 'title === titleFromURL');

    if (title === titleFromURL) {
      params.set('page', String(currentPage));
    } else params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`);
  }

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
      setFetchStatus('loading');
      const url = `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}&order=created_at.asc&title=${encodeURIComponent(titleFromURL.trim())}`;
      const res = await fetch(url);

      if (!res.ok) {
        const error = await res.json();

        if (error.message === 'page is out of range') {
          setError(error.message);
        } else {
          setError(error.message || 'Epic fetching failed');
        }
        setFetchStatus('failed');
        return;
      }
      const { data, totalCount } = await res.json();
      setDesktopEpics(data);
      setMobileEpics(data);
      setSearchTerm(titleFromURL);
      setMobileCurrentPage(page);
      setTotalCount(totalCount);
      setError('');
      setIsFetched(true);
      setFetchStatus('success');
    } catch (error) {
      setError('Network error. Please try again later');
      setFetchStatus('failed');
    }
  }

  async function loadMore(page: number) {
    try {
      const offset = (page - 1) * EPICS_PAGE_SIZE;
      const res = await fetch(
        `/api/epics?projectId=${projectId}&limit=${EPICS_PAGE_SIZE}&offset=${offset}&order=created_at.asc`
      );

      if (!res.ok) {
        const error = await res.json();
        setFetchStatus('failed');
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
      setFetchStatus('success');
    } catch (error) {
      setError('Network error. Please try again later');
      setFetchStatus('failed');
    }
  }

  function updateEpics(epics: Epic[], id: string, data: Partial<Epic>) {
    return epics.map((epic) => {
      if (epic.id === id) {
        return { ...epic, ...data };
      }
      return epic;
    });
  }

  function onEpicUpdate(id: string, data: Partial<Epic>) {
    setDesktopEpics((prev) => updateEpics(prev, id, data));
    setMobileEpics((prev) => updateEpics(prev, id, data));
  }

  useEffect(() => {
    fetchEpics(currentPage);
  }, [currentPage, titleFromURL]);

  useEffect(() => {
    const timer = setTimeout(
      () => navigateToFirstPageAndSetSearchParam(title),
      500
    );
    return () => clearTimeout(timer);
  }, [title]);

  return (
    <PageWrapper>
      <EpicsList
        projectId={projectId}
        epics={isMobile ? mobileEpics : desktopEpics}
        error={error}
        fetchStatus={fetchStatus}
        currentPage={currentPage}
        totalCount={totalCount}
        isFetched={isFetched}
        onPageChange={handlePageChange}
        pageSize={EPICS_PAGE_SIZE}
        onEpicUpdate={onEpicUpdate}
        title={title}
        handleTitleChange={handleTitleChange}
        searchTerm={searchTerm}
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
