import Initials from '@/components/Initials';
import { shimmer } from '../../../_components/loadingStyle';
import EpicTasksLoadingState from './EpicTasksLoadingState';

export default function ModalBodyLoading() {
  return (
    <div className="p-[32px] flex flex-col gap-[32px]">
      <div className={`w-[408px] h-[26px] ${shimmer}`}></div>
      <div className="grid grid-cols-3 gap-[24px]">
        <div className="flex flex-col gap-[8.5px]">
          <div className={`w-[62px] h-[15px] ${shimmer}`}></div>
          <div className="flex items-center gap-[8px]">
            <Initials
              name=""
              mode="desktop"
              state="loading"
              extraStyles="rounded-full bg-[#0052CC] text-[10px] font-bold text-white"
            />
            <div className={`w-[70px] h-[20px] ${shimmer}`}></div>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <div className={`w-[62px] h-[15px] ${shimmer}`}></div>
          <div className="flex items-center gap-[8px]">
            <Initials
              name=""
              mode="desktop"
              state="loading"
              extraStyles="rounded-full bg-[#0052CC] text-[10px] font-bold text-white"
            />
            <div className={`w-[70px] h-[20px] ${shimmer}`}></div>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <div className={`w-[62px] h-[15px] ${shimmer}`}></div>
          <div className="flex items-center gap-[8px] body-md-medium">
            <div className={`w-[13px] h-[15px] ${shimmer}`}></div>
            <div className={`w-[83px] h-[20px] ${shimmer}`}></div>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <div className={`w-[62px] h-[15px] ${shimmer}`}></div>
          <div className="flex items-center gap-[8px] body-md-medium">
            <div className={`w-[13px] h-[15px] ${shimmer}`}></div>
            <div className={`w-[83px] h-[20px] ${shimmer}`}></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`w-[92px] h-[28px] ${shimmer}`}></div>
        <div className="flex items-center gap-[3px] cursor-pointer">
          <div className={`w-[15px] h-[19px] ${shimmer}`}></div>
          <div className={`w-[63px] h-[20px] ${shimmer}`}></div>
        </div>
      </div>

      {/* <div className="border-dashed-custom bg-[#F1F3FF] p-[48px] rounded-[8px] flex flex-col items-center justify-center gap-[16px]">
        <div
          className={`flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#D7E2FF] ${shimmer}`}
        ></div>
        <div className={`w-[318px] h-[24px] ${shimmer}`}></div>
        <div className={`w-[141px] h-[44px] ${shimmer} rounded-[2px]`}></div>
      </div> */}
      <EpicTasksLoadingState />
    </div>
  );
}
