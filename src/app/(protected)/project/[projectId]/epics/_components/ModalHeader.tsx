import EpicIcon from "@/components/icons/EpicIcons"

type ModalHeaderProps = {
    epicId: string, 
    title: string, 
    onClose: () => void
}

export default function ModalHeader({epicId, title, onClose}: ModalHeaderProps){
    return <div className="bg-linear-to-b from-white to-[#F1F3FF] md:bg-none bg-white pt-[24px] pr-[24px] pb-[8px] pl-[24px] md:p-[32px] flex justify-between border-b border-b-[#C3C6D626]">
        <div>
            <div className="flex items-center gap-[8px] mb-[8px]">
                  <EpicIcon />
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#003D9B] 
              md:text-[12px] md:tracking-[0.6px] md:text-[#041B3C] md:opacity-60">{epicId}</p>
            </div>
            <h1 className="title-xl">{title}</h1>
        </div>
        <button onClick={onClose} className="cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '21px', color: '#041B3C99'}}>close</span>
        </button>
    </div>
}