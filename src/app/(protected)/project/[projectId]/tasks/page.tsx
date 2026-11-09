'use client';
import { use, useEffect, useState } from 'react';
import Header from '../../_components/Header';
import PageWrapper from '../../_components/PageWrapper';
import BoardView from './_components/BoardView';
import ListView from './_components/ListView';
import ViewSelect from './_components/ViewSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useIsMobile from '@/hooks/use-is-mobile';
import MobileView from './_components/MobileView';

export default function Tasks({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter(); 
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isBoard = view === 'board';
  const [projectName, setProjectName] = useState('');
  const {isMobile} = useIsMobile();
  const titleFromURL = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(titleFromURL)
  

  async function getProjectName(projectId: string) {
    const res = await fetch(`/api/projects/${projectId}`);
    const { projectName: name } = await res.json();
    setProjectName(name);
  }

  useEffect(() => {
    getProjectName(projectId);
  }, [projectId, titleFromURL]);

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>){
    const params = new URLSearchParams(searchParams.toString()); 
    const title = e.target.value; 
    if (title) {
      params.set('search', title)
    } else {
      params.delete('search')
    }
    router.push(`${pathname}?${params.toString()}`)
    // setSearchTerm(title)
  }

  return (    
    <PageWrapper fillHeight={isBoard}>
      <Header
        desktopTitle="Active Workboard"
        desktopDescription={`Curating ${projectName || 'Your Project'}'s production pipeline and milestones.`}
        desktopDescriptionExtraStyles="font-normal text-[14px] text-[#64748B]"
        mobileTitle="Active Workboard"
        searchBar={
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center'} w-full md:w-[256px]`}>
            
            <div className={`pl-[12px] flex items-center bg-[#D7E2FF] h-[36px] ${isMobile ? 'rounded-md' : 'rounded-[2px]'} ${isMobile ? '' : 'flex-1'}`}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '16px', color: '#737685' }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search tasks..."
                className="text-[14px] text-[#737685] px-[12px] py-[10px] outline-none"
                onChange={handleSearchInputChange}
                value={titleFromURL}
              />
            </div>
            { isMobile ? <button className="btn-primary-sm flex justify-center items-center gap-2 w-full">
              <span className="material-symbols-outlined" style={{'fontSize': '16px'}}>add</span>
              Create Task
              </button> :  null }
          </div>
        }
        headerControls={<ViewSelect />}
      />

      {isMobile ? (
        <MobileView projectId={projectId} />
      ) : view === 'board' ? (
        <BoardView projectId={projectId} searchTerm={titleFromURL}/>
      ) : view === 'list' ? (
        <ListView projectId={projectId} />
      ) : null}
    </PageWrapper>
  );
}
