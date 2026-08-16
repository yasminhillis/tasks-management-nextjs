import Initials from '@/components/Initials';
import CardIdBadge from '../../../_components/CardBadge';
import { formatDate } from '@/app/(protected)/_utils/formatDate';

type MobileTaskCardProps = {
  title: string;
  assigneeName: string;
  dueDate: string;
  status: string;
  taskId: string
};

export default function MobileTaskCard({
  title,
  assigneeName,
  dueDate,
  status,
  taskId
}: MobileTaskCardProps) {
  return (
    <div className="task-card gap-3">
      <div className="">
        <div className="flex justify-between gap-3 items-start">
            <div className="flex-1 min-w-0">
          <span className="task-card-label">{taskId}</span>
        <h3 className="task-card-title">{title}</h3>

            </div>
          <CardIdBadge id={status} extraStyles='px-2 py-1 mt-1 shrink-0'/>
        </div>
      </div>

      <div className="">
        <div className="flex gap-3 items-center">
          <Initials name={assigneeName} mode={'mobile'} state={'success'} extraStyles='rounded-[12px] task-card-avtar' />
          <div>
            <div className="flex flex-col">
              <h4 className="task-card-label">DUE DATE</h4>
              <span className="task-card-date">{formatDate(dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
