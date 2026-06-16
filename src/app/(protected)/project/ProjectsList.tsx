'use client';
import { useRouter } from 'next/navigation';
import ProjectCard from './_components/ProjectCard';
import ErrorScreen from '../_components/ErrorScreen';
import LoadingCard from './_components/LoadingCard';
import EmptyState from '../_components/EmptyState';
import AddProjectCard from './_components/AddProjectCard';
import Pagination from '../_components/Pagination';
import MobilePlusButton from './_components/MobilePlusButton';
import Header from './_components/Header';
import { formatDate } from '../_utils/formatDate';
import type { Project } from '@/lib/types';

type ProjectListProps = {
  projects: Project[];
  loading: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
  currentPage: number;
  totalCount: number;
  isFetched: boolean;
  fetchProjects: (page: number) => void;
  pageSize: number;
};

export default function ProjectsList({
  projects,
  loading,
  error,
  currentPage,
  isFetched,
  totalCount,
  fetchProjects,
  pageSize,
}: ProjectListProps) {
  const router = useRouter();

  if (error) {
    return (
      <ErrorScreen
        message={` We're having trouble retrieving your projects right now. Please try
        again in a moment.`}
        onRetry={() => fetchProjects(1)}
        buttonElement={true}
      />
    );
  }

  if (
    loading === 'success' &&
    error.length === 0 &&
    isFetched &&
    projects.length === 0
  ) {
    return (
      <EmptyState
        imageSrc="/empty-project.png"
        imageAlt="empty project list"
        imageWidth={288}
        imageHeight={288}
        imageStyles="mt-8 mb-6 w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
        title="No Projects"
        description=" You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics."
        buttonLabel="Create New Project"
        materialButtonIcon="add"
        onButtonClick={() => router.push('/project/add')}
      />
    );
  }

  function renderProjects(projects: Project[]) {
    return projects.map((project: Project) => (
      <ProjectCard
        id={project.id}
        key={project.id}
        name={project.name}
        description={project.description}
        date={formatDate(project.created_at)}
      />
    ));
  }

  return (
    <div className="px-8">
      {loading === 'loading' && (
        <>
          <Header loading={loading === 'loading'} />
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-[24px] max-h-[524px]">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </>
      )}

      {loading === 'success' && error.length === 0 && projects.length > 0 && (
        <>
          <Header
            desktopTitle="Projects"
            buttonLabel="Create New Project"
            desktopDescription="Manage and curate your projects"
            materialIcon="add"
            mobileTitle=""
            mobileStyles=""
            handleBtnClick={() => router.push('/project/add')}
          />
          {
            <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-6 mb-6 md:mb-10">
              {renderProjects(projects)}
              <AddProjectCard />
            </div>
          }

          <MobilePlusButton
            handleBtnClick={() => router.push('/project/add')}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            isFetched={isFetched}
            onPageChange={fetchProjects}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
}
