import { getProjectMembers } from '@/lib/actions/projectActions';
import Header from '../../_components/Header';
import PageWrapper from '../../_components/PageWrapper';
import MembersTable from './MembersTable';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';

// import { useEffect, useState } from 'react';
// import type { Members } from '@/lib/types';

export default async function Members({ params}: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  console.log(projectId, 'projectId 77');
  // const [members, setMembers] = useState([])

  // async function getProjectMembersByProjectId(){
    
  //   return result
  // } 

  // useEffect(() => {
  //   const projectMembers = getProjectMembersByProjectId()
  //   console.log(projectMembers, 'kk');
    
  //   // setMembers(projectMembers.data)
  // }, [projectId])
  const result = await getProjectMembers(projectId); 
  console.log(result, 'kk');
  
  if (!result.success) return <ErrorScreen message={result.message}/>
  return (
    <PageWrapper>
      <Header
        desktopTitle="Project Members"
        buttonLabel="Invite Member"
        materialIcon="person_add"
        mobileTitle="Project Members"
        mobileStyles="text-center"
      />
      <MembersTable data={result.data}/>
    </PageWrapper>
  );
}
