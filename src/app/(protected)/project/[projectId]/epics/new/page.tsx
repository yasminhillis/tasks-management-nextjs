import { getProjectMembers } from "@/lib/actions/projectActions"
import AddEpicForm from "./AddEpicForm";
import PageWrapper from "../../../_components/PageWrapper";

export default async function AddNewEpic({params} : {params: Promise<{projectId: string}>}){
    const { projectId } = await params
    const projectMembers = await getProjectMembers(projectId);
    // console.log(projectMembers, 'projMems');
    
    return <>
    <PageWrapper>
    <h1 className="display-md mb-2">Create New Epic</h1>
    <p className="body-lg mb-8 max-w-[472px]">Define a major project phase or high-level milestone to group
        related tasks and track architectural progress.</p>
    <AddEpicForm members={projectMembers.data} projectId={projectId}/>
    </PageWrapper>
    </>
}