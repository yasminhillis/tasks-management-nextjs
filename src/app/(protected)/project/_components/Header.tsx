import React from 'react';
import { shimmer } from './loadingStyle';

type HeaderProps = {
  mobileTitle?: string;
  desktopTitle?: string;
  desktopDescription?: string;
  desktopDescriptionExtraStyles: string;
  mobileDescription?: string;
  buttonLabel?: string;
  materialIcon?: string;
  mobileStyles?: string;
  searchBar?: React.ReactNode;
  loading?: boolean;
  handleBtnClick?: () => void;
  headerControls?: React.ReactNode;
};

export default function Header({
  mobileTitle,
  desktopTitle,
  desktopDescription,
  desktopDescriptionExtraStyles,
  mobileDescription,
  buttonLabel,
  materialIcon,
  mobileStyles,
  searchBar,
  loading,
  handleBtnClick,
  headerControls
}: HeaderProps) {
  if (loading) {
    return (
      <div className="font-sans">
        <div className="md:hidden mb-8">
          <h2
            className={`md:hidden text-[#041B3C] font-semibold text-2xl mb-1 ${mobileStyles}`}
          >
            {mobileTitle}
          </h2>

          <p className="text-[#4F5F7B] text-sm">{mobileDescription}</p>
          {searchBar && (
            <div
              className={`mt-4 w-full h-[40px] rounded-[2px] ${shimmer}`}
            ></div>
          )}
        </div>
        <div className="hidden md:flex items-center justify-between mb-10">
          <div
            className={`hidden md:block w-[256px] h-[40px] rounded-[4px] ${shimmer}`}
          ></div>
          <div className="flex gap-4 items-center">
            {searchBar && (
              <div
                className={`w-[128px] h-[40px] rounded-[2px] ${shimmer}`}
              ></div>
            )}

            <div
              className={`hidden md:block w-[160px] h-[40px] rounded-[2px] ${shimmer}`}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="md:hidden mb-8">
        <h2
          className={`md:hidden text-[#041B3C] font-semibold text-2xl mb-1 ${mobileStyles}`}
        >
          {mobileTitle}
        </h2>
        <p className="text-[#4F5F7B] text-sm md:hidden">{mobileDescription}</p>
        {searchBar && <div className="mt-4 w-full">{searchBar}</div>}
      </div>
      <div className="hidden md:block md:flex items-center justify-between mb-10">
        <div>
          <h2 className="hidden md:block font-semibold md:text-3xl text-[#041B3C]">
            {desktopTitle}
          </h2>
          <p className={`hidden md:block text-[#434654] ${desktopDescriptionExtraStyles}`}>{desktopDescription}</p>
        </div>

        <div className="flex gap-8 items-center">
          { searchBar }
          { headerControls }
          {buttonLabel && <button
            onClick={handleBtnClick}
            className="hidden md:inline-flex rounded-xs items-center justify-center gap-2 px-[24px] py-[12px] shadow-blue-md bg-radial from-[#003D9B] to-[#0052CC] text-white text-sm cursor-pointer hover:from-[#1259cb] hover:to-[#0657d1] transition-colors font-bold"
          >
            <span className="material-symbols-outlined">{materialIcon}</span>
            {buttonLabel}
          </button>}
        </div>
      </div>
    </div>
  );
}
