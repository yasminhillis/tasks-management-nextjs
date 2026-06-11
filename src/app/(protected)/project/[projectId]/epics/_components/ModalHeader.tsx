import EpicIcon from "@/components/icons/EpicIcons"

type ModalHeaderProps = {
    epicId: string, 
    title: string, 
    onClose: () => void
}

export default function ModalHeader({epicId, title, onClose}: ModalHeaderProps){
    return <div className="p-[32px] flex justify-between border-b border-b-[#C3C6D626]">
        <div>
            <div className="flex items-center gap-[8px] mb-[8px]">
                  <EpicIcon />
                <p className="text-[12px] font-bold tracking-[0.6px] uppercase opacity-60">{epicId}</p>
            </div>
            <h1 className="title-xl">{title}</h1>
        </div>
        <button onClick={onClose} className="cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '21px', color: '#041B3C99'}}>close</span>
        </button>
    </div>
}