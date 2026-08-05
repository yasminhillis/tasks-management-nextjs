import Sidebar from './_components/Sidebar';
import Navbar from './_components/Navbar';
import BottomBar from './_components/BottomBar';
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <Navbar />
        <main className='min-w-0'>{children}</main>
        <BottomBar />
      </div>
    </div>
  );
}
