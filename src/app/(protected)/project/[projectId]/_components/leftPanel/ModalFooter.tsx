import Link from 'next/link';

export default function ModalFooter() {
  return (
    <div className="flex items-center justify-between bg-[#F1F3FF] mt-auto px-8 py-4">
      <Link className="caption-md" href="#">
        Copy Link
      </Link>
      <button className="modal-close-button">Close</button>
    </div>
  );
}
