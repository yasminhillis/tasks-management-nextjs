'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectHeader from './_components/ProjectHeader';
import ProjectCard from './_components/ProjectCard';
import ErrorScreen from '../_components/ErrorScreen';
import LoadingCard from './_components/LoadingCard';
import EmptyState from '../_components/EmptyState';
import AddProjectCard from './_components/AddProjectCard';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchProjects } from '@/lib/store/slices/projectsSlice';
import { PAGE_SIZE } from '@/lib/constants';
import Pagination from './_components/Paginations';

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function ProjectsList() {
  const dispatch = useAppDispatch();
  const { projects, isLoading, error, currentPage, isFetched } = useAppSelector(
    (state) => state.projects
  );

  const router = useRouter();

  useEffect(() => {
    console.log(window.innerWidth, 'window.innerWidth');
    
    const mode = window.innerWidth < 768 ? 'mobile' : 'desktop';
    dispatch(fetchProjects({ page: 1, limit: PAGE_SIZE, mode }));
  }, [dispatch]);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  if (error) {
    console.log(error, 'error');
    
    return (
      <ErrorScreen
        message={` We're having trouble retrieving your projects right now. Please try
        again in a moment.`}
        pageErrorHappendOn="projectList" 
        onRetry={() => {
          dispatch(
            fetchProjects({
              page: currentPage,
              limit: PAGE_SIZE,
              mode: 'desktop',
            })
          );
        }}
        buttonElement={true}
      />
    );
  }

  if (!isLoading && !error && isFetched && projects.length === 0) {
    return  <EmptyState imageSrc="/empty-project.png" imageAlt='empty project list' imageWidth={288} imageHeight={288} imageStyles="mt-8 mb-6 w-[180px] h-[180px] md:w-[220px] md:h-[220px]" title="No Projects" description=" You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics."
        buttonLabel='Create New Project' materialButtonIcon='add' onButtonClick={() => router.push('/project/add')}
        />
  }

  return (
    <div className="px-8">  

      {isLoading && (
        <>
          <ProjectHeader loading={isLoading} />
          <div className="grid md:grid-cols-3 justify-items-center gap-3 max-h-[524px]">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </>
      )}
      {!isLoading && !error && projects.length > 0 && (
        <>
          <ProjectHeader loading={isLoading} />
          {
            <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-6 mb-6 md:mb-10">
              {projects.map((project: Project) => (
                <ProjectCard
                  id={project.id}
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  date={formatDate(project.created_at)}
                />
              ))}
              <AddProjectCard />
            </div>
          }
          <div className="flex items-center justify-end md:hidden mb-10">
            <button
              onClick={() => router.push('/project/add')}
              className="btn-primary rounded-lg w-[56px] h-[56px] text-3xl font-normal"
            >
              +
            </button>
          </div>
        </>
      )}
      <Pagination />
    </div>
  );
}
