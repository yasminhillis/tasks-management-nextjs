import { useRouter } from 'next/navigation';
import Card from '../../../_components/Card';
import Initials from '@/components/Initials';
import CardIdBadge from '../../../_components/CardIdBadge';
import { useEffect } from 'react';

type EpicCardProps = {
  id: string;
  title: string;
  assignee?: string;
  createdBy: string;
  createdAt?: string;
  deadline?: string | null,
  sendEpicIdToParent: (id: string) => void
};

export default function EpicCard({
  id,
  title,
  assignee,
  createdBy,
  createdAt,
  deadline,
  sendEpicIdToParent
}: EpicCardProps) {
  const router = useRouter();
  console.log(assignee, 'assigneessss');
  useEffect(() => {console.log(assignee,'nnn')}, [])
  return (
    <Card onClick={() => sendEpicIdToParent(id)} extraStyles="shadow-sm md:border-l-[4px] md:border-l-[#004E32] w-auto">
      <div className="flex justify-between">
        <CardIdBadge id={id} />
        <div className="md:hidden">
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
        <div className="hidden md:inline">
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
      <h3 className="text-[18px] font-semibold leading-[22.5px] text-slate-900 md:title-lg mb-[12px]">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        {assignee ? (
          <>
            <div className="inline-flex items-center gap-3 md:mb-[24px]">
              <Initials
                name={assignee}
                extraStyles="rounded-[12px] bg-[#65DCA4] text-[#002113] text-[14px] font-bold"
                mode="desktop"
                state="success"
              />
              <div className="inline-flex flex-col">
                <h2 className="order-2 md:order-1 text-[10px] leading-[15px] text-[#737685] md:caption-xs">
                  Assignee
                </h2>
                <h4 className="order-1 md:order-2 caption-xs text-slate-900 md:body-sm">
                  {assignee}
                </h4>
              </div>
            </div>
            <div className="flex md:hidden">
              <div className="flex flex-col items-end">
                <h3 className="text-[10px] font-bold tracking-[-0.5px] uppercase text-[#737685]">
                  DEADLINE
                </h3>
                <h4 className="caption-xs text-slate-900">{deadline ? deadline : 'No deadline specified'}</h4>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center justify-center gap-3 md:my-[10px]'>
              <div className="flex items-center justify-center w-[24px] h-[24px] bg-[#E0E8FF] rounded-full">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '15px', color: '#4F5F7B' }}
                  >
                    person_off
                  </span>
                </div>
                <p className="body-md-medium">Unassigned</p>
            </div>
            <div className="flex justify-end md:hidden">
              <div className="flex flex-col items-end">
                <h3 className="text-[10px] font-bold tracking-[-0.5px] uppercase text-[#737685]">
                  DEADLINE
                </h3>
                <h4 className="caption-xs text-slate-900">{deadline ? deadline : 'No deadline specified'}</h4>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex md:justify-between items-center pt-[16px] border-t border-t-[#F1F3FF] hidden md:flex">
        <div className="flex items-center gap-[8px]">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '19px', color: '#434654CC', opacity: '80%' }}
          >
            person_edit
          </span>
          <h4 className="caption-xs">
            Created By:{' '}
            <span className="text-[11px] font-semibold leading-[16.5px] text-slate-500">
              {createdBy}
            </span>
          </h4>
        </div>

        <div className="flex items-center gap-1">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '19px', color: '#434654CC', opacity: '80%' }}
          >
            calendar_today
          </span>
          <h4 className="caption-xs opacity-80">{deadline ? deadline : 'No deadline specified'}</h4>
        </div>
      </div>
    </Card>
  );
}
