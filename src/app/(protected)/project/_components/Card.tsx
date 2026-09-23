import React from 'react';

type CardBasePrpos = {
  children?: React.ReactNode;
  extraStyles?: string;
  onClick?: () => void;
};
export default function Card({
  children,
  onClick,
  extraStyles,
}: CardBasePrpos) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col bg-white items-start bg-red-100 shadow-sm md:shadow-none w-full rounded-md p-6 cursor-pointer hover:shadow-sm ${extraStyles}`}
    >
      {children}
    </div>
  );
}
