'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type EmptyStateProps = {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageStyles: string;
  title: string;
  description: string;
  buttonLabel: string;
  materialButtonIcon: string;
  onButtonClick?: () => void;
  footer?: React.ReactNode;
};

export default function EmptyState({
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
  imageStyles,
  title,
  description,
  buttonLabel,
  materialButtonIcon,
  onButtonClick,
  footer,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Image
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
        alt={imageAlt}
        className={imageStyles}
      />
      <h1 className="title-lg mb-4">{title}</h1>

      <p className="body-md text-center mb-6 md:mb-12 w-[258px] md:w-[448px]">
        {description}
      </p>

      <button
        onClick={onButtonClick}
        type="button"
        className="flex items-center gap-1 text-white px-4 py-3 rounded-xs bg-radial font-medium from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors shadow-sm cursor-pointer mb-[40px] shadow-btn-primary"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px' }}
        >
          {materialButtonIcon}
        </span>
        {buttonLabel}
      </button>

      {footer && <div>{footer}</div>}
    </div>
  );
}
