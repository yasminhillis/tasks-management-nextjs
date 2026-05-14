import Pagination from "./_components/Paginations"
import ProjectsList from "./ProjectsList"
export default function Project(){
    return <div className="mb-[88px] md:mb-[162px]">
        <ProjectsList />
        <Pagination />
    </div>
}