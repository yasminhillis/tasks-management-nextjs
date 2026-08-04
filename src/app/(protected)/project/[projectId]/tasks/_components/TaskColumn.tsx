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
