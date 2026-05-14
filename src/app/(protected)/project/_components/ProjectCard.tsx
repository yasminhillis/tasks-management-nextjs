import DotDropDown from './DotDropDown';

type ProjectCardProps = {
    id: string,
    name: string, 
    description: string, 
    date: string
}

export default function ProjectCard({id, name, description, date}: ProjectCardProps){
    return <div className="bg-white shadow-sm md:shadow-none w-full max-w-[304px] rounded-md p-6">
        <div className="flex justify-between">
            <h2 className="title-md mb-3">{name}</h2>
            <DotDropDown id={id}/>
        </div>
        <p className="body-md min-h-[69px] w-[256px] line-clamp-3" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    whiteSpace: 'normal',   
                    wordBreak: 'break-word'
                }}>{description}</p>

        <div className="flex items-center gap-[4px] md:justify-between pt-6 border-t border-t-[#C3C6D61A]">
            <span className="hidden md:block label-sm-muted">CREATED AT</span>
            <div className="md:hidden">
                <span className="material-symbols-outlined" style={{'fontSize': '14px'}}>
                    calendar_today
                </span>
            </div>
            <span className="caption-xs md:caption-md">{date}</span>
        </div>    
    </div>
}