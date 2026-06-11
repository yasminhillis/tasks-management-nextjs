import { formatDate } from "@/app/(protected)/_utils/formatDate";
import Initials from "@/components/Initials";
import ModalBodyLoading from "./ModalBodyLoading";

type ModalBodyProps = {
  description: string;
  createdBy: string;
  deadline: string;
  createdAt: string;
  assignee: string;
};

export default function ModalBody({ description, createdBy, deadline, createdAt, assignee}: ModalBodyProps) {  
  
  return (
    <div className="p-[32px] flex flex-col gap-[32px]">
      <p>{description}</p>

      <div className="grid grid-cols-3 gap-[24px]">
        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-xs-muted">Created By</h3>
          <div className="flex items-center gap-[8px]">
            <Initials name={createdBy} mode="desktop" state="success" extraStyles="rounded-full bg-[#0052CC] text-[10px] font-bold text-white" />
            <span className="body-md-medium">{createdBy}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-xs-muted">Assignee</h3>
          <div className="flex items-center gap-[8px]">
            <Initials name={assignee} mode="desktop" state="success" extraStyles="rounded-full bg-[#CDDDFF] text-[10px] text-[#51617E]" />
            <p className="body-md-medium">{assignee}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-xs-muted">Deadline</h3>
          <div className="flex items-center gap-[8px] body-md-medium">
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#041B3C66' }}>calendar_today</span>
            <time dateTime={deadline}>{formatDate(deadline)}</time>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-xs-muted">Created At</h3>
          <div className="flex items-center gap-[8px] body-md-medium">
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#041B3C66' }}>calendar_today</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <h2 className="text-[18px] font-semibold leading-[28px]">Tasks</h2>
        <div className="flex items-center gap-[3px] cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: '19px', color: '#003D9B' }}>add</span>
          <span className="text-[14px] font-semibold text-primary hover:text-blue-700">Add Task</span>
        </div>
      </div>

      <div className="border-dashed-custom bg-[#F1F3FF] p-[48px] rounded-[8px] flex flex-col items-center justify-center gap-[16px]">
        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#D7E2FF]">
          <span className="material-symbols-outlined" style={{ opacity: '30%' }}>list</span>
        </div>
        <p className="empty-state-text">No tasks have been added to this epic yet</p>
        <button className="btn-primary shadow-sm">
          <span className="material-symbols-outlined">add</span>
          Add Task
        </button>
      </div>
    </div>
  );
}