import EpicIcon from '@/components/icons/EpicIcons';
import Toast from '@/components/Toast';
import { useState } from 'react';
import type { Epic } from '@/lib/types';
import updateFiled from '../_utils/updateFiled';
import { useToast } from '@/lib/hooks/useToast';

type ModalHeaderProps = {
  epicId: string;
  displayId: string;
  title: string;
  onClose: () => void;
  onEpicUpdate: (id: string, data: Partial<Epic>) => void;
};

export default function ModalHeader({
  epicId,
  displayId,
  title,
  onClose,
  onEpicUpdate,
}: ModalHeaderProps) {
  const [previousTitleValue, setPreviousTitleValue] = useState(title);
  const [currentTitleValue, setCurrentTitleValue] = useState(title);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { message, success, showToast } = useToast();

  async function updateFieldHandler(
    field: 'title' | 'description' | 'assignee' | 'deadline',
    previousValue: string,
    currentValue: string
  ) {
    function handleSuccess() {
      showToast(
        `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`,
        true
      );
      setPreviousTitleValue(currentValue);
      onEpicUpdate(epicId, { [field]: currentValue });
    }

    function handleRevert(previousValue: string, message: string) {
      showToast(message, false);
      setCurrentTitleValue(previousValue);
    }
    setIsSaving(true);

    await updateFiled({
      epicId,
      field,
      previousValue,
      currentValue,
      onSuccess: handleSuccess,
      onRevert: handleRevert,
    });
    setIsSaving(false);
  }

  function handleCopy() {
    const currentUrl = window.location.href;
    console.log(currentUrl, 'curr url');
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-full bg-linear-to-b from-white to-[#F1F3FF] md:bg-none bg-white pt-[24px] pr-[24px] pb-[8px] pl-[24px] md:p-[32px] border-b border-b-[#C3C6D626]">
      {message && <Toast success={success}>{message}</Toast>}
      <div>
        <div className="flex items-center justify-between mb-4 ">
          <div className="flex items-center gap-[8px]">
            <EpicIcon />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#003D9B] 
                md:text-[12px] md:tracking-[0.6px] md:text-[#041B3C] md:opacity-60"
            >
              {displayId}
            </p>
          </div>

          <div className="flex gap-4">
            {
              <button
                onClick={handleCopy}
                disabled={copied}
                className="hover-primary flex items-center gap-2 cursor-pointer caption-md"
              >
                {copied ? (
                  <span className="text-emerald-600">copied!</span>
                ) : (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '16px' }}
                    >
                      link
                    </span>
                    Copy link
                  </>
                )}
              </button>
            }
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#BA1A1A1A]">
              <button
                onClick={onClose}
                className="cursor-pointer flex items-center hover:text-red-400"
              >
                <span
                  className="material-symbols-outlined text-[#041B3C99] hover:text-[#BA1A1A]"
                  style={{ fontSize: '19px' }}
                >
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
        <input
          className="border border-[#D7E2FF] rounded-lg w-full title-xl p-2 focus:border focus:border-primary-container appearance-none outline-none"
          type="text"
          value={currentTitleValue}
          onBlur={() =>
            updateFieldHandler('title', previousTitleValue, currentTitleValue)
          }
          onChange={(e) => setCurrentTitleValue(e.target.value)}
          disabled={isSaving}
        />
      </div>
    </div>
  );
}
