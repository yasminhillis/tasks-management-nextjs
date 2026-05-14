'use client';
import { usePathname } from 'next/navigation';
import { navItems } from './navItems';
import Link from 'next/link';
export default function BottomBar() {
  const pathname = usePathname();
  // console.log(pathname, 'kk');
  return (
    <div className="fixed bottom-0 md:hidden w-full h-[64px] flex items-center justify-around bg-[#F1F3FF] gap-[39px] text-[#041B3CB2]/90 px-[27px] py-4">
      {navItems.map((navItem) => {
        const isActive = pathname === navItem.href;
        return (
          <Link
            key={navItem.label}
            href={navItem.href}
            className={`flex flex-col items-center justify-center max-w-[39px] max-h-[35px] gap-[2px] cursor-pointer ${isActive ? 'text-[#0052CC]' : ''} ${isActive ? 'font-bold' : 'font-normal'} hover:text-[#0052CC] hover:font-bold transition-colors`}
            style={{
              fontVariationSettings: navItem.mobileIconFilled
                ? "'FILL'1"
                : "'FILL'0",
            }}
          >
            <span
              className="material-symbols-outlined w-[18px] h-[18px] text-[10px]"
              style={{ fontSize: '18px' }}
            >
              {navItem.mobileIcon}
            </span>
            <span className="font-sans text-[10px]">{navItem.mobileLabel}</span>
          </Link>
        );
      })}
    </div>
  );
}
