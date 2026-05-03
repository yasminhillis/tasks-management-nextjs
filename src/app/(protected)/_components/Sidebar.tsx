'use client';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { toggleMobile, toggleSidebar } from '@/lib/store/slices/uiSlice';
import { navItems } from './navItems';

export default function Sidebar() {
  const { isMobileOpen, isSidebarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden bg-[#041B3C66]/40 backdrop-blur-[1px]"
          onClick={() => dispatch(toggleMobile())}
        ></div>
      )}
      <div
        className={`flex flex-col justify-between h-full bg-[#F1F3FF]
                    ${isSidebarOpen ? 'w-[224px]' : 'w-[70px]'}
                    fixed top-0 left-0 z-50
                    ${isMobileOpen ? 'block' : 'hidden'}
                   
                    md:block md:relative md:top-auto md:left-auto md:z-auto min-h-screen `}
      >
        <div className="flex flex-col justify-between min-h-screen">
          <div>
            <header className="pl-7 pb-8 mt-4 pr-4 backdrop-blur-md">
              <Logo isExpanded={isSidebarOpen} />
            </header>

            <div
              className={`px-4 ${isSidebarOpen ? 'max-w-[224px]' : 'px-0'} flex flex-col gap-4 `}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  className={`flex items-center text-[#041B3C99]  py-[10px] cursor-pointer text-sm font-medium focus:bg-white focus:text-[#003D9B] transition-colors rounded-sm hover:text-primary-container ${isSidebarOpen ? 'px-3 gap-2' : 'justify-center px-0'}`}
                  href={item.href}
                  style={{fontVariationSettings: item.mobileIconFilled ? "'FILL' 1" : "'FILL'0",}}
                >
                  {isSidebarOpen ? (
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      {item.collapsedIcon}
                    </span>
                  )}
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm font-sans font-medium flex flex-col">
            <div
              className={`text-slate-900 hidden md:flex md:items-center md:gap-2 md:px-7 md:py-[10px] hover:text-slate-600 transition-colors cursor-pointer ${isSidebarOpen ? '' : 'rotate-180'}`}
              onClick={() => dispatch(toggleSidebar())}
            >
              <span className="material-symbols-outlined">chevron_left</span>
              {isSidebarOpen && <div>Collapse</div>}
            </div>

            <div className="text-[#BA1A1A] flex items-center gap-2 px-7 py-[10px] hover:text-[#f96363] transition-colors cursor-pointer">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '20px' }}
              >
                logout
              </span>
              {isSidebarOpen && <div>Logout</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
