import { shimmer } from "../../../_components/loadingStyle";

export default function ModalHeaderLoading() {
  return (
    <div className="p-[32px] flex justify-between border-b border-b-[#C3C6D626]">
      <div>
        <div className="flex items-center gap-[8px] mb-[8px]">
          <div className={`w-[20px] h-[14] ${shimmer}`}></div>
          <div className={`w-[87px] h-[16px] ${shimmer}`}></div>
        </div>
        <div className={`w-[356px] h-[32px] ${shimmer}`}></div>
      </div>
      <div className={`w-[30px] h-[30px] ${shimmer}`}></div>
    </div>
  );
}
