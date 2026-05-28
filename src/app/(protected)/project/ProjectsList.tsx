'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectHeader from './_components/ProjectHeader';
import ProjectCard from './_components/ProjectCard';
import ErrorScreen from '../_components/ErrorScreen';
import LoadingCard from './_components/LoadingCard';
import EmptyState from '../_components/EmptyState';
import AddProjectCard from './_components/AddProjectCard';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchProjects, setCurrentPage } from '@/lib/store/slices/projectsSlice';
import { PAGE_SIZE } from '@/lib/constants';

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function ProjectsList() {
  const dispatch = useAppDispatch()
  const {  projects, 
    isLoading, 
    error, 
    currentPage, 
    totalCount, isFetched } = useAppSelector(state => state.projects)

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProjects({page: 1, limit: PAGE_SIZE, mode: 'desktop'}));
  }, [dispatch]);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  
  if (error) {
    console.log(error, 'error 33');
    
    return <ErrorScreen message={` We're having trouble retrieving your projects right now. Please try
        again in a moment.`} 
        onRetry={() => {dispatch(fetchProjects({ page: currentPage, limit: PAGE_SIZE, mode: 'desktop' }))}}
        buttonElement={true}
       />;}

  return (
    <div className="px-8">
      {!isLoading && !error && isFetched && projects.length === 0 && <EmptyState />}

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
            <div className="grid md:grid-cols-3 justify-items-center gap-6 mb-6 md:mb-10">
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
    </div>
  );
}
