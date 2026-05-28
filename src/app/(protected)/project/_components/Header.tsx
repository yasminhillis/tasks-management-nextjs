
type HeaderProps = {
    mobileTitle: string, 
    desktopTitle?: string, 
    mobileDescription?: string, 
    buttonLabel: string, 
    materialIcon: string,
    mobileStyles?: string
}

export default function Header({mobileTitle, desktopTitle, mobileDescription, buttonLabel, materialIcon, mobileStyles}: HeaderProps){
    return <div className="font-sans">
        <div className="md:hidden mb-8">
        <h2 className={`md:hidden text-[#041B3C] font-semibold text-2xl mb-1 ${mobileStyles}`}>
          {mobileTitle}
        </h2>
        <p className="text-[#4F5F7B] text-sm">
          {mobileDescription}
        </p>
      </div>
      <div className="hidden md:block md:flex items-center justify-between mb-10">
        <h2 className="hidden md:block font-semibold md:text-4xl text-[#041B3C]">
          {desktopTitle}
        </h2>
        <button className="hidden md:block md:flex rounded-xs items-center gap-2 px-6 py-3 shadow-blue-md bg-radial from-[#003D9B] to-[#0052CC] text-white text-sm cursor-pointer hover:from-[#1259cb] hover:to-[#0657d1] transition-colors font-bold">
          <span className="material-symbols-outlined">
            {materialIcon}
          </span>
          {buttonLabel}
        </button>
      </div>
    </div>
}