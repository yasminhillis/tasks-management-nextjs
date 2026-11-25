import { Status } from '@/lib/types';
import TaskColumn from './TaskColumn';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import { useState, useEffect } from 'react';
import { COLUMN_PAGE_SIZE } from '@/lib/constants';
import type { Task } from '@/lib/types';

export default function BoardView({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string | null;
}) {
  const [error, setError] = useState<'fetchError' | 'networkError' | null>(
    null
  );

  const [loadedTerm, setLoadedTerm] = useState<string | null>('');
  const [taskCount, setTaskCount] = useState<Record<string, number>>({ '': 0 });
  const [fetchStatus, setFetchStatus] = useState<
    'loading' | 'success' | 'idle'
  >('idle');

  const [retryCount, setRetryCount] = useState(0);

  const [taskMap, setTaskMap] = useState<Record<string, Task[]>>({ '': [] });

  const statusArr = Object.values(Status).map((status) => status);

  async function fetchTasksByStatus(
    page: number,
    title: string | null,
    signal: AbortSignal,
    statusForRequest: string
  ) {
    const offset = (page - 1) * COLUMN_PAGE_SIZE;
    let url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}`;
    if (title)
      url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}&title=${encodeURIComponent(title)}`;

    const res = await fetch(url, { signal });

    if (!res.ok) {
      throw new Error('fetchError');
    }
    const { tasks, taskCount } = await res.json();
    return { tasks, taskCount };
  }

  useEffect(() => {
    const controller = new AbortController();
    async function buildBoard() {
      setFetchStatus('loading');
      const promises = statusArr.map((status) =>
        fetchTasksByStatus(1, searchTerm, controller.signal, status)
      );
      await Promise.all(promises)
        .then((results) => {
          for (let i = 0; i < results.length; i++) {
            setTaskMap((prev) => ({
              ...prev,
              [statusArr[i]]: results[i]?.tasks,
            }));
            setTaskCount((prev) => ({
              ...prev,
              [statusArr[i]]: results[i].taskCount,
            }));
          }
          setFetchStatus('success');
          setLoadedTerm(searchTerm);
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          console.log(err, 'err');
          setError(err instanceof TypeError ? 'networkError' : 'fetchError');
        });
    }

    buildBoard();
    return () => controller.abort();
  }, [projectId, searchTerm, retryCount]);

  if (error === 'fetchError') {
    return (
      <ErrorScreen
        message={`We're having trouble retrieving your
                 project tasks right now. Please try again in a moment`}
        buttonElement={true}
        onRetry={() => {
          setError(null);
          setRetryCount((prev) => prev + 1);
        }}
      />
    );
  }

  if (error === 'networkError') {
    return (
      <ErrorScreen
        title="You're offline"
        message={`Network error. Please check your connection and try again.`}
        buttonElement={true}
        onRetry={() => {
          setError(null);
          setRetryCount((prev) => prev + 1);
        }}
      />
    );
  }

  const statusColorMap = {
    TO_DO: '#94A3B8',
    IN_PROGRESS: '#0052CC',
    BLOCKED: '#BA1A1A',
    IN_REVIEW: '#4F5F7B',
    READY_FOR_QA: '#7C3AED',
    REOPENED: '#EA580C',
    READY_FOR_PRODUCTION: '#CA8A04',
    DONE: '#16A34A',
  };

  return (
    <div className="flex gap-6 w-[990px] h-[calc(100vh-190px)] overflow-x-scroll">
      {statusArr.map((status) => (
        <TaskColumn
          key={status}
          statusColor={statusColorMap[status]}
          projectId={projectId}
          statusForRequest={status}
          statusForDisplay={status.replaceAll('_', ' ')}
          searchTerm={searchTerm}
          tasks={taskMap[status]}
          loadedTerm={loadedTerm}
          taskCount={taskCount[status]}
          fetchStatus={fetchStatus}
        />
      ))}
    </div>
  );
}
