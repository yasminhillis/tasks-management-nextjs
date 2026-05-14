'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function EmptyState(){
    const router = useRouter()
    return <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)]'>
    <Image 
        src='/empty-project.png' 
        width={288} 
        height={288} 
        alt="empty state" 
        className='mb-6 w-[180px] h-[180px] md:w-[220px] md:h-[220px]'
    />
        <h1 className='title-lg mb-4'>No Projects</h1>
        <p className='body-md text-center mb-6 md:mb-12 w-[258px] md:w-[448px]'>You don’t have any projects yet. Start by defining your first architectural workspace to begin tracking tasks and epics.</p>
        <button onClick={() => router.push('/project/add')} type="button" className="flex items-center gap-1 text-white px-4 py-3 rounded-xs bg-radial font-medium from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors shadow-sm cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '20px'}}>add</span>
            Create New Project
        </button>
    </div>
}