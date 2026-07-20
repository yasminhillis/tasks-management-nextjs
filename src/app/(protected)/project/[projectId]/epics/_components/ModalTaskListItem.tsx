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
    <li className="flex justify-between">
        <div>
            <h3 className="title-md">{taskTitle}</h3>
            <div className="flex items-center gap-2">
                <Initials name="John Doe" mode="desktop" state="success" extraStyles="rounded-full w-[20px] h-[20px] text-[8px] leading-[12px] font-bold"/>
                <h5 className="caption-xs font-normal opacity-60">{assingeeName}</h5>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <h5 className="label-xs-muted">Due Date</h5>
            <span className="body-md-medium opacity-70">{dueDate}</span>
        </div>

    </li>
  );
}
