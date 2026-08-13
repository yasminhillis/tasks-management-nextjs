import { Status } from '@/lib/types';
import TaskColumn from './TaskColumn';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import { useState } from 'react';

export default function BoardView({ projectId }: { projectId: string }) {
  // const taskStatusForDisplay = Object.values(Status).map((status) =>
  //   status.replaceAll('_', ' ')
  // );

  const [error, setError] = useState<'fetchError' | 'networkError' | null>(
    null
  );

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

  const statusArr = Object.values(Status).map((status) => status);

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
          error={error}
        />
      ))}
    </div>
  );
}
