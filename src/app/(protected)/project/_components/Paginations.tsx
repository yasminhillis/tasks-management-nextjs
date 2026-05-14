export default function Pagination() {
  return (
    <div className="hidden md:flex justify-between items-center pt-12 pr-8 pb-8 pl-8 mb-[121px]">
      <h3>Showing 5 of 24 active projects</h3>
      <div className="flex items-center gap-2">
        <div className="w-[32px] h-[32px] rounded-xs flex items-center justify-center border border-[#C3C6D64D] cursor-pointer">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '12px' }}
          >
            arrow_back_ios_new
          </span>
        </div>
        <div className="w-[32px] h-[32px] rounded-xs flex items-center justify-center border border-[#C3C6D64D] bg-[#003D9B] text-white font-bold text-xs">
          1
        </div>
        <div className="w-[32px] h-[32px] rounded-xs flex items-center justify-center border border-[#C3C6D64D] font-bold text-xs text-[#434654]">
          2
        </div>
        <div className="w-[32px] h-[32px] rounded-xs flex items-center justify-center border border-[#C3C6D64D] cursor-pointer text-xs">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '12px' }}
          >
            arrow_forward_ios
          </span>
        </div>
      </div>
    </div>
  );
}
