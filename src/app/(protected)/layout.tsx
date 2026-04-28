
import Sidebar from "./_components/Sidebar"
import Navbar from "./_components/Navbar"
export default function ProtectedLayout({ children }: { children: React.ReactNode }){

    return (
    <div className="flex">
        <div className="bg-[#F1F3FF] min-h-screen">
            <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
            <Navbar />
            <main>
                { children }
            </main>
        </div>
    </div>
    )
}