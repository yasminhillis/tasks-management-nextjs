import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ColumnEmptyState from './ColumnEmptyState';
import ColumnPopulatedState from './ColumnPopulatedState';
import ColumnLoadingState from './ColumnLoadingState';
import { shimmer } from '../../../_components/loadingStyle';
import type { Task } from '@/lib/types';

type TaskColumnProps = {
  statusForRequest: string;
  statusForDisplay: string;
  projectId: string;
  statusColor: string;
  onFetchError: (error: 'fetchError' | 'networkError') => void;
  searchTerm: string | null;
  tasks: Task[];
  loadedTerm: string | null;
  taskCount: number; 
  fetchStatus: 'loading' | 'success' | 'idle'
};

export default function TaskColumn({
  statusForRequest,
  statusForDisplay,
  projectId,
  statusColor,
  onFetchError,
  searchTerm,
  tasks,
  loadedTerm,
  taskCount,
  fetchStatus
}: TaskColumnProps) {
  
  const router = useRouter();
  console.log(tasks, 'tasks ldsfkdslfm');
  console.log(fetchStatus, 'fetchStatus  oue2983');
  
  
  const currentTerm = searchTerm ?? '';
  const isLoading = fetchStatus !== 'success' || loadedTerm !== currentTerm;
  const isSearching = !!searchTerm;
  const isEmpty = tasks?.length === 0;

  console.log(loadedTerm, 'loaded term');
  console.log(currentTerm, 'current term');
  console.log(taskCount, 'taskCount');
  
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
            className={`badge-count ${isLoading ? `${shimmer} w-[18px] h-[19px]` : ''} px-[6px] py-[2px] rounded-xs ${statusForDisplay === 'BLOCKED' ? 'bg-[#FFDAD6] text-[#93000A]' : 'bg-[#0052CC1A]'}`}
          >
            {isLoading ? '' : taskCount}
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

      {isLoading ? (
        <ColumnLoadingState />
      ) : isEmpty ? (
        <ColumnEmptyState
          statusColor={statusColor}
          statusForDisplay={statusForDisplay}
          isSearching={isSearching}
        />
      ) : (
        <ColumnPopulatedState
          tasks={tasks}
          statusForDisplay={statusForDisplay}
        />
      )}
    </div>
  );
}
