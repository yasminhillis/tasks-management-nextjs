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
      // setTasks([])
      console.log(tasks, 'tasks 9999988888');
      setTaskFetchStatus('success');
    } catch (error) {
      setTaskFetchStatus('networkError');
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // const tasks: Task[] = [];

  // const tasks = [
  //   {
  //     assignee: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     created_at: '2026-08-21T09:12:00.000000+00:00',
  //     created_by: {
  //       id: '8a4e2f10-7b3d-4c9a-9e1f-2d5c6b8a9f01',
  //       name: 'Omar Farouk',
  //       email: 'omar.farouk@example.com',
  //       department: 'Backend',
  //     },
  //     description: 'Implement pagination for the tasks table view',
  //     due_date: '2026-08-29T21:00:00+00:00',
  //     epic: {
  //       id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //       title: 'test upbjmbdate test 72816',
  //       epic_id: 'EPIC-1',
  //     },
  //     epic_id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //     id: '3f8a1c22-4e5b-4a6d-9f1e-7c8b9d0a1b2c',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     status: 'IN_PROGRESS',
  //     task_id: 'TASK-42',
  //     title: 'Add pagination to task list',
  //   },
  //   {
  //     assignee: {
  //       id: '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
  //       name: 'Laila Ahmed',
  //       email: 'laila.ahmed@example.com',
  //       department: 'Design',
  //     },
  //     created_at: '2026-08-21T10:45:22.100000+00:00',
  //     created_by: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     description: 'Redesign the task detail modal to match new spec',
  //     due_date: '2026-08-30T21:00:00+00:00',
  //     epic: {
  //       id: '9d0e1f2a-3b4c-4d5e-8f6a-7b8c9d0e1f2a',
  //       title: 'UI Refresh Q3',
  //       epic_id: 'EPIC-2',
  //     },
  //     epic_id: '9d0e1f2a-3b4c-4d5e-8f6a-7b8c9d0e1f2a',
  //     id: '6c7d8e9f-0a1b-4c2d-9e3f-4a5b6c7d8e9f',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     status: 'TO_DO',
  //     task_id: 'TASK-43',
  //     title: 'Redesign task detail modal',
  //   },
  //   {
  //     assignee: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     created_at: '2026-08-22T08:00:15.500000+00:00',
  //     created_by: {
  //       id: '8a4e2f10-7b3d-4c9a-9e1f-2d5c6b8a9f01',
  //       name: 'Omar Farouk',
  //       email: 'omar.farouk@example.com',
  //       department: 'Backend',
  //     },
  //     description: '',
  //     due_date: '2026-08-28T21:00:00+00:00',
  //     epic: {
  //       id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //       title: 'test upbjmbdate test 72816',
  //       epic_id: 'EPIC-1',
  //     },
  //     epic_id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //     id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     status: 'TO_DO',
  //     task_id: 'TASK-44',
  //     title: 'Fix Supabase RLS policy for tasks table',
  //   },
  //   {
  //     assignee: {
  //       id: '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
  //       name: 'Laila Ahmed',
  //       email: 'laila.ahmed@example.com',
  //       department: 'Design',
  //     },
  //     created_at: '2026-08-22T14:30:44.320000+00:00',
  //     created_by: {
  //       id: '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
  //       name: 'Laila Ahmed',
  //       email: 'laila.ahmed@example.com',
  //       department: 'Design',
  //     },
  //     description: 'Review and update the empty states across all list views',
  //     due_date: '2026-09-01T21:00:00+00:00',
  //     epic: {
  //       id: '9d0e1f2a-3b4c-4d5e-8f6a-7b8c9d0e1f2a',
  //       title: 'UI Refresh Q3',
  //       epic_id: 'EPIC-2',
  //     },
  //     epic_id: '9d0e1f2a-3b4c-4d5e-8f6a-7b8c9d0e1f2a',
  //     id: '2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     status: 'IN_REVIEW',
  //     task_id: 'TASK-45',
  //     title: 'Update empty states',
  //   },
  //   {
  //     assignee: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     created_at: '2026-08-23T11:05:09.870000+00:00',
  //     created_by: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     description: 'Add Zod validation schema for task creation form',
  //     due_date: '2026-08-26T21:00:00+00:00',
  //     epic: {
  //       id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //       title: 'test upbjmbdate test 72816',
  //       epic_id: 'EPIC-1',
  //     },
  //     epic_id: 'c1d4fa7a-3c80-4ea0-8378-d79c7f11bd36',
  //     id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     status: 'DONE',
  //     task_id: 'TASK-46',
  //     title: 'Add Zod schema for task form',
  //   },
  // ];

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
