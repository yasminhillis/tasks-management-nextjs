import EpicIcon from "@/components/icons/EpicIcons"
import Toast from "@/components/Toast";
import { updateEpic } from "@/lib/actions/epicActions";
import { useState } from "react";
import type { Epic } from "@/lib/types";
import updateFiled from "../_utils/updateFiled";

type ModalHeaderProps = {
    epicId: string, 
    displayId: string,
    title: string, 
    onClose: () => void,
    onEpicUpdate: (id: string, data: Partial<Epic>) => void
}

export default function ModalHeader({epicId, displayId, title, onClose, onEpicUpdate}: ModalHeaderProps){
    const [previousTitleValue, setPreviousTitleValue] = useState(title);
    const [currentTitleValue, setCurrentTitleValue] = useState(title);
    const [isSaving, setIsSaving] = useState(false); 
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false)

    function showToast(message: string, success: boolean){
        setMessage(message);
        setSuccess(success);
        setTimeout(() => {
            setMessage('');
            setSuccess(false)
        }, 3000)
    }

    // const updateEpicHandler = async (updatedTitle: string) => {
    //     if (currentTitleValue === previousTitleValue) return;
    //     setIsSaving(true); 
    //     try {
    //         const result = await updateEpic({epicId: epicId, data: {
    //             title: updatedTitle
    //         }})
    
    //         if (result.success) {
    //             showToast('Title updated successfully', true)
    //             setPreviousTitleValue(updatedTitle)
    //             onEpicUpdate(epicId, {title: updatedTitle})
    //         }
    
    //         if (!result.success) {
                // showToast(result.message, false)
                // setCurrentTitleValue(previousTitleValue)
    //         }
            
    //     } catch(error) {
    //         showToast('Network error. Please try again', false)
    //         setCurrentTitleValue(previousTitleValue)
    //     } finally {
    //         setIsSaving(false)
    //     }
    // }

    async function updateFieldHandler(field: "title" | "description" | "assignee" | "deadline", previousValue:string, currentValue:string){
        function handleSuccess(){
            showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`, true)
            setPreviousTitleValue(currentValue)
            onEpicUpdate(epicId, {[field]: currentValue})
        }
        
        function handleRevert(previousValue:string, message:string){
            showToast(message, false)
            setCurrentTitleValue(previousValue)
        }
        setIsSaving(true)

        await updateFiled({epicId, field, previousValue, currentValue, onSuccess: handleSuccess, onRevert: handleRevert})
        setIsSaving(false)
    }

    return <div className="bg-linear-to-b from-white to-[#F1F3FF] md:bg-none bg-white pt-[24px] pr-[24px] pb-[8px] pl-[24px] md:p-[32px] flex justify-between border-b border-b-[#C3C6D626]">
        {message && <Toast success={success}>{message}</Toast>}
        <div>
            <div className="flex items-center gap-[8px] mb-[8px]">
                <EpicIcon />
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#003D9B] 
              md:text-[12px] md:tracking-[0.6px] md:text-[#041B3C] md:opacity-60">{displayId}</p>
            </div>
            <input className="title-xl p-2 border border-transparent focus:border focus:border-primary-container appearance-none outline-none" type="text" value={currentTitleValue} onBlur={() => updateFieldHandler("title", previousTitleValue, currentTitleValue)} onChange={e => setCurrentTitleValue(e.target.value)} disabled={isSaving}/>
        </div>
        <button onClick={onClose} className="cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '21px', color: '#041B3C99'}}>close</span>
        </button>
    </div>
}