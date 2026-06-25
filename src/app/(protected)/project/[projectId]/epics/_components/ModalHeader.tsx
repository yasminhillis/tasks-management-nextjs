import EpicIcon from "@/components/icons/EpicIcons"
import Toast from "@/components/Toast";
import { updateEpic } from "@/lib/actions/epicActions";
import { useState } from "react";

type ModalHeaderProps = {
    epicId: string, 
    displayId: string,
    title: string, 
    onClose: () => void
}

export default function ModalHeader({epicId, displayId, title, onClose}: ModalHeaderProps){
    console.log(epicId, 'epicId from modal header');
    

    const [previousTitleValue, setPreviousTitleValue] = useState(title);
    const [currentTitleValue, setCurrentTitleValue] = useState(title);
    const [isSaving, setIsSaving] = useState(false); 
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    function showToast(message: string, success: boolean){
        setMessage(message);
        setSuccess(success);
        setTimeout(() => {
            setMessage('');
            setSuccess(false)
        }, 3000)
    }

    const updateEpicHandler = async (updatedTitle: string) => {
        setIsSaving(true); 
        const result = await updateEpic({epicId: epicId, data: {
            title: updatedTitle
        }})

        console.log(result, 'result');
        

        if (result.success) {
            showToast('Title updated successfully', true)
            setPreviousTitleValue(updatedTitle)
        }

        if (!result.success) {
            showToast('Failed to update title', false)
            setCurrentTitleValue(previousTitleValue)
        }
        setIsSaving(false)
        setIsUpdated(true)
    }

    return <div className="bg-linear-to-b from-white to-[#F1F3FF] md:bg-none bg-white pt-[24px] pr-[24px] pb-[8px] pl-[24px] md:p-[32px] flex justify-between border-b border-b-[#C3C6D626]">
        {isUpdated && <Toast success={success}>{message}</Toast>}
        <div>
            <div className="flex items-center gap-[8px] mb-[8px]">
                  <EpicIcon />
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#003D9B] 
              md:text-[12px] md:tracking-[0.6px] md:text-[#041B3C] md:opacity-60">{displayId}</p>
            </div>
            <input className="title-xl" type="text" value={currentTitleValue} onBlur={() => updateEpicHandler(currentTitleValue)} onChange={e => setCurrentTitleValue(e.target.value)} disabled={isSaving} />
        </div>
        <button onClick={onClose} className="cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '21px', color: '#041B3C99'}}>close</span>
        </button>
    </div>
}