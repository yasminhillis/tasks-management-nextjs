type CardIdBadgeProps = {
  id: string;
};

export default function CardIdBadge({ id }: CardIdBadgeProps) {
  return (
    <div className="md:bg-[#82F9BE] md:text-[#005235] bg-[#DAE2FF] text-[#003D9B] text-[10px] font-bold tracking-[0.55px] md:tracking-[0.5px] uppercase mb-[11px] md:mb-[16px] px-[8px] py-[4px] md:px-[10px] md:py-[4px] w-[68px] inline-flex items-center justify-center rounded-[2px]">
      {id}
    </div>
  );
}
