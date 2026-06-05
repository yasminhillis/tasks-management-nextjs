import { shimmer } from "./loadingStyle";
export default function LoadingCard() {
  return (
    <div className="bg-white border-[#C3C6D61A] shadow-sm w-[304px] rounded-md flex flex-col gap-6 p-6 max-h-[250px]">
      <div className={`w-[254px] h-[128px] rounded-sm ${shimmer}`}></div>
      <div className={`w-[190px] h-[24px] rounded-xs ${shimmer}`}></div>
      <div className={`w-[127px] h-[16px] rounded-xs ${shimmer}`}></div>
    </div>
  );
}
