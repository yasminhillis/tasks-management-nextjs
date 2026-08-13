import { shimmer } from '../../../_components/loadingStyle';

export default function LoadingTaskCard() {
  return (
    <div className="flex flex-shrink-0">
      <div className="w-[288px] h-[118px] bg-white rounded-md p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className={`w-[224px] h-[17px] ${shimmer}`}></div>
          <div className={`w-[162px] h-[17px] ${shimmer}`}></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 w-[52px] h-[15px] items-center gap-2">
            <div className={`h-[10px] w-[10px] ${shimmer}`}></div>
            <div className={`w-[29px] h-[12px] ${shimmer}`}></div>
          </div>
          <div className={`w-[24px] h-[25px] rounded-full ${shimmer}`}></div>
        </div>
      </div>
    </div>
  );
}
