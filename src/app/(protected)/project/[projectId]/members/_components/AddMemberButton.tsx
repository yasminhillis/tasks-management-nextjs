export default function AddMemberButton({state, loadingStyle}: {state: 'success' | 'loading', loadingStyle: string}){
    return <button className={`${state === "loading" ? `${loadingStyle} w-[40px] h-[40px]` : `btn-primary px-[24px] py-[12px] rounded-[10px] w-[40px] h-[40px] cursor-pointer`}`}>
     { state === 'success' && <span className='material-symbols-outlined'>
        person_add
      </span>}
    </button>
}