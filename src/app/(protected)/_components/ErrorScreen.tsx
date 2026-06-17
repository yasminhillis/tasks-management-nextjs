'use client';

import { useRouter } from 'next/navigation';

type ErrorScreenProps = {
  onRetry?: () => void;
  title?: string;
  message: string;
  buttonElement?: boolean;
  extraStyles?: string;
};

export default function ErrorScreen({
  onRetry,
  title="Something went wrong",
  message,
  buttonElement,
  extraStyles,
}: ErrorScreenProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-[#FFDAD6] w-10 h-10 flex items-center justify-center rounded-lg mb-3">
        <span className="material-symbols-outlined text-[#BA1A1A]">
          cloud_off
        </span>
      </div>
      <h2 className="title-lg mb-2">{title}</h2>
      <p className={`body-md text-center max-w-xs mb-6 ${extraStyles}`}>
        {message}
      </p>
      {buttonElement ? (
        <button
          onClick={() => onRetry?.()}
          className="px-4 py-[8px] bg-[#0052CC] hover:bg-[#1966e1] transition-colors font-semibold text-white cursor-pointer rounded-xs"
        >
          Retry Connection
        </button>
      ) : null}
    </div>
  );
}
