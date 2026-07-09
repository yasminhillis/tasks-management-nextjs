import PageWrapper from "../../../_components/PageWrapper"
import AddNewTaskForm from "./AddNewTaskForm"
export default async function AddNewTask({params} : {params: Promise<{id: string}>}){
    const { id } = await params;
    return <PageWrapper>
        <header className="mb-8">
            <h1 className="headline-lg">Create New Task</h1>
            <p className="body-md mt-2">Initialize a new work item within the Architectural Workspace ecosystem.</p>
        </header>
        <AddNewTaskForm projectId={id}/>
    </PageWrapper>
}