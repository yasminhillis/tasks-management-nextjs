import ListTable from "./ListTable"


export default function ListView({projectId}: {projectId: string}){
    return <ListTable projectId={projectId} />
}