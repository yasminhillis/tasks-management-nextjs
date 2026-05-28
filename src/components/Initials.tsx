type InitialsProps = {
  onClick?: () => void;
  name: string;
  extraStyles?: string;
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
}: InitialsProps) {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={`bg-primary-container w-[40px] h-[40px]
                    flex items-center justify-center shadow-sm
                    text-white rounded-md font-bold text-[16px] ${extraStyles}`}
    >
      {getInitials(name)}
    </div>
  );
}
