import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import type { Task } from '@/lib/types';
import { formatDate } from '@/app/(protected)/_utils/formatDate';
import { useRouter } from 'next/navigation';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import LoadingTaskCard from './LoadingTaskCard';

type TaskColumnProps = {
  statusForRequest: string;
  statusForDisplay: string;
  projectId: string;
  statusColor: string;
  onFetchError: (error: 'fetchError' | 'networkError') => void;
  error: 'fetchError' | 'networkError' | null
};

export default function TaskColumn({
  statusForRequest,
  statusForDisplay,
  projectId,
  statusColor,
  onFetchError,
  error
}: TaskColumnProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState(0);
  // const [fetchError, setFetchError] = useState('');
  // const [networkError, setNetworkError] = useState('');
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const router = useRouter();

  async function fetchTasksByStatus() {
    // console.log('kk');
    // setFetchError('');
    // setNetworkError('')
    try {
      setFetchStatus('loading');
      const res = await fetch(
        `/api/tasks?projectId=${projectId}&status=${statusForRequest}`
      );

      // console.log(res, 'res');

      if (!res.ok) {
        const error = await res.json();
        console.log(error, 'error fetching tasks');
        // setFetchStatus('fetchError');
        onFetchError("fetchError")
        return;
        // setFetchError(`We're having trouble retrieving your
        //          project tasks right now. Please try again in a moment.`);
        //          return;
        // return <ErrorScreen message="We're having trouble retrieving your
        //         project tasks right now. Please try
        //         again in a moment."/>;
      }
      setFetchStatus('success');
      const { tasks, taskCount } = await res.json();
      setTasks(tasks ?? []);
      // console.log(tasks, 'taskssaSaS');
      setTaskCount(taskCount);
    } catch (error) {
      console.log('network error');
      onFetchError('networkError');
      // setNetworkError('Network error. Please check your connection and try again.');
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
  }, [projectId]);

  // if (fetchStatus === 'fetchError') {
  //   return (
  //     <ErrorScreen
  //       message="We're having trouble retrieving your
  //               project tasks right now. Please try
  //               again in a moment."
  //     />
  //   );
  // }

  // if (fetchStatus === 'networkError') {
  //   return (
  //     <ErrorScreen
  //       title="You're offline"
  //       message={`Network error. Please check your connection and try again.`}
  //       buttonElement={true}
  //     />
  //   );
  // }

  // if (fetchStatus === 'loading') {
  //   return <div>Loading....</div>;
  // }

  const emptyStateText: Record<string, string> = {
    'TO DO': 'No upcoming tasks',
    'IN PROGRESS': 'Nothing in progress',
    'BLOCKED': 'Nothing blocked',
    'IN REVIEW': 'Nothing in review',
    'READY FOR QA': 'Nothing ready for QA',
    'REOPENED': 'Nothing reopened',
    'READY FOR PRODUCTION': 'Nothing ready for production',
    'DONE': 'Nothing done',
  };
  console.log(fetchStatus, 'fetchStatus');
  
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
      {/* <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            assigneeName={task.assignee?.name ?? 'Unassigned'}
            dueDate={task.due_date ? formatDate(task.due_date) : ''}
            status={statusForDisplay}
          />
        ))}
      </ul> */}

      {(fetchStatus !== 'idle' && fetchStatus === 'loading' && error === null && tasks.length === 0) ? 
      (
        <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
          {Array.from({ length: 3 }).map((_, i) => (
            // <TaskCard
            //   key={task.id}
            //   title={task.title}
            //   assigneeName={task.assignee?.name ?? 'Unassigned'}
            //   dueDate={task.due_date ? formatDate(task.due_date) : ''}
            //   status={statusForDisplay}
            // />
            <LoadingTaskCard key={i} />
          ))}
        </ul>
      ) :

      (taskCount === 0 && fetchStatus === "success" && error === null) ? ( 
        <div className="border-dashed-custom flex flex-col justify-center items-center flex-1 min-h-0 w-full bg-surface-low">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: `${statusColor}1A` }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '16px', color: statusColor }}
            >
              inbox
            </span>
          </div>
          <h3 className="body-lg-medium">{emptyStateText[statusForDisplay]}</h3>
          <p className="hint">Drag a task here or add one below</p>
        </div>
      ) : (fetchStatus === "success" && error === null) ? (
        <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              assigneeName={task.assignee?.name ?? 'Unassigned'}
              dueDate={task.due_date ? formatDate(task.due_date) : ''}
              status={statusForDisplay}
            />
            // <LoadingTaskCard key={task.id} />
          ))}
        </ul>
      ) : null}

      
    </div>
  );
}
