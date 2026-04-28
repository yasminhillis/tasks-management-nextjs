import Image from 'next/image'
export default function Logo({ isExpanded }: {isExpanded: boolean}){
    return <div className="flex items-center gap-2">
                <Image src="/taskly-filled.png" alt="" width={18} height={19}/>
                { isExpanded && <span className="font-bold font-sans text-xl text-slate-900">TASKLY</span>}
            </div>
}