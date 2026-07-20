export default function EpicTasksEmptyState(){
    return <div className="border-dashed-custom bg-[#F1F3FF] p-[48px] rounded-[8px] flex flex-col items-center justify-center gap-[16px]">
        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#D7E2FF]">
          <span
            className="material-symbols-outlined hidden! md:inline!"
            style={{ opacity: '30%' }}
          >
            list
          </span>

          <span
            className="material-symbols-outlined md:hidden!"
            style={{ color: '#003D9B' }}
          >
            list
          </span>
        </div>
        <p className="empty-state-text text-center text-[#4F5F7B]">
          No tasks have been added to this epic yet
        </p>
        <button className="btn-primary shadow-sm text-[12px] md:text-[16px] gap-[3px]">
          <span
            className="material-symbols-outlined md:hidden!"
            style={{ fontSize: '17px' }}
          >
            add
          </span>
          <span
            className="material-symbols-outlined hidden! md:inline!"
            style={{ fontSize: '20px' }}
          >
            add
          </span>
          Add Task
        </button>
      </div>
}