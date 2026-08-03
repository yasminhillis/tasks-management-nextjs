import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import type { Task } from '@/lib/types';
import { formatDate } from '@/app/(protected)/_utils/formatDate';

type TaskColumnProps = {
  statusForRequest: string;
  statusForDisplay: string;
  projectId: string;
  statusColor: string;
};

export default function TaskColumn({
  statusForRequest,
  statusForDisplay,
  projectId,
  statusColor,
}: TaskColumnProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState(0);

  async function fetchTasksByStatus() {
    const res = await fetch(
      `/api/tasks?projectId=${projectId}&status=${statusForRequest}`
    );
    const { tasks, taskCount } = await res.json();
    setTasks(tasks ?? []);
    console.log(tasks, 'taskssaSaS');
    setTaskCount(taskCount);
  }

  useEffect(() => {
    fetchTasksByStatus();
  }, []);

  // let tasks = [
  //   {
  //     id: 'be23e42d-1119-4262-ad9d-e6bcec67eacc',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     epic_id: 'a773cc02-f09f-43d8-b5bd-0ea90320967b',
  //     title: 'بسم الله الرحمن الرحيم2',
  //     description: 'يارب يا الله',
  //     status: 'TO_DO',
  //     created_at: '2026-07-08T16:56:04.319441+00:00',
  //     due_date: null,
  //     task_id: 'TASK-3',
  //     epic: {
  //       id: 'a773cc02-f09f-43d8-b5bd-0ea90320967b',
  //       title: 'title fsdssd isjdfkhdsfjfhkds fsjfdkjfhsdkf sdfjkdshf',
  //       epic_id: 'EPIC-4',
  //     },
  //     created_by: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     assignee: {
  //       id: null,
  //       name: null,
  //       email: null,
  //       department: null,
  //     },
  //   },
  //   {
  //     id: 'ffbd8122-b0a1-48ab-8011-8ea0c32b82f8',
  //     project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  //     epic_id: 'a773cc02-f09f-43d8-b5bd-0ea90320967b',
  //     title: 'بسم الله الرحمن الرحيم2',
  //     description: 'يارب يا الله',
  //     status: 'TO_DO',
  //     created_at: '2026-07-08T16:56:10.516798+00:00',
  //     due_date: null,
  //     task_id: 'TASK-4',
  //     epic: {
  //       id: 'a773cc02-f09f-43d8-b5bd-0ea90320967b',
  //       title: 'title fsdssd isjdfkhdsfjfhkds fsjfdkjfhsdkf sdfjkdshf',
  //       epic_id: 'EPIC-4',
  //     },
  //     created_by: {
  //       id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
  //       name: 'Yasmin Ayman',
  //       email: 'yasminhillis7@gmail.com',
  //       department: 'Frontend',
  //     },
  //     assignee: {
  //       id: null,
  //       name: null,
  //       email: null,
  //       department: null,
  //     },
  //   },
  // ];
  return (
    <div className="flex flex-col gap-4 h-full w-[288px] max-h-[757px]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full w-[8px] h-[8px]`}
            style={{ backgroundColor: statusColor }}
          ></div>
          <h2 className="label-xs-status">{statusForDisplay}</h2>
          <div
            className={`badge-count px-[6px] py-[2px] rounded-xs ${statusForDisplay === 'BLOCKED' ? 'bg-[#FFDAD6] text-[#93000A]' : 'bg-[#0052CC1A]'}`}
          >
            {taskCount}
          </div>
        </div>
        <button className="cursor-pointer">
          <span
            className="material-symbols-outlined"
            style={{ color: '#94A3B8', fontSize: '17px' }}
          >
            add
          </span>
        </button>
      </div>
      <button className="label-xs-muted tracking-[1.2px] text-[#434654] opacity-60 text-xs uppercase border-2 border-dashed border-[#C3C6D64D] w-[288px] rounded-md flex justify-center items-center py-4 gap-2 cursor-pointer">
        <span
          className="material-symbols-outlined"
          style={{ color: '#434654', fontSize: '16px' }}
        >
          add_circle
        </span>
        Add New Task
      </button>
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            assigneeName={task.assignee?.name ?? 'Unassigned'}
            dueDate={task.due_date ? formatDate(task.due_date) : ''}
          />
        ))}
      </ul>
    </div>
  );
}
