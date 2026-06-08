import Card from '../../_components/Card';
import { shimmer } from '../../_components/loadingStyle';
export default function EpicCardkeleton() {
  return (
    <Card extraStyles="shadow-sm w-auto">
      <div className="flex justify-between mb-[11px] md:mb-[9px]">
        <div
          className={`px-[8px] py-[4px] md:px-[10px] md:py-[4px] w-[68px] h-[23px] ${shimmer} rounded-[2px]`}
        ></div>
        <div className={`md:hidden w-[4px] h-[13px] ${shimmer}`}></div>
        <div className={`hidden md:block w-[16px] h-[4px] ${shimmer}`}></div>
      </div>
      <div className={`w-[192px] h-[23px] mb-[12px] ${shimmer}`}></div>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-3 md:mb-[24px]">
          <div
            className={`w-[40px] h-[40px]
                                                flex items-center justify-center shadow-sm
                                                rounded-[12px] font-bold text-[16px] ${shimmer}`}
          ></div>
          <div className="inline-flex flex-col gap-1 justify-center">
            <div className={`w-[40px] h-[16px] ${shimmer}`}></div>
            <div className={`w-[50px] h-[16px] ${shimmer}`}></div>
          </div>
        </div>
        <div className="flex md:hidden">
          <div className="flex flex-col items-end gap-1">
            <div className={`w-[47px] h-[15px] ${shimmer}`}></div>
            <div className={`w-[74px] h-[15px] ${shimmer}`}></div>
          </div>
        </div>
      </div>
      <div className={`hidden md:block w-full h-[4px] ${shimmer}`}></div>
      <div className="flex md:justify-between items-center pt-[16px] hidden md:flex">
        <div className={`w-[48px] h-[12px] rounded-[2px] ${shimmer}`}></div>

        <div className={`w-[48px] h-[12px] rounded-[2px] ${shimmer}`}></div>
      </div>
    </Card>
  );
}
