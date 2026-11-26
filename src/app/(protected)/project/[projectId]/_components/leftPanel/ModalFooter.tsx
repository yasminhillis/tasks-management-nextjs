import CopyLinkIcon from '@/components/icons/CopyLinkIcon';
import Link from 'next/link';

export default function ModalFooter() {
  return (
    <div className="flex items-center justify-between bg-[#F1F3FF] mt-auto px-8 py-4 ">
      <button className="group hover-primary cursor-pointer flex items-center gap-2">
        <CopyLinkIcon className="tansition-colors duration-150" />
        <span className="caption-md hover:text-primary-container">
          Copy Link
        </span>
      </button>
      <button className="modal-close-button">Close</button>
    </div>
  );
}
