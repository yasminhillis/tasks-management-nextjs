type InitialsProps = {
  onClick?: () => void;
  name: string;
  extraStyles?: string;
  mode: 'mobile' | 'desktop';
  state: 'loading' | 'success';
};

export function getInitials(name: string) {
  if (!name) return;
  let nameParts = name.split(' ');

  if (nameParts.length >= 2) {
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase()
    );
  }
  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
}

export default function Initials({
  onClick,
  name,
  extraStyles,
  mode,
  state,
}: InitialsProps) {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={
        state === 'loading'
          ? 'bg-linear-to-r from-[#E8EDFF] via-[#F1F3FF] to-[#E8EDFF] w-[40px] h-[40px] rounded-[12px] translate-x-0 opacity-100 transition-all duration-500 animate-pulse'
          : mode === 'mobile'
            ? `w-10 h-10 rounded-lg bg-[#D7E2FF] flex items-center justify-center text-[16px] font-bold text-[#003D9B] ${extraStyles}`
            : `w-[40px] h-[40px]
                    flex items-center justify-center shadow-sm
                    rounded-md font-bold text-[16px] ${extraStyles}`
      }
    >
      {getInitials(name)}
    </div>
  );
}
