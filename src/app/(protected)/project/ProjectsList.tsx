'use client'
import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import ProjectHeader from './_components/ProjectHeader';
import ProjectCard from "./_components/ProjectCard"
import ErrorScreen from './ErrorScreen'
import LoadingCard from './_components/LoadingCard';
import EmptyState from './EmptyState';
import AddProjectCard from './_components/AddProjectCard';

type Project = {
    id: string,
    name: string, 
    description: string, 
    created_at: string
}

export default function ProjectsList(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false);

    const router = useRouter()

    async function fetchProjects(){
        try {
            setIsLoading(true)
            setError('')
            setShowError(false)
            const res = await fetch('/api/projects')

            if (res.status === 401) {
                router.push('/login')
            }
            if (!res.ok) {
                const error = await res.json(); 
                console.log(error, 'error');
                
                setError(error.message || error.msg)
                setShowError(true)
                return;
            }
            
            const data = await res.json();
            console.log(data, 'data');
                
            setProjects(data)
            setIsLoading(false)
            } catch(error) {
                setError('Something went wrong. Please try again')
                setShowError(true)
            } finally {
                setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])


    function formatDate(dateString: string){
        return new Date(dateString).toLocaleString('en-GB', {
            day: 'numeric', 
            month: 'short', 
            year: 'numeric'
        });

    }
    
    if (error) return <ErrorScreen onRetry={fetchProjects}/>

    return <div className="px-8">

        {
            !isLoading && !error && projects.length === 0 && (
               <EmptyState />
            )
        }

        {
            isLoading && (
                <>
                    <ProjectHeader loading={isLoading}/>
                    <div className='grid md:grid-cols-3 justify-items-center gap-3 max-h-[524px]'>
                        {
                            [...Array(6)].map((_, i) => <LoadingCard key={i}/>)
                        }
                    </div>
                </>
            )
        }
        {
            !isLoading && !showError && projects.length > 0 && (
                <>
                    <ProjectHeader loading={isLoading}/>
                    { 
                        <div className='grid md:grid-cols-3 justify-items-center gap-6 mb-6 md:mb-10'>
                            {projects.map((project: Project) => 
                                <ProjectCard id={project.id} key={project.id} name={project.name} description={project.description} date={formatDate(project.created_at)}/>) 
                            }
                            <AddProjectCard />
                        </div>
                    }
                    <div className='flex items-center justify-end md:hidden mb-10'>
                        <button onClick={() => router.push('/project/add')} className='btn-primary rounded-lg w-[56px] h-[56px] text-3xl font-normal'>+</button>
                    </div>
                </>
            )
        }
    </div>
}