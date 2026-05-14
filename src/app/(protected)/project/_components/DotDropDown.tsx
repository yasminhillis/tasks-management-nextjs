'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

type DotDropDownProps = {
  id: string;
};

export default function DotDropDown({ id }: DotDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener('mousedown', closeDropDown);
    function closeDropDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    return () => document.removeEventListener('mousedown', closeDropDown);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <span className="material-symbols-outlined text-[#C3C6D6]">
          more_vert
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-5 p-4 right-2 w-48 bg-white shadow-sm rounded-sm">
          <button
            onClick={() => router.push(`/project/${id}/edit`)}
            className="curor-pointer"
          >
            Edit Project
          </button>
        </div>
      )}
    </div>
  );
}
