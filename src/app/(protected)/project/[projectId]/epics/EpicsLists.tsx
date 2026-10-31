'use client';
import Header from '../../_components/Header';
import { ChangeEvent } from 'react';
import EpicCard from './_components/EpicCard';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import PageWrapper from '../../_components/PageWrapper';
import EpicCardSkeleton from './EpicCardSkeleton';
import EmptyState from '@/app/(protected)/_components/EmptyState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/app/(protected)/_components/Pagination';
import type { Epic } from '@/lib/types/index';
import MobilePlusButton from '../../_components/MobilePlusButton';
import EpicModal from './_components/EpicModal';
import { formatDate } from '@/app/(protected)/_utils/formatDate';
import EmptyStateFooter from './_components/EmptyStateFooter';
import SearchResultLoadingSkeleton from './_components/SearchResultLoadingSkeleton';
import NoSearchResult from './_components/NoSearchResult';

type EpicListProps = {
  epics: Epic[];
  error: string;
  fetchStatus: 'loading' | 'success' | 'failed';
  currentPage: number;
  projectId: string;
  isFetched: boolean;
  totalCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onEpicUpdate: (id: string, data: Partial<Epic>) => void;
  title: string;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  searchTerm: string;
  onRetry: (page: number) => Promise<void>
};

export default function EpicsList({
  projectId,
  epics,
  error,
  fetchStatus,
  currentPage,
  isFetched,
  totalCount,
  onPageChange,
  pageSize,
  onEpicUpdate,
  title,
  handleTitleChange,
  searchTerm,
  onRetry
}: EpicListProps) {
  const searchParams = useSearchParams();
  const epicId = searchParams.get('epicId') ?? '';
  const router = useRouter();
  const pathname = usePathname();

  function addEpicIdToSearchParams(epicId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('epicId', String(epicId));
    router.push(`${pathname}?${params.toString()}`);
  }

  function removeEpicIdToSearchParams() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('epicId');
    router.push(`${pathname}?${params.toString()}`);
  }

  function renderBody() {
    if (fetchStatus === 'loading') return <SearchResultLoadingSkeleton />;

    if (epics.length === 0 && searchTerm.length > 0 && totalCount === 0 && fetchStatus === 'success')
      return <NoSearchResult />;

    if (
      (epics.length === 0 && totalCount > 0 && fetchStatus === 'success') ||
      (fetchStatus === 'failed' &&
        error?.length > 0 &&
        error === 'page is out of range')
    ) {
      return (
        <ErrorScreen
          message={`The page you requested does not exist.`}
          buttonElement
          buttonLabel="Go to epics main page"
          onRetry={() => router.push(`/project/${projectId}/epics?page=1`)}
        />
      );
    }

    if (
      fetchStatus === 'failed' &&
      error?.length > 0 &&
      error === 'Fetching epics failed'
    ) {
      return (
        <ErrorScreen
          message={`We're having trouble retrieving your
                project epics right now. Please try
                again in a moment.`}
          buttonElement
          onRetry={() => onRetry(currentPage)}
        />
      );
    }

    if (
      fetchStatus === 'failed' &&
      error?.length > 0 &&
      error === 'Network error. Please try again later'
    ) {
      return (
        <ErrorScreen
          title="You're offline"
          message={`Network error. Please check your connection and try again.`}
          buttonElement={true}
          onRetry={() => onRetry(currentPage)}
        />
      );
    }

    if (
      fetchStatus === 'failed' &&
      error?.length > 0
    ) {
      return (
        <ErrorScreen
          message={`We're having trouble retrieving your
                project epics right now. Please try
                again in a moment.`}
          buttonElement
          onRetry={() => onRetry(currentPage)}
        />
      );
    }

    return (
      <>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 justify-items-center gap-6 mb-6 md:mb-10">
          {epics.map((epic: Epic) => (
            <EpicCard
              sendEpicIdToParent={() => addEpicIdToSearchParams(epic.id)}
              id={epic.epic_id}
              key={epic.epic_id}
              title={epic.title}
              assignee={epic.assignee?.name}
              createdBy={epic.created_by.name}
              deadline={epic.deadline}
              createdAt={formatDate(epic.created_at)}
            />
          ))}
        </div>

        {epicId && (
          <EpicModal
            projectId={projectId}
            epicId={epicId}
            onClose={() => removeEpicIdToSearchParams()}
            onEpicUpdate={onEpicUpdate}
          />
        )}

        <MobilePlusButton
          handleBtnClick={() => router.push(`/project/${projectId}/epics/new`)}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          isFetched={isFetched}
          onPageChange={onPageChange}
          pageSize={pageSize}
        />
      </>
    );
  }

  if (
    fetchStatus === 'success' &&
    totalCount === 0 &&
    epics.length === 0 &&
    searchTerm.length === 0
  ) {
    return (
      <EmptyState
        imageSrc="/emptyEpic.png"
        imageWidth={288}
        imageHeight={288}
        imageAlt="empty epic list"
        title="No epics in this project yet."
        description="Break down your large project into manageable
                    epics to track progress better and maintain
                    architectural clarity."
        imageStyles=""
        buttonLabel="Create First Epic"
        materialButtonIcon="electric_bolt"
        onButtonClick={() => router.push(`/project/${projectId}/epics/new`)}
        footer={<EmptyStateFooter />}
      />
    );
  }

  if (!isFetched && fetchStatus === 'loading') {
    return (
      <PageWrapper>
        <Header
          desktopTitle="Project Epics"
          buttonLabel="New Epic"
          materialIcon="add"
          mobileTitle=""
          mobileStyles=""
          fetchStatus={fetchStatus === 'loading'}
          searchBar={
            <div className="flex items-center bg-[#D7E2FF] px-[12px] py-[6px] rounded-[2px]">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '16px', color: '#737685' }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search epics..."
                className="text-[14px] text-[#737685] px-[12px] py-[10px] outline-none"
              />
            </div>
          }
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-2 justify-items-center gap-6 mb-6 md:mb-10">
          {[...Array(6)].map((_, i) => (
            <EpicCardSkeleton key={i} />
          ))}
        </div>
      </PageWrapper>
    );
  }

  const header = (
    <Header
      desktopTitle="Project Epics"
      buttonLabel="New Epic"
      handleBtnClick={() => router.push(`/project/${projectId}/epics/new`)}
      materialIcon="add"
      mobileTitle=""
      mobileStyles=""
      searchBar={
        <div className="flex items-center bg-[#D7E2FF] px-[12px] py-[6px] rounded-[2px]">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '16px', color: '#737685' }}
          >
            search
          </span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Search epics..."
            className="text-[14px] text-[#737685] px-[12px] py-[10px] outline-none"
          />
        </div>
      }
    />
  );

  return (
    <div>
      <>
        {header}
        {renderBody()}
      </>
    </div>
  );
}
