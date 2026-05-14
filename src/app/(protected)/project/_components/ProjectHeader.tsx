'use client'
import { useRouter } from 'next/navigation'
export default function ProjectHeader({ loading = false }){
    const router = useRouter()
    return <div className="flex justify-between mt-8 mr-8 mb-6 md:mb-10 md:ml-8 items-center">
            <div>
                <h1 className="text-[#041B3C] font-semibold text-3xl">Projects</h1>
                <p className="text-[#434654]">Manage and curate your projects</p>
            </div>
            {
                loading ? (
                    <div className="hidden md:block w-[209px] h-[40px] px-4 py-2 bg-[#E8EDFF]"></div>
                ) : (
                    <button onClick={() => router.push('/project/add')} type="button" className="hidden md:flex items-center gap-1 text-white px-4 py-3 rounded-xs bg-radial font-medium from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors shadow-sm cursor-pointer">
                        <span className="material-symbols-outlined" style={{'fontSize': '20px'}}>add</span>
                        Create New Project
                    </button>
                )
            }
            
        </div>
}