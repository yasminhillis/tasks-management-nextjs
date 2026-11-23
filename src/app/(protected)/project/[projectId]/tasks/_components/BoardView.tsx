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

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadedTerm, setLoadedTerm] = useState('');
  const [taskCount, setTaskCount] = useState<Record<string, number>>({'': 0});
  const [fetchStatus, setFetchStatus] = useState<'loading' | 'success'>(
    'loading'
  );

  /// {todo: []}

  const [taskMap, setTaskMap] = useState<Record<string, Task[]>>({'': []}) 

  const statusArr = Object.values(Status).map((status) => status);

  async function fetchTasksByStatus(
    page: number,
    title: string | null,
    signal: AbortSignal, 
    statusForRequest: string
  ) {
    try {
      const offset = (page - 1) * COLUMN_PAGE_SIZE;
      let url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}`;
      if (title)
        url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}&title=${encodeURIComponent(title)}`;

      const res = await fetch(url, { signal });

      if (!res.ok) {
        // onFetchError('fetchError');
        setError('fetchError');
        return;
      }
      const { tasks, taskCount } = await res.json();
      // setTasks(tasks ?? []);
      setTaskMap(prev => ({...prev, [statusForRequest]: tasks}))
      setLoadedTerm(title ?? '');
      setTaskCount((prev) => ({...prev, [statusForRequest]: taskCount}));
      setFetchStatus('success');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      // onFetchError('networkError');
      setError('fetchError');
      return;
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    // fetchTasksByStatus(1, searchTerm, controller.signal, '');
    const promises = statusArr.map(status => fetchTasksByStatus(1, searchTerm, controller.signal, status))
    Promise.all(promises).then(results => console.log(results, 'results88')).catch(err => console.log(err, 'err'));
    // console.log(promises, 'promises');
    
    return () => controller.abort();
  }, [projectId, searchTerm, error]);

  if (error === 'fetchError') {
    return (
      <ErrorScreen
        message={`We're having trouble retrieving your
                 project tasks right now. Please try again in a moment`}
        buttonElement={true}
        onRetry={() => setError(null)}
      />
    );
  }

  if (error === 'networkError') {
    return (
      <ErrorScreen
        title="You're offline"
        message={`Network error. Please check your connection and try again.`}
        buttonElement={true}
        onRetry={() => setError(null)}
      />
    );
  }

  // console.log(statusArr, 'status arr');
  console.log(taskMap);
  // console.log(taskCount);
  

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
          onFetchError={setError}
          searchTerm={searchTerm}
          tasks={taskMap[status]}
          loadedTerm={loadedTerm}
          taskCount={taskCount}
          fetchStatus={fetchStatus}
        />
      ))}
    </div>
  );
}
