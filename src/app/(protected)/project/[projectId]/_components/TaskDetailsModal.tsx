import LeftPanel from './leftPanel/page';
import RightPanel from './RightPanel';

export default function TaskDetailsModal({ taskId }: { taskId: string }) {
  return (
    <div className="flex w-[896px] h-[870px] bg-white rounded-md shadow-modal bg-amber-100">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
