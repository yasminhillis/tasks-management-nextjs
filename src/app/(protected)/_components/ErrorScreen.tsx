'use client';

import { useRouter } from 'next/navigation';

type ErrorScreenProps = {
  onRetry?: () => void;
  title?: string;
  message: string;
  buttonElement?: boolean;
  extraStyles?: string;
  component?: boolean;
};

export default function ErrorScreen({
  onRetry,
  title = 'Something went wrong',
  message,
  buttonElement,
  extraStyles,
  component,
}: ErrorScreenProps) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col items-center justify-center ${component ? 'min-h-[45vh]' : 'min-h-[80vh]'}`}
    >
      {component ? (
        <div className="bg-[#FFDAD6] w-8 h-8 flex items-center justify-center rounded-lg mb-3">
          <span
            className="material-symbols-outlined text-[#BA1A1A]"
            style={{ fontSize: '16px' }}
          >
            cloud_off
          </span>
        </div>
      ) : (
        <div className="bg-[#FFDAD6] w-10 h-10 flex items-center justify-center rounded-lg mb-3">
          <span className="material-symbols-outlined text-[#BA1A1A]">
            cloud_off
          </span>
        </div>
      )}
      <h2 className={`title-lg mb-2 ${component ? 'text-base': ''}`}>{title}</h2>
      <p className={`body-md text-center max-w-xs mb-6 ${extraStyles}  ${component ? 'text-sm' : ''}`}>
        {message}
      </p>
      {buttonElement ? (
        <button
          onClick={() => onRetry?.()}
          className={`${component ? 'px-2 py-1.5 text-[13px]' : 'px-4 py-2 font-semibold'}  bg-[#0052CC] hover:bg-[#1966e1] transition-colors  text-white cursor-pointer rounded-xs`}
        >
          Retry Connection
        </button>
      ) : null}
    </div>
  );
}
