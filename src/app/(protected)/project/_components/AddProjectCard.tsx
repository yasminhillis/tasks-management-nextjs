'use clinet'; 
import { useRouter } from "next/navigation";
export default function AddProjectCard(){
    const router = useRouter(); 
    
    return <div className="hidden md:flex flex-col items-center justify-center h-[220px] bg-white w-full max-w-[304px] rounded-md p-6 border-2 border-dotted border-[#C3C6D633]">

        <div onClick={() => router.push('/project/add')} className="bg-[#F1F3FF] cursor-pointer w-[48px] h-[48px] rounded-lg flex items-center justify-center mb-4">
            <span onClick={() => router.push('/project/add')} className="material-symbols-outlined cursor-pointer">
                add_circle
            </span>
        </div>   
        <h3 className="font-bold text-sm text-[#434654] tracking-[1.4px]">ADD PROJECT</h3>
    </div>
}