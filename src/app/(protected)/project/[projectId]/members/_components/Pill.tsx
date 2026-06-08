import type { MemberRole } from '@/lib/types';

type PillProps = {
  role: MemberRole;
  extraStyles?: string;
  mode: 'mobile' | 'desktop';
  state: 'loading' | 'success';
};

export default function Pill({ role, extraStyles, mode, state }: PillProps) {
  const loadingStyle = `relative overflow-hidden bg-[#E8EDFF]
                      before:absolute before:inset-0
                      before:translate-x-[-100%]
                      before:animate-[shimmer_1.8s_infinite]
                      before:bg-gradient-to-r
                      before:from-transparent
                      before:via-white/60
                      before:to-transparent`;
  return (
    <div
      className={
        state === 'loading'
          ? `${mode === 'mobile' ? `rounded-[1px] w-[57px] h-[19px] ${loadingStyle}` : 'rounded-[12px] w-[80px] h-[24px]'} bg-linear-to-b from-[#E8EDFF] via-[#F1F3FF] to-[#E8EDFF] ${extraStyles}`
          : mode === 'desktop'
            ? `inline-flex justify-center items-center text-[10px] font-bold tracking-[0.5px] uppercase  px-3 py-1 ${role === 'owner' ? 'bg-[#0052CC] text-white' : ''} ${extraStyles}`
            : `${extraStyles}`
      }
    >
      {role}
    </div>
  );
}
