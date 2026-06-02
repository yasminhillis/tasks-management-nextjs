export default function LoadingCard() {
  const loadingStyle = `relative overflow-hidden bg-[#E8EDFF] rounded-md
                        before:absolute before:inset-0
                        before:translate-x-[-100%]
                        before:animate-[shimmer_1.8s_infinite]
                        before:bg-gradient-to-r
                        before:from-transparent
                        before:via-white/60
                        before:to-transparen`
  return (
    <div className="bg-white border-[#C3C6D61A] shadow-sm w-[304px] rounded-md flex flex-col gap-6 p-6 max-h-[250px]">
      <div className={`w-[254px] h-[128px] rounded-sm ${loadingStyle}`}></div>
      <div className={`w-[190px] h-[24px] rounded-xs ${loadingStyle}`}></div>
      <div className={`w-[127px] h-[16px] rounded-xs ${loadingStyle}`}></div>
    </div>
  );
}
