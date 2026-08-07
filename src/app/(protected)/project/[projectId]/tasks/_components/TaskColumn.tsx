import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import type { Task } from '@/lib/types';
import { formatDate } from '@/app/(protected)/_utils/formatDate';
import { useRouter } from 'next/navigation';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';

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
  const [fetchError, setFetchError] = useState('');
  const [networkError, setNetworkError] = useState('');

  const router = useRouter();

  async function fetchTasksByStatus() {
    console.log('kk');
    setFetchError('');
    setNetworkError('')
        try {
      const res = await fetch(
        `/api/tasks?projectId=${projectId}&status=${statusForRequest}`
      );

      console.log(res, 'res');

      if (!res.ok) {
        const error = await res.json();
        console.log(error, 'error fetching tasks');
        setFetchError(`We're having trouble retrieving your
                 project tasks right now. Please try again in a moment.`);
                 return;
        // return <ErrorScreen message="We're having trouble retrieving your
        //         project tasks right now. Please try
        //         again in a moment."/>;
      }
      const { tasks, taskCount } = await res.json();
      setTasks(tasks ?? []);
      console.log(tasks, 'taskssaSaS');
      setTaskCount(taskCount);
    } catch (error) {
      console.log('network error');
      setNetworkError('Network error. Please check your connection and try again.');
      return;
      // return (
      //   <ErrorScreen
      //     title="You're offline"
      //     message={`Network error. Please check your connection and try again.`}
      //     buttonElement={true}
      //   />
      // );
    }
  }

  useEffect(() => {
    fetchTasksByStatus();
  }, []);

  if (fetchError) {
     return <ErrorScreen message="We're having trouble retrieving your
                project tasks right now. Please try
                again in a moment."/>;
  }

  if (networkError) {
      return (
        <ErrorScreen
          title="You're offline"
          message={`Network error. Please check your connection and try again.`}
          buttonElement={true}
        />
      );
  }

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
            className={`badge-count px-[6px] py-[2px] rounded-xs ${statusForDisplay === 'BLOCKED' ? 'bg-[#FFDAD6] text-[#93000A]' : 'bg-[#0052CC1A]'}`}
          >
            {taskCount}
          </div>
        </div>

        {/* <button onClick={fetchTasksByStatus}>Load HERE</button> */}

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
      <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            assigneeName={task.assignee?.name ?? 'Unassigned'}
            dueDate={task.due_date ? formatDate(task.due_date) : ''}
            status={statusForDisplay}
          />
        ))}
      </ul>
    </div>
  );
}
