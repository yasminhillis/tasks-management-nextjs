
type ModalErrorProps = {
    onClose: () => void
}

export default function ModalError({ onClose }: ModalErrorProps){
    return <div onClick={onClose} className="fixed inset-0 backdrop-blur-xs bg-black/50 z-100 flex items-center justify-center">
    
    <div onClick={e => e.stopPropagation()}  className="bg-white w-[672px] rounded-[8px] shadow-modal p-5">
     <div className='flex justify-end'>
       <button onClick={onClose} className="cursor-pointer">
            <span className="material-symbols-outlined" style={{'fontSize': '21px', color: '#041B3C99'}}>close</span>
        </button>
     </div>
     <div className='flex flex-col items-center justify-center  p-9'>
        <div className="bg-[#FFDAD6] w-10 h-10 flex items-center justify-center rounded-lg mb-3">
        <span className="material-symbols-outlined text-[#BA1A1A]">
          cloud_off
        </span>
      </div>
      <h2 className="title-lg mb-2">Something went wrong</h2>
      <p className={`body-md text-center max-w-xs  `}>
        We're having trouble retrieving your
        epic details right now. Please try
        again in a moment.
      </p>
     </div>
    </div>
  </div>;
}