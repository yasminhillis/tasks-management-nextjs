import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import { useRouter } from 'next/navigation';
import ColumnEmptyState from './ColumnEmptyState';
import ColumnPopulatedState from './ColumnPopulatedState';
import ColumnLoadingState from './ColumnLoadingState';
import { shimmer } from '../../../_components/loadingStyle';
import { COLUMN_PAGE_SIZE } from '@/lib/constants';

type TaskColumnProps = {
  statusForRequest: string;
  statusForDisplay: string;
  projectId: string;
  statusColor: string;
  onFetchError: (error: 'fetchError' | 'networkError') => void;
  error: 'fetchError' | 'networkError' | null;
  searchTerm: string | null;
};

export default function TaskColumn({
  statusForRequest,
  statusForDisplay,
  projectId,
  statusColor,
  onFetchError,
  error,
  searchTerm,
}: TaskColumnProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState(0);
  const [fetchStatus, setFetchStatus] = useState<
    'idle' | 'loading' | 'success'
  >('idle');
  const router = useRouter();

  async function fetchTasksByStatus(page: number, title?: string | null) {
    try {
      setFetchStatus('loading');
      const offset = (page - 1) * COLUMN_PAGE_SIZE;
      let url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}`;
      if (title && title !== null)
        url = `/api/tasks?projectId=${projectId}&status=${statusForRequest}&limit=${COLUMN_PAGE_SIZE}&offset=${offset}&title=${encodeURIComponent(title)}`;
      // console.log(url, 'url 999');

      const res = await fetch(url);

      if (!res.ok) {
        onFetchError('fetchError');
        return;
      }
      const { tasks, taskCount } = await res.json();
      setTasks(tasks ?? []);
      setTaskCount(taskCount);
      setFetchStatus('success');
    } catch (error) {
      onFetchError('networkError');
      return;
    }
  }
  // console.log(searchTerm, 'seatch tem 233123');

  useEffect(() => {
    fetchTasksByStatus(1, searchTerm);
  }, [projectId, searchTerm]);

  // useEffect(() => {
  //   fetchTasksByStatus(1, searchTerm)
  // }, [searchTerm])

  return (
    <div className="flex flex-col gap-4 h-full w-[288px] max-h-[757px] min-h-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full w-[8px] h-[8px]`}
            style={{ backgroundColor: statusColor }}
          ></div>
          <h2 className="label-xs-status">{statusForDisplay}</h2>
          <div
            className={`badge-count ${fetchStatus === 'loading' ? `${shimmer} w-[18px] h-[19px]` : ''} px-[6px] py-[2px] rounded-xs ${statusForDisplay === 'BLOCKED' ? 'bg-[#FFDAD6] text-[#93000A]' : 'bg-[#0052CC1A]'}`}
          >
            {fetchStatus === 'success' ? taskCount : ''}
          </div>
        </div>

        <button
          className="cursor-pointer add-task-btn"
          onClick={() =>
            router.push(
              `/project/${projectId}/tasks/new?status=${statusForRequest}`
            )
          }
        >
          <span
            className="material-symbols-outlined add-task-icon"
            style={{
              fontSize: '17px',
            }}
          >
            add
          </span>
        </button>
      </div>
      <button
        onClick={() =>
          router.push(
            `/project/${projectId}/tasks/new?status=${statusForRequest}`
          )
        }
        className="btn-add-task tracking-[1.2px] text-[#434654] opacity-60 text-xs uppercase border-2 border-dashed border-[#C3C6D64D] w-[288px] rounded-md flex justify-center items-center py-4 gap-2 cursor-pointer"
      >
        <span
          className="material-symbols-outlined"
          style={{ color: '#434654', fontSize: '16px' }}
        >
          add_circle
        </span>
        Add New Task
      </button>

      {
      fetchStatus === 'loading' &&
      error === null ? (
        <ColumnLoadingState />
      ) : taskCount === 0 && fetchStatus === 'success' && error === null ? (
        <ColumnEmptyState
          statusColor={statusColor}
          statusForDisplay={statusForDisplay}
        />
      ) : fetchStatus === 'success' && error === null ? (
        <ColumnPopulatedState
          tasks={tasks}
          statusForDisplay={statusForDisplay}
        />
      ) : null}
    </div>
  );
}
