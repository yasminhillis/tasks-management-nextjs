'use client'
import { use, useEffect, useState } from "react";
import Header from "../../_components/Header";
import PageWrapper from "../../_components/PageWrapper";
import BoardView from "./_components/BoardView";
import ListView from "./_components/ListView";
import ViewSelect from "./_components/ViewSelect";
import { useSearchParams } from "next/navigation";

export default  function Tasks({params}:{params: Promise<{projectId:string}>}) {
  const { projectId } = use(params);  
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const isBoard = view === 'board';
  const [projectName, setProjectName] = useState('');

  async function getProjectName(projectId: string){
    const res = await fetch(`/api/projects/${projectId}`); 
    console.log(res, 'res 999');
    const { projectName: name} = await res.json(); 
    setProjectName(name)
    console.log(name, 'name');
    
  }

  useEffect(() => {
    getProjectName(projectId)
  }, [projectId])

  return (
    <PageWrapper fillHeight={isBoard}>
      <Header 
        desktopTitle="Active Workboard"
        desktopDescription={`Curating ${ projectName ||  "Your Project" }'s production pipeline and milestones.`}
        desktopDescriptionExtraStyles="font-normal text-[14px] text-[#64748B]"
        searchBar={<div className="flex items-center w-[256px] h-[36px] bg-[#D7E2FF] pl-[12px] rounded-[2px]">
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
                  />
                </div>}
        headerControls={<ViewSelect />}        
      />
    { view === 'board' && <BoardView projectId={projectId} /> }
    { view === 'list' && <ListView  projectId={projectId} /> }
    </PageWrapper>
  );
}
