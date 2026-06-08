'use client';
import { PROJECTS_PAGE_SIZE, EPICS_PAGE_SIZE } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchEpics } from '@/lib/store/slices/epicSlice';
import { fetchProjects } from '@/lib/store/slices/projectsSlice';

type PaginationProps = {
  slice: 'epics' | 'projects';
};

export default function Pagination({ slice }: PaginationProps) {
  const dispatch = useAppDispatch();

  const projectData = useAppSelector((state) => state.projects);

  const epicData = useAppSelector((state) => state.epics);

  const { currentPage, totalCount, isFetched } =
    slice === 'epics' ? epicData : projectData;
  const projectId = slice === 'epics' ? epicData.projectId : '';
  const pageSize = slice === 'epics' ? EPICS_PAGE_SIZE : PROJECTS_PAGE_SIZE;

  const totalPages = Math.ceil(totalCount / pageSize);

  const pageButtons = [...Array(totalPages)].map((_, index) => (
    <button
      key={index + 1}
      onClick={() =>
        slice === 'projects'
          ? dispatch(
              fetchProjects({
                page: index + 1,
                limit: pageSize,
                mode: 'desktop',
              })
            )
          : dispatch(
              fetchEpics({
                projectId: projectId!,
                page: index + 1,
                limit: pageSize,
                mode: 'desktop',
              })
            )
      }
      className={`w-[32px] h-[32px] rounded-xs flex items-center 
            justify-center border border-[#C3C6D64D] ${currentPage === index + 1 ? 'border border-transparent bg-[#003D9B] text-white' : 'border border-[#C3C6D64D] text-[#434654]'}
            font-bold text-xs cursor-pointer`}
    >
      {index + 1}
    </button>
  ));

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    if (slice === 'epics') {
      dispatch(
        fetchEpics({
          projectId: projectId!,
          page,
          limit: pageSize,
          mode: 'desktop',
        })
      );
    } else {
      dispatch(fetchProjects({ page, limit: pageSize, mode: 'desktop' }));
    }
  }

  if (totalPages <= 1) return null;
  return (
    isFetched && (
      <div className="hidden md:flex justify-between items-center mb-[121px]">
        <h3>
          Showing {pageSize} of {totalCount}{' '}
          {slice === 'projects' ? 'active projects' : 'epics'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-[32px] h-[32px] rounded-xs 
        flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '12px' }}
            >
              arrow_back_ios_new
            </span>
          </button>

          {pageButtons}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-[32px] h-[32px] 
        rounded-xs flex items-center justify-center border border-[#C3C6D64D] 
        cursor-pointer text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '12px' }}
            >
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>
    )
  );
}
