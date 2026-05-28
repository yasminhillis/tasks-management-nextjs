'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

type DotDropDownProps = {
  id?: string;
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
    <div
      onClick={(e) => e.stopPropagation()}
      ref={menuRef}
      className="relative hover:bg-[#C3C6D6]/30 flex w-8 h-8 items-center justify-center rounded-full"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[#C3C6D6]">
          more_vert
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-6 p-2 right-3 w-48 bg-white shadow-sm rounded-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/project/${id}/edit`);
            }}
            className="cursor-pointer hover:bg-[#e7e7ea] p-2 w-full"
          >
            Edit Project
          </button>
        </div>
      )}
    </div>
  );
}
