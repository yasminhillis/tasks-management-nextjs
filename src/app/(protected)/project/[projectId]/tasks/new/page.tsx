import { Status } from "@/lib/types";
import PageWrapper from "../../../_components/PageWrapper"
import AddNewTaskForm from "./AddNewTaskForm"

export default async function AddNewTask({
  params,
  searchParams
}: {
  params: Promise<{ projectId: string, statusForRequest: Status }>,
  searchParams: Promise<{ status?: string, epicId?: string }>;
}){
    const { projectId } = await params;
    const { status, epicId } = await searchParams;
    
    console.log(status, 'status');
    
    
    return <PageWrapper>
        <header className="mb-8">
            <h1 className="headline-lg">Create New Task</h1>
            <p className="body-md mt-2">Initialize a new work item within the Architectural Workspace ecosystem.</p>
        </header>
        <AddNewTaskForm projectId={projectId} status={status as Status | undefined} epicId={epicId}/>
    </PageWrapper>
}