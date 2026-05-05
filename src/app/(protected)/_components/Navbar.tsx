'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchUser, clearUser } from '@/lib/store/slices/userSlice';
import { toggleMobile } from '@/lib/store/slices/uiSlice';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'

export default function NavbarClient() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState('')
  const [isLogoutSuccessful, setIsLogoutSuccessful] = useState(false)

  const dropDownRef = useRef<HTMLDivElement>(null); 

  const { name, department } = useAppSelector((state) => state.user);
  const { isMobileOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchUser());
    function handleClickOutside(e: MouseEvent){
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setDropDownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dispatch]);

  useEffect(() => {
    if (!logoutStatus) return; 
    const timer = setTimeout(() => {
      setLogoutStatus('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [logoutStatus])

  // console.log(isMobileOpen, 'isMobileOpen');

  function getInitials(name: string) {
    let nameParts = name.split(' ');

    if (nameParts.length >= 2) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      );
    }
    return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
  }

  async function logUserOut(){
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST"
      }); 

      // throw new Error()

      if (!res.ok) {
        const error = await res.json(); 
        // console.log(error, 'error');
        setLogoutStatus(error.message);
        setIsLogoutSuccessful(false)
        return;
      } 
      const data = await res.json(); 
      // console.log(data, 'data');
      setLogoutStatus(data.message)
      setIsLogoutSuccessful(true)
      dispatch(clearUser())
      router.push('/login')
    } catch(error) {
      setLogoutStatus('Please check your network connection and try again.')
      setIsLogoutSuccessful(false)
    }
  }

  return (
    <>
    <header className={`font-sans z-90 flex items-center md:justify-end px-6 py-3 border-b border-b-[#0000001A] bg-[#F9F9FF] w-full`}>
      {logoutStatus && <div className={`fixed bottom-5 right-5 max-w-sm px-4 py-3 md:bottom-6 md:right-6 max-md:bottom-16 max-md:right-0 max-md:mx-3 max-md:rounded-lg max-md:left-0 max-md:max-w-full
        ${isLogoutSuccessful ? 'bg-[#82F9BE]/30': 'bg-red-600/7'} ${isLogoutSuccessful ? 'text-[#005235]  border border-green-500': 'text-red-600 border border-red-400'}  flex items-center justify-center rounded-lg gap-2`}>
        <span className="material-symbols-outlined">
          { isLogoutSuccessful ? 'check_small' : 'error' }
        </span>
        <span>
            {logoutStatus}
        </span>
        
        </div>}
      <button
        className="block md:hidden cursor-pointer"
        onClick={() => {
          dispatch(toggleMobile());
        }}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <h1 className="text-slate-900 font-semibold text-sm">{name}</h1>
          <h2 className="text-[#003D9B] uppercase font-bold text-[10px] tracking-[1px]">
            {department}
          </h2>
        </div>
        <div ref={dropDownRef} className="relative">
          <div
          onClick={() => setDropDownOpen((prev) => !prev)} 
          className="cursor-pointer bg-primary-container w-[40px] h-[40px]
                    flex items-center justify-center shadow-sm
                    text-white rounded-md font-bold text-[16px]">
            {getInitials(name)}
          </div>
           {isDropDownOpen && <div className='absolute right-0 top-10 z-70 w-[200px] h-auto py-4 px-4 bg-white border border-gray-400 shadow-sm flex flex-col gap-4 justify-start rounded-lg'>
          <div className='flex gap-2 items-center '>
            <div
          className="bg-primary-container w-[40px] h-[40px]
                    flex items-center justify-center shadow-sm
                    text-white rounded-md font-bold text-[16px]">
            {getInitials(name)}
            </div>
            <div className='flex flex-col gap-1 justify-center items-center'>
              <span className="text-slate-900 font-semibold text-sm">{name}</span>
              <span className="text-[#003D9B] uppercase font-bold text-[10px] tracking-[1px]">{department}</span>
            </div>
          </div>
          <hr className='text-gray-400 w-full'/>
          <div onClick={logUserOut} className='flex items-center gap-2 text-[#BA1A1A] hover:text-[#e72020] cursor-pointer font-medium'>
            <span className='material-symbols-outlined '>
              logout
            </span>
            <span>Log out</span>
          </div>
        </div>}
        </div>
      </div>        
    </header>
    {isDropDownOpen && <div className='fixed inset-0 z-60  bg-[#041B3C66]/40 backdrop-blur-[1px]'>
      
      </div>}
    </>
  );
}
