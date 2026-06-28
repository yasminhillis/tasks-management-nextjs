import { formatDate } from '@/app/(protected)/_utils/formatDate';
import Initials from '@/components/Initials';

type ModalBodyProps = {
  description: string;
  createdBy: string;
  deadline: string;
  createdAt: string;
  assignee: string;
};

export default function ModalBody({
  description,
  createdBy,
  deadline,
  createdAt,
  assignee,
}: ModalBodyProps) {

  return (
    <div className="px-[24px] py-[16px] md:p-[32px] flex flex-col gap-[20px] md:gap-[32px]">
      <div>
        <span className='md:hidden label-sm mb-[8px]'>Descriptipn</span>
        <p className='body-lg mt-0 text-[14px] text-[#4F5F7B]'>{description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-[24px]">
        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">Created By</h3>
          <div className="flex items-center gap-[8px]">
            <div className="hidden  md:block">
              <Initials
                name={createdBy}
                mode="desktop"
                state="success"
                extraStyles="rounded-[12px] bg-[#0052CC] text-[10px] font-bold text-white w-[28px] h-[28px]"
              />
            </div>

            <div className="md:hidden">
              <Initials
                name={createdBy}
                mode="mobile"
                state="success"
                extraStyles="rounded-full bg-[#CDDDFF] text-[6px] text-[#51617E]"
              />
            </div>

            <span className="body-md-medium">{createdBy}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">Assignee</h3>
          <div className="flex items-center gap-[8px]">
            {assignee === 'Unassigned' ? (
              <div className="flex items-center gap-[8.5px]">
                <div className="flex items-center justify-center w-[28px] h-[28px] bg-[#E0E8FF] rounded-[12px]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '15px', color: '#4F5F7B' }}
                  >
                    person_off
                  </span>
                </div>
                <p className="body-md-medium">Unassigned</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block">
                  <Initials
                    name={assignee}
                    mode="desktop"
                    state="success"
                    extraStyles="rounded-full bg-[#CDDDFF] text-[10px] text-[#51617E] w-[28px] h-[28px]"
                  />
                </div>

                <div className="md:hidden">
                  <Initials
                    name={assignee}
                    mode="mobile"
                    state="success"
                    extraStyles="rounded-full bg-[#CDDDFF] text-[10px] text-[#51617E]"
                  />
                </div>
                <p className="body-md-medium">{assignee}</p>
              </>
            )}
          </div>
        </div>

        <div className="col-span-2 border-t border-[#E6EAF2] md:hidden" />

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">Deadline</h3>
          <div className="flex items-center gap-[8px] body-md-medium">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '15px', color: '#041B3C66' }}
            >
              calendar_today
            </span>
            <time className="text-[14px] w-full" dateTime={deadline}>
              {formatDate(deadline)}
            </time>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">Created At</h3>
          <div className="flex items-center gap-[8px] body-md-medium text-[14px]">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '15px', color: '#041B3C66' }}
            >
              calendar_today
            </span>
            <time className=" w-full" dateTime={createdAt}>
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-[11px] md:text-[18px] font-semibold leading-[28px]">
          Tasks
        </h2>
        <div className="flex items-center gap-[3px] cursor-pointer hidden md:flex">
          <span
            className="material-symbols-outlined inline-flex items-center"
            style={{ fontSize: '19px', color: '#003D9B', 'display': 'inline-flex', 'alignItems': 'center' }}
          >
            add
          </span>
          <span className="text-[14px] font-semibold text-primary hover:text-blue-700">
            Add Task
          </span>
        </div>

        <div className="md:hidden rounded-[12px] w-[58px] h-[19px] px-[8px] py-[2px] bg-[#E0E8FF] font-bold text-[9px] uppercase">
          0 tasks
        </div>
      </div>

      <div className="border-dashed-custom bg-[#F1F3FF] p-[48px] rounded-[8px] flex flex-col items-center justify-center gap-[16px]">
        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#D7E2FF]">
          <span
            className="material-symbols-outlined hidden! md:inline!"
            style={{ opacity: '30%' }}
          >
            list
          </span>

          <span
            className="material-symbols-outlined md:hidden!"
            style={{'color': '#003D9B' }}
          >
            list
          </span>
        </div>
        <p className="empty-state-text text-center text-[#4F5F7B]">
          No tasks have been added to this epic yet
        </p>
        <button className="btn-primary shadow-sm text-[12px] md:text-[16px] gap-[3px]">
          <span className="material-symbols-outlined md:hidden!" style={{'fontSize': '17px'}}>
            add
          </span>
          <span className="material-symbols-outlined hidden! md:inline!" style={{'fontSize': '20px'}}>
            add
          </span>
          Add Task
        </button>
      </div>
    </div>
  );
}
