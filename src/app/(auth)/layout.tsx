import Image from "next/image"
export default function AuthLayout({ children }: { children: React.ReactNode }){
    return <div className="flex flex-col min-h-screen">
        <header className="p-2 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <Image src="/taskly-filled.png" alt="" width={18} height={19}/>
                <span className="font-bold font-sans text-xl text-slate-900">TASKLY</span>
            </div>
        </header>
        <main className="flex flex-1 bg-[#F9F9FF] items-center justify-center">{children}</main>
    </div>
}