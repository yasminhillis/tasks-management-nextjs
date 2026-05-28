import type { MemberRole } from "@/lib/types"; 

type PillProps = {
    role: MemberRole, 
    extraStyles?: string
}

export default function Pill({ role, extraStyles }: PillProps){
    return <div className={`inline-flex justify-center items-center text-[10px] font-bold tracking-[0.5px] uppercase rounded-[12px] px-3 py-1 ${role === "owner" ? 'bg-[#0052CC] text-white' : 'bg-[#CDDDFF] text-[#434654]'} ${extraStyles}`}>{role}</div>
}