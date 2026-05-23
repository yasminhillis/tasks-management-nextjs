'use client'
import { PAGE_SIZE } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchProjects } from '@/lib/store/slices/projectsSlice';

export default function Pagination() {
  const dispatch = useAppDispatch()

  const { currentPage, totalCount, isFetched } = useAppSelector(state => state.projects)

  const totalPages = Math.ceil(totalCount / PAGE_SIZE); 

  const pageButtons = [...Array(totalPages)].map((_, index) => (
    <button 
            key={index + 1}
            onClick={() => dispatch(fetchProjects({ page: index + 1, limit: PAGE_SIZE, mode: 'desktop'}))}
            className={`w-[32px] h-[32px] rounded-xs flex items-center 
            justify-center border border-[#C3C6D64D] ${currentPage === index + 1 ? 'border border-transparent bg-[#003D9B] text-white' : 'border border-[#C3C6D64D] text-[#434654]'}
            font-bold text-xs cursor-pointer`}>
      {index + 1}
    </button>
  ))

  function handlePageChange(page: number){
    if ( page < 1 || page > totalPages) return;
    dispatch(fetchProjects({ page: page, limit: PAGE_SIZE, mode: 'desktop' }))
  }

  return ( 
    
    isFetched && <div className="hidden md:flex justify-between items-center pt-12 pr-8 pb-8 pl-8 mb-[121px]">
       <h3>Showing {PAGE_SIZE} of {totalCount} active projects</h3>
      <div className="flex items-center gap-2">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="w-[32px] h-[32px] rounded-xs 
        flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '12px' }}
          >
            arrow_back_ios_new
          </span>
        </button>
        
        {pageButtons}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="w-[32px] h-[32px] 
        rounded-xs flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer text-xs disabled:cursor-not-allowed disabled:opacity-50">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '12px' }}
          >
            arrow_forward_ios
          </span>
        </button>
      </div>
    </div>
  );
}
