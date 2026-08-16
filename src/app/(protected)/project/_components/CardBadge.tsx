type CardIdBadgeProps = {
  id: string;
  extraStyles?: string;
};

export default function CardIdBadge({ id, extraStyles }: CardIdBadgeProps) {
  return (
    <div
      className={`md:bg-[#82F9BE] md:text-[#005235] bg-[#DAE2FF] text-[#003D9B] text-[10px] font-bold tracking-[0.55px] md:tracking-[0.5px] uppercase inline-flex items-center justify-center rounded-[2px] whitespace-nowrap shrink-0  ${extraStyles}`}
    >
      {id}
    </div>
  );
}
