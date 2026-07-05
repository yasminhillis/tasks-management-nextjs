import PageWrapper from "../../../_components/PageWrapper"
import AddNewTaskForm from "./AddNewTaskForm"
export default function AddNewTask(){
    return <PageWrapper>
        <header>
            <h1 className="headline-lg">Create New Task</h1>
            <p className="body-md mt-2">Initialize a new work item within the Architectural Workspace ecosystem.</p>
        </header>
        <AddNewTaskForm />
    </PageWrapper>
}