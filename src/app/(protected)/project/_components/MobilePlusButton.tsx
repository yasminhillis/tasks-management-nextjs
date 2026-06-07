type MobilePlusButtonProps = {
  handleBtnClick: () => void;
};

export default function MobilePlusButton({
  handleBtnClick,
}: MobilePlusButtonProps) {
  return (
    <div className="flex items-center justify-end md:hidden mb-10">
      <button
        onClick={handleBtnClick}
        className="inline-flex items-center justify-center w-[56px] h-[56px] btn-primary text-xl rounded-lg"
      >
        +
      </button>
    </div>
  );
}
