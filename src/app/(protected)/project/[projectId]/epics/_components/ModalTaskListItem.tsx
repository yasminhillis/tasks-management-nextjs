import { formatDate } from '@/app/(protected)/_utils/formatDate';
import Initials from '@/components/Initials';

type ModalTaskListItemProps = {
  taskTitle: string;
  assingeeName: string;
  dueDate: string;
};

export default function ModalTaskListItem({
  taskTitle,
  assingeeName,
  dueDate,
}: ModalTaskListItemProps) {
  return (
    <li className="flex justify-between p-4 md:border-t md:border-t-[#C3C6D626]  shadow-sm md:shadow-none border-[#E8EDFF] rounded-md md:rounded-none">
      <div>
        <h3 className="body-lg-medium">{taskTitle}</h3>
        <div className="flex items-center gap-2">
          <Initials
            name={assingeeName}
            mode="desktop"
            state="success"
            extraStyles="rounded-full w-[20px] h-[20px] text-[8px] text-[#51617E] leading-[12px] font-bold bg-[#CDDDFF]"
          />
          <h5 className="caption-xs font-normal">{assingeeName}</h5>
        </div>
      </div>
      <div className="flex items-end">
        <div className="hidden md:flex">
          <h5 className="label-xs-muted">Due Date</h5>
          <span className="caption-xs opacity-70">{formatDate(dueDate)}</span>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <span className="md:hidden material-symbols-outlined" style={{'fontSize': '16px', 'color': '#434654B2'}}>event</span>
          <span className="caption-xs opacity-70">{formatDate(dueDate)}</span>
        </div>
      </div>
    </li>
  );
}
