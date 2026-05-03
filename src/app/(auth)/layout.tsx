import Logo from '@/components/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-2 backdrop-blur-md">
        <Logo isExpanded={false} />
      </header>
      <main className="flex flex-1 bg-[#F9F9FF] items-center justify-center">
        {children}
      </main>
    </div>
  );
}
