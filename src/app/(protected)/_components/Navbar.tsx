'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchUser } from '@/lib/store/slices/userSlice';
import { useEffect } from 'react';
import { toggleMobile } from '@/lib/store/slices/uiSlice';

export default function NavbarClient() {
  const dispatch = useAppDispatch();
  const { name, department } = useAppSelector((state) => state.user);
  const { isMobileOpen } = useAppSelector((state) => state.ui);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log(isMobileOpen, 'isMobileOpen');

  function getInitials(name: string): string {
    let nameParts = name.split(' ');

    if (nameParts.length >= 2) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      );
    }
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
  }

  return (
    <header className="font-sans flex items-center justify-between md:justify-end px-6 py-3 border-b border-b-[#0000001A] bg-[#F9F9FF] w-full">
      <button
        className="block md:hidden cursor-pointer"
        onClick={() => {
          dispatch(toggleMobile());
        }}
      >
        <span className="material-symbols-outlined  ">menu</span>
      </button>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <h1 className="text-slate-900 font-semibold text-sm">{name}</h1>
          <h2 className="text-[#003D9B] uppercase font-bold text-[10px] tracking-[1px]">
            {department}
          </h2>
        </div>
        <div className="bg-primary-container w-[40px] h-[40px] flex items-center justify-center shadow-sm text-white rounded-md font-bold text-[16px]">
          {getInitials(name)}
        </div>
      </div>
    </header>
  );
}
