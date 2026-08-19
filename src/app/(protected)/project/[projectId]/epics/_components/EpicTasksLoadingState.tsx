import Initials from "@/components/Initials"
import { shimmer } from "../../../_components/loadingStyle"


export default function EpicTasksLoadingState(){
    return <div className="rounded-[8px] border border-[#C3C6D626]">
        {Array.from({length: 2}).map((_, i) => <li key={i} className="flex justify-between items-center  p-4 border-t border-t-[#C3C6D626]">
                <div className="flex flex-col gap-1">
                     <div className={`w-[231px] h-[24px] ${shimmer}`}></div>
                    <div className="flex items-center gap-2">
                        <Initials name="" mode="desktop" state="loading" extraStyles="rounded-full w-[20px] h-[20px] text-[8px] text-[#51617E] leading-[12px] font-bold bg-[#CDDDFF]"/>
                         <div className={`w-[82px] h-[16px] ${shimmer}`}></div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                     <div className={`w-[49px] h-[15px] ${shimmer}`}></div>
                     <div className={`w-[68px] h-[16px] ${shimmer}`}></div>
                </div>
        
            </li>)}
    </div>
}