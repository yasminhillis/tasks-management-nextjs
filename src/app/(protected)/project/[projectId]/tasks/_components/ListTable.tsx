import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import { formatDate } from '@/app/(protected)/_utils/formatDate';
import Initials from '@/components/Initials';
import { useEffect, useState } from 'react';
import type { Task } from '@/lib/types';
import type { Status } from '@/lib/types';
import { useRouter } from 'next/navigation';
import ListTableLoadingState from './ListTableLoadingState';

export default function ListTable({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskFetchStatus, setTaskFetchStatus] = useState<
    'idle' | 'loading' | 'success' | 'fetchError' | 'networkError'
  >('idle');

  const router = useRouter();

  async function fetchTasks() {
    try {
      setTaskFetchStatus('loading');
      const res = await fetch(`/api/tasks?projectId=${projectId}`);
      if (!res.ok) {
        setTaskFetchStatus('fetchError');
      }
      const { tasks } = await res.json();
      setTasks(tasks);
      setTaskFetchStatus('success');
    } catch (error) {
      setTaskFetchStatus('networkError');
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const statusColor = {
    IN_PROGRESS: { bg: '#CDDDFF', text: '#1D4ED8' },
    TO_DO: { bg: '#D7E2FF', text: '#475569' },
    BLOCKED: { bg: '#FFDAD6', text: '#93000A' },
    IN_REVIEW: { bg: '#4F5F7B', text: '#B45309' },
    READY_FOR_QA: { bg: '#7C3AED', text: '#6D28D9' },
    REOPENED: { bg: '#FFEAD2', text: '#B25E00' },
    READY_FOR_PRODUCTION: { bg: '#CA8A04', text: '#0F766E' },
    DONE: { bg: '#16A34A', text: '#002113' },
  };

  return taskFetchStatus === 'loading' || taskFetchStatus === 'idle' ? (
    <ListTableLoadingState />
  ) : (
    <table className="rounded-lg shadow-card w-full">
      <thead className="bg-[#F1F3FF80] border-b border-b-[#C3C6D61A] h-[47px] w-full">
        <tr className="text-left">
          <th className="table-header-label w-[175px] px-6 py-[18.5px]">
            Task ID
          </th>
          <th className="table-header-label w-[354px] px-6 py-[18.5px]">
            Title
          </th>
          <th className="table-header-label px-6 py-[18.5px] text-left">
            Status
          </th>
          <th className="table-header-label px-6 py-[18.5px]">Due Date</th>
          <th className="table-header-label px-6 py-[18.5px]">Assignee</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0  && taskFetchStatus === 'success' ? (
          <tr>
            <td colSpan={5}>
              <div className="flex flex-col items-center justify-center gap-4 h-[280px]">
                <h4 className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '16px' }}
                  >
                    warning
                  </span>
                  No tasks found
                </h4>
                <button
                  onClick={() => router.push(`/project/${projectId}/tasks/new`)}
                  className="hidden md:inline-flex rounded-xs items-center justify-center gap-2 px-[16px] py-[8px] shadow-blue-md bg-radial from-[#003D9B] to-[#0052CC] text-white text-sm cursor-pointer hover:from-[#1259cb] hover:to-[#246fdf] transition-colors font-semibold"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#fff', fontSize: '16px' }}
                  >
                    add_circle
                  </span>
                  Add New Task
                </button>
              </div>
            </td>
          </tr>
        ) :  (
          tasks.map((task) => (
            <tr key={task.id} className="border-t border-t-[#F1F3FF]">
              <td className="table-cell-id px-6 py-[18.5px]">{task.task_id}</td>
              <td className="table-cell-title px-6 py-[18.5px]">
                {task.title}
              </td>
              <td className="w-[137px] px-6 py-[18.5px]">
                <div
                  className="table-status-badge status-pill bg-blue-300 whitespace-nowrap"
                  style={{
                    backgroundColor:
                      statusColor[task.status?.replaceAll('_', ' ') as Status]
                        ?.bg,
                    color:
                      statusColor[task.status?.replaceAll('_', ' ') as Status]
                        ?.text,
                  }}
                >
                  {task.status?.replaceAll('_', ' ')}
                </div>
              </td>
              <td className="table-cell-date w-[139px] px-6 py-[18.5px] whitespace-nowrap">
                {task.due_date ? formatDate(task.due_date) : 'No due date'}
              </td>
              <td className="table-cell-assignee w-[163px] px-6 py-[18.5px] whitespace-nowrap">
                {task.assignee?.name ? (
                  <div className="flex items-center gap-3">
                    <Initials
                      name={task.assignee.name}
                      mode="desktop"
                      state="success"
                      extraStyles="w-[28px] h-[28px] task-card-avatar rounded-full bg-red-200"
                    />
                    <h4 className="table-cell-assignee">
                      {task.assignee.name}
                    </h4>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="rounded-full w-[28px] h-[28px] text-[#4F5F7B] bg-[#E8EDFF] inline-flex justify-center items-center">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '16px' }}
                      >
                        person_off
                      </span>
                    </span>
                    <h4 className="table-cell-assignee">Unassigned</h4>
                  </div>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
