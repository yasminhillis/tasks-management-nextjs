type FeatureHintCardProps = {
  materialIcon: string;
  title: string;
  description: string;
};

export default function FeatureHintCard({
  materialIcon,
  title,
  description,
}: FeatureHintCardProps) {
  return (
    <div className="border border-black/0 bg-[#F1F3FF] rounded-[8px] font-sans p-[21px] w-[208px] h-[180px]">
      <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center mb-[12px]">
        <span
          className="material-symbols-outlined"
          style={{ color: '#003D9B' }}
        >
          {materialIcon}
        </span>
      </div>
      <h2 className="body-lg font-semibold text-[#041B3C] mb-[4px]">{title}</h2>
      <p className="text-[12px] leading-[19.5px] text-slate-500">
        {description}
      </p>
    </div>
  );
}
