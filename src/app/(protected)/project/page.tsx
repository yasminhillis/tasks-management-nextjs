import InfiniteScroll from '../_components/InfiniteScroll';
import PageWrapper from './_components/PageWrapper';
// import Pagination from './_components/Pagination';
import ProjectsList from './ProjectsList';

export default function Project() {
  return (
    // <div className="mb-[88px] md:mb-[162px]">
      <PageWrapper>
        <ProjectsList />
        <InfiniteScroll  slice="projects"/>
      </PageWrapper>
    // </div>
  );
}
