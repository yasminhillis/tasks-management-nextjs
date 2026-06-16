'use clinet';
import { useRouter } from 'next/navigation';
import Card from './Card';

export default function AddProjectCard() {
  const router = useRouter();

  return (
      <Card extraStyles={`hidden md:flex flex-col items-center justify-center bg-white rounded-md p-6 border-2 border-dotted border-[#C3C6D633] cursor-pointer`} onClick={() => router.push('/project/add')}>
      <div
        onClick={() => router.push('/project/add')}
        className="bg-[#F1F3FF] cursor-pointer w-[48px] h-[48px] rounded-lg flex items-center justify-center mb-4"
      >
        <span
          onClick={() => router.push('/project/add')}
          className="material-symbols-outlined cursor-pointer"
        >
          add_circle
        </span>
      </div>
      <h3 className="font-bold text-sm text-[#434654] tracking-[1.4px]">
        ADD PROJECT
      </h3>
    </Card>
  );
}
