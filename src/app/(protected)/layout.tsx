import Sidebar from './_components/Sidebar';
import Navbar from './_components/Navbar';
import BottomBar from './_components/BottomBar';
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main>{children}</main>
        <BottomBar />
      </div>
    </div>
  );
}
