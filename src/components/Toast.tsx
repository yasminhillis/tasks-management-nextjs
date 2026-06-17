type ToastProps = {
  children: React.ReactNode;
  success?: boolean, 
  danger?: boolean
};

export default function Toast({ children, success, danger }: ToastProps) {
  return (
    <div className={`fixed bottom-5 right-5 max-w-sm px-4 py-3 md:bottom-6 md:right-6 max-md:bottom-16 max-md:right-0 max-md:mx-3 max-md:rounded-lg max-md:left-0 max-md:max-w-full border ${success ? 'bg-[#82F9BE]/30 text-[#005235] border-green-500' : 'text-red-600 border-red-400 bg-red-600/10'} flex items-center justify-center rounded-lg gap-2`}>
      {children}
    </div>
  );
}
