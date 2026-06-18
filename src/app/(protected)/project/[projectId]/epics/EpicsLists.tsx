'use client';
import Header from '../../_components/Header';
import { useState } from 'react';
import EpicCard from './_components/EpicCard';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';
import PageWrapper from '../../_components/PageWrapper';
import EpicCardSkeleton from './EpicCardSkeleton';
import EmptyState from '@/app/(protected)/_components/EmptyState';
import { useRouter } from 'next/navigation';
import Pagination from '@/app/(protected)/_components/Pagination';
import type { Epic } from '@/lib/types/index';
import MobilePlusButton from '../../_components/MobilePlusButton';
import EpicModal from './_components/EpicModal';
import { formatDate } from '@/app/(protected)/_utils/formatDate';
import EmptyStateFooter from './_components/EmptyStateFooter';

type EpicListProps = {
  epics: Epic[];
  error: string;
  loading: 'idle' | 'loading' | 'success' | 'failed';
  currentPage: number;
  projectId: string;
  isFetched: boolean;
  totalCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
};

export default function EpicsList({
  projectId,
  epics,
  error,
  loading,
  currentPage,
  isFetched,
  totalCount,
  onPageChange,
  pageSize,
}: EpicListProps) {
  const [epicId, setEpicId] = useState('');
  const [networkError, setNetworkError] = useState('');
  const router = useRouter();

  if (loading === 'failed' && error?.length > 0) {
    return (
      <ErrorScreen
        message={`We're having trouble retrieving your
                project epics right now. Please try
                again in a moment.`}
        buttonElement
        onRetry={() => onPageChange(1)}
      />
    );
  }

  if (
    loading === 'success' &&
    error.length === 0 &&
    epics.length === 0 &&
    isFetched
  ) {
    console.log(epics, 'epics');
    
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

  if ((loading === 'loading' || loading === 'idle') && !isFetched) {
    return (
      <PageWrapper>
        <Header
          desktopTitle="Project Epics"
          buttonLabel="New Epic"
          materialIcon="add"
          mobileTitle=""
          mobileStyles=""
          loading={loading === 'loading' || loading === 'idle'}
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

  return (
    <div>
      {loading === 'success' &&
        error.length === 0 &&
        epics?.length > 0 &&
        isFetched && (
          <>
            {networkError.length > 0 && (
              <div className="fixed bottom-5 right-5 max-w-sm px-4 py-3 md:bottom-6 md:right-6 max-md:bottom-16 max-md:right-0 max-md:mx-3 max-md:rounded-lg max-md:left-0 max-md:max-w-full text-red-500 bg-red-600/10  border border-red-500 flex items-center justify-center rounded-lg gap-2">
                <h3>{networkError}</h3>
              </div>
            )}
            <Header
              desktopTitle="Project Epics"
              buttonLabel="New Epic"
              handleBtnClick={() =>
                router.push(`/project/${projectId}/epics/new`)
              }
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
                    placeholder="Search epics..."
                    className="text-[14px] text-[#737685] px-[12px] py-[10px] outline-none"
                  />
                </div>
              }
            />

            <div className="grid sm:grid-cols-2 md:grid-cols-2 justify-items-center gap-6 mb-6 md:mb-10">
              {epics.map((epic: Epic) => (
                <EpicCard
                  sendEpicIdToParent={() => setEpicId(epic.id)}
                  id={epic.epic_id}
                  key={epic.epic_id}
                  title={epic.title}
                  assignee={epic.assignee?.name}
                  createdBy={epic.created_by.name}
                  createdAt={formatDate(epic.created_at)}
                />
              ))}
            </div>
            {epicId && (
              <EpicModal
                projectId={projectId}
                epicId={epicId}
                onClose={() => setEpicId('')}
              />
            )}

            <MobilePlusButton
              handleBtnClick={() =>
                router.push(`/project/${projectId}/epics/new`)
              }
            />
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              isFetched={isFetched}
              onPageChange={onPageChange}
              pageSize={pageSize}
            />
          </>
        )}
    </div>
  );
}
