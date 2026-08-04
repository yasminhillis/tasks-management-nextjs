import { Status } from '@/lib/types';
import TaskColumn from './TaskColumn';

export default function BoardView({ projectId }: { projectId: string }) {
  const statusArr = Object.values(Status).map((status) => status);

  const statusColorMap = {
    'TO_DO': '#94A3B8',
    'IN_PROGRESS': '#0052CC',
    'BLOCKED': '#BA1A1A',
    'IN_REVIEW': '#4F5F7B',
    'READY_FOR_QA': '#7C3AED', 
    'REOPENED': '#EA580C', 
    'READY_FOR_PRODUCTION': '#CA8A04', 
    'DONE': '#16A34A',
  };

  return (
    <div className="flex gap-6 w-[945px] overflow-x-scroll">
      {statusArr.map((status) => (       
        <TaskColumn
          key={status}
          statusColor={statusColorMap[status]}
          projectId={projectId}
          statusForRequest={status}
          statusForDisplay={status.replaceAll('_', ' ')}
        />
      ))}
    </div>
  );
}
